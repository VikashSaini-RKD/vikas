import React, { useEffect, useState } from 'react'
import "./style.css";
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel';
import { NavLink } from 'react-router-dom';
import Cardsdata1 from './Image/bn.jpeg'
import Cardsdata2 from './Image/bnm.jpeg'
import Cardsdata3 from './Image/bnn.jpeg'
import Cardsdata4 from './Image/bnnn.jpeg'
import Cardsdata5 from './Image/bnnnn.jpeg'

const Cards = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    getProductData()
  }, [])
  const getProductData = async () => {
    const response = await fetch(`http://localhost:5000/getProduct`)
    const data = await response.json();
    // console.log(data)
    setData(data)
  }

  return (
    <div className=' mt-1'>
      <Carousel variant='dark'  >
        <Carousel.Item  >
          <img className="banner" src={Cardsdata1} alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="banner" src={Cardsdata2} alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="banner" src={Cardsdata3} alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="banner" src={Cardsdata4} alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="banner" src={Cardsdata5} alt="" />
        </Carousel.Item>
      </Carousel>

      <div className="row d-flex justify-content-center align-items-center">
        {
          data.map((element, i) => {
            return (
              <>

                <Card className=" card_style " key={{ i }}>
                  <NavLink to={`/CardsInfo/${element._id}`} ><Card.Img variant="top" src={`http://localhost:5000/${element.frontimg}`} className=' card_style_img' /></NavLink>

                  <Card.Body>
                    <Card.Title style={{ fontSize: "16px" }}>{element.name}  ({element.ram} & {element.storage})</Card.Title>
                    <span>Price : ₹ {element.price} </span>
                    <Card.Text> <span className='text-success '><span className="text-decoration-line-through  text-secondary mx-1 fs-6"> ₹ {element.preprice}</span ><strong>{-Math.floor(((element.price - element.preprice) / element.preprice) * 100)}% Off</strong></span></Card.Text>
                    <p><strong>Rating :</strong> <span style={{ background: "green", color: "#fff", padding: "0px 5px", borderRadius: "5px" }}>{element.rating} ★</span></p>

                    <div className="button_div d-flex ">
                      <NavLink to={`/CardsInfo/${element._id}`} className="text-decoration-none see_details ">See All Details</NavLink>
                    </div>
                  </Card.Body>
                </Card>

              </>
            )
          })
        }

      </div>
    </div>
  )
}

export default Cards