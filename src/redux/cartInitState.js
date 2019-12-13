import DiscoverImg from '../assets/images/Discover.svg'
import compareImg from '../assets/images/Compare.svg'
import ExamineImg from '../assets/images/Examine.svg'
import certifyImg from '../assets/images/Certificate.svg'
import ReduceImg from '../assets/images/Reduce_Eliminate.svg'

export const cartInitState = {
  items: [
    {
      id: 0,
      title:'Discover Homeowner',
      img: DiscoverImg,
      desc: "My Flood Score is the result of analyzing the best available flood data, combined with details of the property structure and land parcel, as well as a number of other significant flood factors even down to how the local community is responding to the risk of a flood.",
      price: 0,
      type: 'single',
      categoryId: 'discover',
      numInventory: 1,
    },
    {
      id: 1,
      title:'Discover Homeowner+',
      img: DiscoverImg,
      desc: "My Flood Score is the result of analyzing the best available flood data, combined with details of the property structure and land parcel, as well as a number of other significant flood factors even down to how the local community is responding to the risk of a flood.",
      price: 500,
      type: 'single',
      categoryId: 'discover',
      numInventory: 10,
    },
    {
      id: 2,
      title:'Discover Business',
      img: DiscoverImg,
      desc: "My Flood Score is the result of analyzing the best available flood data, combined with details of the property structure and land parcel, as well as a number of other significant flood factors even down to how the local community is responding to the risk of a flood.",
      price: 1000,
      type: 'monthly',
      plan: 'plan_GD4tFIrEfqOPLx',
      categoryId: 'discover',
      numInventory: 25,
    },
    {
      id: 3,
      title:'Compare Homeowner',
      img: compareImg,
      desc: "The Compare Product allows users to directly compare two specific properites.",
      price: 500,
      type: 'single',
      categoryId: 'compare',
      numInventory: 1,
    },
    {
      id: 4,
      title:'Compare Homeowner+',
      img: compareImg,
      desc: "The Compare Product allows users to directly compare two specific properites.",
      price: 1000,
      type: 'single',
      categoryId: 'compare',
      numInventory: 10,
    },
    {
      id: 5,
      title:'Compare Business',
      img: compareImg,
      desc: "The Compare Product allows users to directly compare two specific properites.",
      price: 6000,
      type: 'monthly',
      plan: 'plan_GEq0gCG3Scmg4l',
      categoryId: 'compare',
      numInventory: 50,
    },
    {
      id: 6,
      title:'Examine Homeowner',
      img: ExamineImg,
      desc: "The Examine product offers the most detailed flood risk understanding for an individual property.",
      price: 2500,
      type: 'single',
      categoryId: 'examine',
      numInventory: 1,
    },
    {
      id: 7,
      title:'Examine Business',
      img: ExamineImg,
      desc: "The Examine product offers the most detailed flood risk understanding for an individual property.",
      price: 2500,
      type: 'monthly',
      plan: 'plan_GEq1bYW1biDgvH',
      categoryId: 'examine',
      numInventory: 1,
    },
    {
      id: 8,
      title:'Certify Homeowner',
      img: certifyImg,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 1000,
      type: 'single',
      categoryId: 'certify',
      numInventory: 1,
    },
    {
      id: 9,
      title:'Certify Business',
      img: certifyImg,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 1000,
      type: 'monthly',
      plan: 'plan_GEq24H2bM9Qofb',
      categoryId: 'certify',
      numInventory: 1,
    },
    {
      id: 10,
      title:'Reduce',
      img: ReduceImg,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
      price: 39500,
      type: 'single',
      categoryId: 'reduce',
      numInventory: 1,
    },
  ],
  addedItems:[],
  total: 0,
  paymentProcessing: false,
}