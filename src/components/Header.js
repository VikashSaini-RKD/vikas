import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container'
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav'
import Menu from '@mui/material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/esm/Table';
import { DLT } from '../redux/actions/action';
// import ShowDataSearch from './ShowDataSearch';
// import Cardsdata from './CardsData';



const Header = () => {

    const navigate = useNavigate();

    const auth = localStorage.getItem("user");
    let id;
    if (auth == null) {
        id = "";
    } else {
        id = JSON.parse(auth)._id
    }
    const logout = () => {
        localStorage.clear();
        navigate("/login")
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };



    const [anchor, setAnchor] = useState(null);
    const opn = Boolean(anchor);
    const handle = (e) => {
        setAnchor(e.currentTarget);
    };



    const handleClose = () => {
        setAnchorEl(null);
    };
    const bellHandle = () => {
        setAnchor();
    };


    const dispatch = useDispatch();

    const dlt = (id) => {
        dispatch(DLT(id))
    }

    const [price, setPrice] = useState(0);
    const getdata = useSelector((state) => state.cartreducer.carts);
    const total = () => {
        let price = 0;
        getdata.map((ele) =>
            price = ele.price * ele.qnty + price
        );
        setPrice(price);
    };

    useEffect(() => {
        total();
    }, [total])

    //search api 
    const [removeSearchCard, setRemoveSearchCard] = useState(null)
    const [data, setData] = useState({});
    const handleChange = (key) => {
        if (key.length > 0) {
            fetch(`http://localhost:5000/search/${key}`)
                .then((response) => response.json())
                .then((json) => {
                    setData(json);
                });
        } else if (key == 0) {
            setData(false);

        }
    };


    //Data get using API in Database by async function
    useEffect(() => {
        getUser(id)
    }, [id])

    const [img, setImg] = useState([]);
    const getUser = async (id) => {
        const response = await fetch(`http://localhost:5000/profile/${id}`)
        const data = await response.json();
        setImg(data.data)//set  data useState
    }
    const [naam, setNaam] = useState([])



    return (
        <>
            <Navbar className='nav' style={{ height: "55px" }}>
                <Container className='navbar'>
                    <Nav>
                        <div className=' ecomerce'>
                            <h5 className="text-decoration-none  mb-0 text-light ecomerce" >E-Commerce</h5>
                            <p style={{ color: " yellow" }}>Preimum <i className="fa-solid fa-star  " ></i></p>

                        </div>
                        <NavLink to="/" className="text-decoration-none product " >Product</NavLink>

                        <div className='search'>
                            <input className='searchbar ' value={naam} type="text" placeholder="Search Products"
                                onChange={(e) => handleChange(e.target.value) || setRemoveSearchCard(true) || setNaam()} />
                            <i className="fa-solid fa-search text-dark  searchIcon"></i>

                            <div className='searchCard'>
                                {
                                    removeSearchCard === false ? null : <>  {data.length > 0 ? data.map((result, id) => {
                                        return <><NavLink to={`/ShowDataSearch?name=${result.name}`} className='rname m-0 ' key={id} >
                                            <div className='  search_primary  d-flex' style={{ position: "relative", }} onClick={() => setRemoveSearchCard(false) || setNaam(result.name)}>
                                                <div className='search_image  mx-3 mt-2 '>
                                                    <img src={`http://localhost:5000/${result.frontimg}`} />
                                                </div>
                                                <p className='pt-3' >{result.name} </p>
                                                {/* ( {result.ram} & {result.storage} ) */}
                                                <i className="fa  fa-location-arrow mt-3 " style={{ position: "absolute", right: "10px" }} ></i>
                                            </div>
                                        </NavLink>
                                        </>
                                    }
                                    ) : data.length == 0 ? <div className='rname ' style={{fontSize:"1.5vw",marginLeft:"6vw", padding:"2vw"}}>No Data Found <i className='fa-solid fa-cloud mx-3' style={{fontSize:"2.5vw"}}></i></div> : null}</>
                                }
                            </div>


                        </div>

                    </Nav>

                    {/* user profile code */}
                    <Dropdown className='dropdown'>
                        <Dropdown.Toggle className='drop' style={{ background: "none", border: "none", fontSize: "0px", width: "3px" }}>
                            {img.img == undefined ? <i className="fa-solid fa-user-circle  user"></i> : <img src={`http://localhost:5000/${img.img}`} style={{ borderRadius: "50%" }} />}
                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                            <Dropdown.Item >
                                <NavLink to="/Profile" className="text-decoration-none text-dark">
                                    {img.img == undefined ? <i className="fa-solid fa-user-circle mx-3 " style={{ fontSize: "20px" }}></i> : <img src={`http://localhost:5000/${img.img}`} style={{ borderRadius: "50%" }} className=" mx-3 " width="25" height="25" />}
                                    My Profile</NavLink>

                            </Dropdown.Item>
                            <Dropdown.Item >
                                <NavLink to="/Order" className="text-decoration-none text-dark"><i className="fa-solid fa-cart-flatbed-suitcase mx-3" style={{ fontSize: 20, cursor: "pointer" }}></i>
                                    Orders</NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item >
                                <NavLink to="/Giftcard" className="text-decoration-none text-dark"><i className="fa-solid fa-gift mx-3"></i>Gift Card</NavLink>
                            </Dropdown.Item>
                            <Dropdown.Item >
                                <NavLink to="/Others" className="text-decoration-none text-dark"><i className="fa-sharp fa-solid fa-play mx-4"></i>Others</NavLink>
                            </Dropdown.Item>

                            <Dropdown.Item >
                                {auth ?
                                    <NavLink onClick={logout} to="/login" className="text-decoration-none text-black">
                                        <i className="fa-solid fa-right-from-bracket mx-3" style={{ fontSize: 20, cursor: "pointer" }}></i>Logout  ({JSON.parse(auth).name})</NavLink>
                                    : <NavLink to="/signup" className="text-decoration-none text-black  "><i className="fa-solid fa-user-plus text-dark mx-4"></i>Signup</NavLink>}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>



                    {/* cart logo */}
                    <Badge badgeContent={getdata.length} color="primary"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <i className="fa-solid fa-cart-shopping   cartIcon" onClick={bellHandle} ></i>
                    </Badge>


                    {/* bell icon code */}
                    <Badge badgeContent={0} color="primary" onClick={handle}>
                        <i className="fa-solid fa-bell  bellIcon" onClick={bellHandle} ></i>

                    </Badge>

                </Container>


                <Menu
                    className='mt-3'
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClick={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    {
                        getdata.length ?
                            <div className='card_details ' >
                                <Table>

                                    <thead>
                                        <tr >
                                            <th >Photo</th>
                                            <th >Product details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getdata.map((e, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>
                                                                <NavLink to={`/cart/${e._id}`} onClick={handleClose}>
                                                                    <img src={`http://localhost:5000/${e.frontimg}`} style={{ width: "4rem", height: "7rem" }} alt="" />
                                                                </NavLink>
                                                            </td>
                                                            <td>
                                                                <p>{e.name}</p>
                                                                <p>Price : ₹{e.price}</p>
                                                                <span className='text-success '><span className="text-decoration-line-through  text-secondary mx-1 fs-6"> ₹{e.preprice}</span ><strong>{-Math.floor(((e.price - e.preprice) / e.preprice) * 100)}% Off</strong></span>
                                                                <p>Quantity : {e.qnty}</p>
                                                                <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e._id)}>
                                                                    <i className='fas fa-trash smalltrash  '></i>
                                                                </p>
                                                            </td>

                                                            <td className='mt-5' style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e._id)}>
                                                                <i className='fas fa-trash largetrash'></i>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        <p className='text-center'>Total :₹ {price}</p>
                                    </tbody>
                                </Table>
                            </div> :

                            <div className='card_details d-flex justify-content-center align-items-center cart-empty'>
                                <i className='fas fa-close smallclose '
                                    onClick={handleClose} style={{ position: "absolute", top: 1, right: 10, fontSize: 23, cursor: "pointer" }}></i>
                                <p>Your carts is empty
                                    <i className='fas fa-cart-shopping m-3'></i>
                                </p>
                            </div>
                    }

                </Menu>
                <Menu
                    className='mt-3'
                    anchorEl={anchor}
                    open={opn}
                    onClick={bellHandle} >

                    {
                        <div className='card_details d-flex justify-content-center align-items-center notificationCard'>
                            <i className='fas fa-close smallclose '
                                onClick={bellHandle} ></i>
                            <p className='notification'>Your notification is empty</p>
                        </div>
                    }
                </Menu>
            </Navbar>



        </>
    )
}

export default Header