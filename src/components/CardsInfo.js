import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ADD } from '../redux/actions/action'


const CardsDetails = () => {

    const [data, setData] = useState([]);//state

    const navigate = useNavigate();//nagivate

    const dispatch = useDispatch();

    const send = (e) => {
        dispatch(ADD(e));
    }
    
//Data get using API in Database by async function
   const params = useParams();    //param link get id

    useEffect(() => {
        getUser(params.id)
    }, [params])

    async function getUser(_id) {
        const response = await fetch(`http://localhost:5000/product/${_id}`)
        const result = await response.json();
        setData(result.result)//set  data useState
    }
    // console.log(data)

    return (
        <>
            <div className="container mt-2">
                <h2 className='text-center'>Iteams Details Page  </h2>

                <section className='container mt-4' >
                    <div className="iteamsdetails ">

                        <>
                            <div className="items_img ">
                                <Carousel variant='dark'>
                                    <Carousel.Item >
                                        <img className="banner p-5" src={`http://localhost:5000/${data.frontimg}`} alt="" />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img className="banner p-5" src={`http://localhost:5000/${data.backimg}`} alt="" />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img className="banner p-5" src={`http://localhost:5000/${data.rightsideimg}`} alt="" />
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img className="banner p-5" src={`http://localhost:5000/${data.leftsideimg}`} alt="" />
                                    </Carousel.Item>

                                </Carousel>
                            </div>

                            <div className="details">
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p className='CardInfo_name'> {data.name} ({data.ram} & {data.storage})</p>
                                                <p className='text-success mb-0'> <strong>Special Offer</strong></p>
                                                <p> <strong>Price : ₹</strong>  {data.price}<br/>
                                                    <span className='text-success '><span className="text-decoration-line-through  text-secondary mx-1 fs-6"> ₹{data.preprice}</span ><strong>{-Math.floor(((data.price - data.preprice) /data.preprice) * 100)}% Off</strong></span></p>
                                                <p>Available offers for bank</p>


                                                <div className="button_div btn d-flex justify-content-center">
                                                    <Button variant="primary" className='col-lg-12 mt-2' style={{ position: "absolute", bottom: "15px", cursor: "pointer" }} onClick={() => send(data)} >Add To Cart</Button>
                                                </div>
                                            </td>
                                            <td>
                                                <p><strong>Rating :</strong> <span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}>{data.rating} ★</span></p>

                                                <p><strong>Order Review :</strong> <span >{data.orderPlace}</span></p>

                                                <p><strong>Remove :</strong> <span ><i className='fas fa-trash'
                                                    onClick={() => navigate("/")} style={{ color: "red", fontSize: 20, cursor: "pointer" }}></i>	</span></p>

                                                <div className="button_div btn d-flex justify-content-center">
                                                    <Button variant="warning" className='col-lg-12 mt-2' style={{ position: "absolute", bottom: "15px", cursor: "pointer" }} onClick={() => navigate("/Address")}>Buy Now</Button>
                                                </div>
                                            </td>



                                        </tr>
                                    </tbody>
                                </Table>
                            </div>

                        </>



                    </div>
                </section>

                <h2 className='text-center mt-5 '>Product Details</h2>
                <div className='productDetalis' >



                    <Table className='tableDetails'>
                        <h5 className='mt-4'>General</h5>
                        <tbody>
                            <tr>
                                <td>Modal No</td>
                                <td>{data.modalNo}</td>
                            </tr>
                            <tr>
                                <td>Operating System</td>
                                <td>{data.operatingSystem}</td>
                            </tr>

                            <tr>
                                <td>Color</td>
                                <td>{data.color}</td>
                            </tr>

                            <tr>
                                <td>Processor</td>
                                <td>{data.processor}</td>
                            </tr>

                            <h5 className='mt-4'>Storage</h5>
                            <tr>
                                <td>Ram</td>
                                <td>{data.ram}Gb</td>
                            </tr>
                            <tr>
                                <td>Storage</td>
                                <td>{data.storage}Gb</td>
                            </tr>
                            <h5 className='mt-4'>Camera</h5>
                            <tr>
                                <td>Front Camera</td>
                                <td>{data.front} MP</td>
                            </tr>
                            <tr>
                                <td>Back Camera</td>
                                <td>{data.back} MP</td>
                            </tr>
                            <tr>
                                <td>Recording </td>
                                <td>{data.recording}</td>
                            </tr>
                            <tr>
                                <td>Recording Type</td>
                                <td>{data.recordingType}</td>
                            </tr>
                            <tr>
                                <td>Digital Zoom</td>
                                <td>{data.zoom}</td>
                            </tr>
                            <tr>
                                <td>Flash</td>
                                <td>{data.flash}</td>
                            </tr>
                            <h5 className='mt-4'>Audio</h5>
                            <tr>
                                <td>Speaker</td>
                                <td>{data.speaker}</td>
                            </tr>
                            <h5 className='mt-4'>Call Feature</h5>
                            <tr>
                                <td>Call Record</td>
                                <td>{data.callrecord}</td>
                            </tr>

                            <h5 className='mt-4'>Display</h5>
                            <tr>
                                <td>Display Type</td>
                                <td>{data.display}</td>
                            </tr>
                            <tr>
                                <td>Resolution</td>
                                <td>{data.resolution}</td>
                            </tr>
                            <h5 className='mt-4'>Battery</h5>
                            <tr>
                                <td>Battery</td>
                                <td>{data.battery}</td>
                            </tr>
                            <h5 className='mt-4'>Warranty</h5>
                            <tr>
                                <td>Warranty</td>
                                <td>{data.warranty}</td>
                            </tr>

                        </tbody>
                    </Table>
                </div >
            </div>
        </>
    )
}

export default CardsDetails


