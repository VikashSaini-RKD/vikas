import React,{useState} from "react";
import { Card, Col, Container, Row } from "react-bootstrap";


const Order = () => {
    const [data, setData] = useState(false)
    return (
        <>
            {
                data.length ?


                    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
                        <Container className="py-5 h-100">
                            <Row className="justify-content-center align-items-center h-100">
                                <Col lg="8" xl="6">
                                    <Card className="border-top border-bottom border-3 border-color-custom">
                                        <Card className="p-5">
                                            <p className="lead fw-bold mb-5 text-center" style={{ color: "#f37a27" }}>
                                                Your Order Details
                                            </p>

                                            <Row>
                                                <Col className="mb-3">
                                                    <p className="small text-muted mb-1">Date</p>
                                                    <p>10 April 2021</p>
                                                </Col>
                                                <Col className="mb-3">
                                                    <p className="small text-muted mb-1">Order No.</p>
                                                    <p>012j1gvs356c</p>
                                                </Col>
                                            </Row>

                                            <div
                                                className="mx-n5 px-5 py-4"
                                                style={{ backgroundColor: "#f2f2f2" }}
                                            >
                                                <Row className="mb-4 mt-4" >
                                                    <img className="mb-4 " style={{ height: "200px", width: "200px" }} src="../Images/h.jpeg" alt="" />
                                                </Row>
                                                <Row>
                                                    <Col ><p>IKALL Phone </p></Col>
                                                    <Col><p>₹ 10,000.00</p></Col>
                                                </Row>
                                                <Row>
                                                    <Col><p>Shipping</p></Col>
                                                    <Col><p>₹ 40.00</p></Col>
                                                </Row>
                                                <Row>
                                                    <Col> <p>Total Price:</p></Col>
                                                    <Col> <p>₹ 10040.00</p></Col>
                                                </Row>
                                            </div>
                                            <div className="mt-1 p-2" style={{ background: "#eee" }}><Row className=" mx-4">
                                                <Col> <h6 >Cancel Order</h6></Col>
                                                <Col> <h6 >Need help</h6></Col>
                                            </Row></div>

                                            <p
                                                className="lead fw-bold mt-4 mb-4 pb-2"
                                                style={{ color: "#f37a27" }}
                                            >
                                                Tracking Order
                                            </p>

                                            <Row>
                                                <div className="mb-4 " style={{ width: "100%", height: "13px", backgroundColor: "lightgreen", borderRadius: "5px" }}><i className="fa-solid fa-circle" style={{ position: "absolute", right: "20rem", fontSize: "15px", color: "red" }}></i></div>
                                                <Col lg="12">
                                                    <div className="horizontal-timeline">
                                                        <ul className="list-inline items d-flex justify-content-between">
                                                            <li className="list-inline-item items-list">
                                                                <p
                                                                    className="py-1 px-2 rounded text-white"
                                                                    style={{ backgroundColor: "#f37a27" }}
                                                                >
                                                                    Ordered
                                                                </p>
                                                            </li>
                                                            <li className="list-inline-item items-list">
                                                                <p
                                                                    className="py-1 px-2 rounded text-white"
                                                                    style={{ backgroundColor: "#f37a27" }}
                                                                >
                                                                    Shipped
                                                                </p>
                                                            </li>
                                                            <li className="list-inline-item items-list">
                                                                <p
                                                                    className="py-1 px-2 rounded text-white"
                                                                    style={{ backgroundColor: "#f37a27" }}
                                                                >
                                                                    On the way
                                                                </p>
                                                            </li>
                                                            <li className="list-inline-item items-list">
                                                                <p
                                                                    className="py-1 px-2 rounded text-white"
                                                                    style={{ backgroundColor: "#f37a27" }}
                                                                >
                                                                    Delivered
                                                                </p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <p className="mt-4 pt-2 mb-0">
                                                Want any help?{" "}
                                                <a href="#!" style={{ color: "#f37a27" }}>
                                                    Please contact us
                                                </a>
                                            </p>
                                        </Card>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>

                    </section> :
                    <div className=' d-flex justify-content-center align-items-center' style={{ backgroundColor: "#eee", height: "100vh", width: "100vw" }}>
                        <p className=" d-flex justify-content-center align-items-center" style={{ fontSize: 25, background: "yellow", width: "30vw", height: "20vh", borderRadius: "10px" }}>Your Order is empty                         <i className="fa-solid fa-cart-shopping  mx-3" style={{ fontSize: 30 }}></i>
                        </p>
                    </div>
            }
        </>
    );
}


export default Order;