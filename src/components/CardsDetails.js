import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { DLT, ADD, REMOVE } from '../redux/actions/action'


const CardsDetails = () => {

  const [data, setData] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getdata = useSelector((state) => state.cartreducer.carts);

  const compare = () => {
    let comparedata = getdata.filter((e) => {
      return e._id === id
    });
    setData(comparedata);
  }
  const send = (e) => {
    dispatch(ADD(e));
  }

  const dlt = (id) => {
    dispatch(DLT(id));
    navigate("/");
  }

  // remove one
  const remove = (item) => {
    dispatch(REMOVE(item))
  }


  useEffect(() => {
    compare();
  },[id])

  return (
    <>
      <div className="container mt-2">
        <h2 className='text-center'>Iteams Details Page  </h2>

        <section className='container mt-3' >
          <div className="iteamdetails">
            {
              data.map((ele,i) => {
                return (
                  <>
                    <div className="cardDetails_img" key={{i}}>
                    <NavLink to={`/CardsInfo/${ele.id}`} ><img   src={`http://localhost:5000/${ele.frontimg}`} alt="not found img" /></NavLink>
                    </div>

                    <div className="details">
                      <Table>
                        <tbody>
                        <tr>
                          <td>
                            <p> {ele.name} ({ele.ram} & {ele.storage})</p>
                            <p className='text-success '> <strong>Special Offer</strong></p>
                            <p> <strong>Price : ₹</strong>  {ele.price}
                              <span className='text-success '><span className="text-decoration-line-through  text-secondary mx-1 fs-6"> ₹{ele.preprice}</span ><strong>{-Math.floor(((ele.price - ele.preprice) /ele.preprice) * 100)}% Off</strong></span></p>
                            <p> <strong>Total</strong>  :₹  {ele.price * ele.qnty}</p>
                            <div className='quantity-price mt-5 d-flex justify-content-between align-items-center' style={{backgroundColor:"gray",color:"white" ,borderRadius:"5px",padding:'7px'}}>
                              <span style={{ fontSize: 24 }} onClick={ele.qnty <= 1 ? () => dlt(ele._id) : () => remove(ele)}>-</span>
                              <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                              <span style={{ fontSize: 24 }} onClick={() => send(ele)}>+</span>

                            </div>

                          </td>
                          <td>
                            <p><strong>Rating :</strong> <span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}>{ele.rating} ★	</span></p>
                            <p><strong>Order Review :</strong> <span >{ele.orderPlace}	</span></p>
                            <p><strong>Remove :</strong> <span ><i className='fas fa-trash' onClick={() => dlt(ele.id)} style={{ color: "red", fontSize: 20, cursor: "pointer" }}></i>	</span></p>

                              <NavLink to={`/CardsInfo/${ele._id}`}  className=" text-decoration-none" >See All Details</NavLink>

                            <div className=" butn d-flex justify-content-center" >
                              <Button variant="warning" className='col-lg-12 mt-2 ' style={{  cursor: "pointer" }} onClick={() => navigate("/Address")}>Buy Now</Button>
                            </div>
                          </td>
                        </tr>
                        </tbody>
                      </Table>
                    </div>

                  </>
                )
              })
            }
          </div>
        </section>
      </div>
    </>
  )
}

export default CardsDetails