import React from 'react'
import useReactRouter from 'use-react-router'
import styled from 'styled-components'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { connect } from 'react-redux'

import '../Products.css'

import ProductBox from '../../../components/Product/ProductBox' 
import Details from '../../../components/Product/Details'
import * as ROUTES from '../../../constants/routes'
import { useFirestoreUser } from '../../../hooks'
import { addToCart } from '../../../redux/actions/cartActions'

const DiscoverHomeownerPlus = (props) => {
  const { addToCart } = props
  const { history } = useReactRouter()
  const userData = useFirestoreUser()
  const { firestoreUser, loading } = userData
  console.log('firestoreUser', firestoreUser)
  const data = {
    title: "Discover – Homeowner+",
    price: {
      type: 'once',
      amount: 5.00,
    },
    category: {
      name: "Homeowner",
      link: ROUTES.DISCOVER_HOMEOWNER_PLUS,
    },
    breadcrumb: [
      {
        name: "Home",
        link: ROUTES.HOME
      },
      {
        name: "Discover – Homeowner+",
        link: ROUTES.DISCOVER_HOMEOWNER_PLUS
      },
    ],
  } // end Product Box Data
  const tabData = [
    {
      title: "Description",
      data: {
        bullets: [
          (<LI className="bold" key="0">Up to 10 Properties</LI>),
          (<LI key="1">Flood Score</LI>),
          (<LI key="2">Latest and Best Available Flood modeling</LI>),
          (<LI key="3">FEMA Flone Zone category</LI>),
          (<LI key="4">Action points / recommendations</LI>),
          (<LI key="5">LOMA Recommendations</LI>),
        ]
      }
    }
  ] // end Tab Data

 const handleAddToCart = () => {
  addToCart(1) // TODO: replace 1 with the actual id of this product
  history.push(ROUTES.CART)
 }

  return (
  <div>
    <Container style={{ 'marginTop': '64px' }}>
      <Row>
        <Col sm={8}>
          <ProductBox
            handleAddToCart={handleAddToCart}
            title={data.title}
            category={data.category}
            breadcrumb={data.breadcrumb}
            price={data.price}
          />
          <Details
            tabData={tabData}
          />
        </Col>
        <Col sm={4}>
          {/* Side Bar */}
        </Col>
      </Row>
    </Container>
  </div>
  )
}

const LI = styled.li`
  color: #666666;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 35px;
  margin-left: 16px;
`;

// export default DiscoverHomeownerPlus

const mapStateToProps = (/* state */) => {
  return null
}
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => { dispatch(addToCart(id)) },
  }
}

// export default withRouter(Cart)
export default connect(mapStateToProps, mapDispatchToProps)(DiscoverHomeownerPlus)
