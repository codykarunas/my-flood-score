// CheckoutForm.js
import React, { useState, useEffect } from 'react'
import { injectStripe } from 'react-stripe-elements'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { useFirebase, useFirestoreUser } from '../../hooks'
// import AddressSection from './AddressSection';
import CardSection from './CardSection'
import { setPaymentProcessing } from '../../redux/actions/cartActions'
import * as ROUTES from '../../routes/constants/routes'

const CheckoutForm = (props) => {
  const firebase = useFirebase()
  const userData = useFirestoreUser()
  const { firestoreUser } = userData
  const { items, setPaymentProcessing } = props
  const [errorMessage, setErrorMessage] = useState(null)

  // component did mount
  useEffect(() => {
    setPaymentProcessing(false)
  }, [])

  const handleSubmit = async (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault()
    setPaymentProcessing(true)
    const { email, uid } = firestoreUser
    let { customerId } = firestoreUser

    // Use Elements to get a reference to the Card Element mounted somewhere
    // in your <Elements> tree. Elements will know how to find your Card Element
    const cardElement = props.elements.getElement('card')

    // From here we cal call createPaymentMethod to create a PaymentMethod
    const fetchPaymentMethod = await props.stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      // billing_details: {name: 'Jenny Rosen'},
    })
    const { paymentMethod, error } = fetchPaymentMethod
    console.log('paymentMethod', paymentMethod)
    console.log('error', error)
    if (typeof paymentMethod === 'undefined') {
      console.log('createPaymentMethod error:', error)
      setErrorMessage(error.message)
      setPaymentProcessing(false)
      return
    }
    
    if (!customerId) { // We need to create customer
      console.log('creating customer')
      const customer = await firebase.doCreateCustomer({
        email,
        payment_method: paymentMethod.id,
        invoice_settings: {
          default_payment_method: paymentMethod.id,
        },
        metadata: {
          email,
          uid,
        },
      })
      console.log('customer', customer)
      if (typeof customer.data.raw !== 'undefined') {
        setErrorMessage('Error: ' + customer.data.raw.message)
        setPaymentProcessing(false)
        return
      }
      customerId = customer.data.id
    } else { console.log('customer already exists') }

    let subItems = []
    let intentAmount = 0
    const order = { items: [] }
    items.forEach(item => {
      console.log('item:', item)
      const { id, title, price, plan, quantity, categoryId, numInventory } = item
      if (item.type === 'monthly') {
        subItems.push({
          plan,
          quantity,
          metadata: { categoryId, numInventory }
        })
      } else {
        order.items.push({ id, title, price, quantity, categoryId, numInventory })
        // intentAmount += item.price
        intentAmount += (item.price * item.quantity)
      }
    });

    // Create subscription if necessary
    if (subItems.length > 0) {
      console.log('creating sub for items:', subItems)
      const subscription = await firebase.doCreateSubscription({
        customer: customerId,
        items: subItems,
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          email,
          uid,
          type: 'subscription'
        },
      })
      console.log('subscription', subscription)
      if (typeof subscription.data.raw !== 'undefined') {
        console.log(subscription.data.statusCode)
        setErrorMessage('Error: ' + subscription.data.raw.message)
        setPaymentProcessing(false)
        return
      }
    }

    // Create Payment intent if necessary
    if (intentAmount > 0) {
      console.log('creating intent for amount of:', intentAmount)
      order.amount = intentAmount
      console.log('order is equal to:', order)
      const intent = await firebase.doCreatePaymentIntent({
        amount: intentAmount,
        currency: 'usd',
        setup_future_usage: 'off_session',
        receipt_email: email,
        description: "My Flood Score",
        metadata: {
          email,
          uid,
          order: JSON.stringify(order),
          type: 'ad-hoc',
        },
      })
      if (typeof intent.data.raw !== 'undefined') {
        console.log(intent.data.statusCode)
        setErrorMessage('Error: ' + intent.data.raw.message)
        setPaymentProcessing(false)
        return
      }
      const client_secret = intent.data
      // Use client_secret to confirm card payment
      console.log('confirming card payment with CS:', client_secret)
      const result = await props.stripe.confirmCardPayment(client_secret, {
        payment_method: {card: cardElement},
        // setup_future_usage: 'off_session'
      })
      if (result.error) {
        // Show error to your customer
        console.log('confirmCardPayment', result.error.message)
        setErrorMessage('Error: ' + result.error.message)
        setPaymentProcessing(false)
        return
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log('confirmCardPayment success, result:', result)
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback execution
          // Set up a webhook or plugin to listen for the payment_intent.succeeded event
          // to save the card to a Customer
        }
      }
    }
    setPaymentProcessing(false)
    props.history.push(ROUTES.ACCOUNT_INVENTORY)
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection onChange={() => setErrorMessage('') } />
      <P className="errorMessage">{errorMessage}</P>
      <input type="submit" id="submit-form" style={{ display: 'none' }} />
    </form>
  )
}

const P = styled.p`
  color: palevioletred;
`

const mapStateToProps = (state) => {
  return {
    paymentProcessing: state.paymentProcessing,
  }
}
const mapDispatchToProps = (dispatch) => ({
  setPaymentProcessing: (value) => { dispatch(setPaymentProcessing(value)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(CheckoutForm))
