import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink, useSearchParams } from 'react-router-dom';

export default function ShowDataSearch() {
    const [datas, setDatas] = useState([])
    const [company, setBrand] = useState("")
    const [price, setPrice] = useState("")
    const [display, setDisplay] = useState("")
    const [network, setNetwork] = useState("")
    const [ram, setRamStorage] = useState("")
    const [storage, setStorage] = useState("")

    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    useEffect(() => {
        getUser(name, price, ram, company, display,storage)
    }, [name, price, ram, company, display,storage])

    async function getUser(name, price, ram, company,display,storage) {
        const response = await fetch(`http://localhost:5000/searchcard/${name}?price=${price}&ram=${ram}&company=${company}&display=${display}&storage=${storage}`)
        const result = await response.json();
        setDatas(result)//set  data useState
    }

    const [downCards, setDowncard] = useState([]);
    useEffect(() => {
        getProductData()
    }, [])
    const getProductData = async () => {
        const response = await fetch(`http://localhost:5000/getSearchProduct`)
        const res = await response.json();
        setDowncard(res)
    }


    return (
        <>
            <div className='mt-3'>
                <select className="selectCardData" onClick={(e) => { setBrand(e.target.value) }}>
                    <option value="">Brand</option>
                    <option >Oppo</option>
                    <option >Samsung</option>
                    <option >Vivo</option>
                    <option >Redmi</option>
                    <option >Realme</option>
                </select>
                <select className="selectCardData" onClick={(e) => { setDisplay(e.target.value) }}>
                    <option value={""}>Display</option>
                    <option value="FULL-HD">Full HD</option>
                    <option value="FHD-Plus">FHD+</option>
                    <option value="LCD" >LCD</option>
                    <option value="FHD-Plus-AMOLED">FHD+ AMOLED</option>
                </select>
               
                <select className="selectCardData" onClick={(e) => { setRamStorage(e.target.value) }}>
                    <option value={""}>Ram</option>
                    <option value={4}>4 Gb</option>
                    <option value={6}>6 Gb</option>
                    <option value={8}>8 Gb</option>
                    <option value={12}>12 Gb</option>
                </select>
                <select className="selectCardData" onClick={(e) => { setStorage(e.target.value) }}>
                    <option value={""}>Storage</option>
                    <option value={32}>32 Gb</option>
                    <option value={64}>64 Gb</option>
                    <option value={128}>128 Gb</option>
                    <option value={256}>256 Gb</option>
                    <option value={512}>512 Gb</option>
                </select>
                <select className="selectCardData" onClick={(e) => { setPrice(e.target.value) }}>
                    <option value={""}>Price</option>
                    <option value={1}>Price--Low to Hight</option>
                    <option value={-1}>Price--Hight to Low</option>
                </select>
            </div>
            <div className='searchCard_body mt-3'>
                {
                    datas.map((data) => {
                        return (
                            <>
                                <div className='searchCard_primary my-1' onClick={() => navigate(`/CardsInfo/${data._id}`)}>
                                    <div className='searchCard_secondry  '>
                                        <div className='searchCard_photo '><img src={`http://localhost:5000/${data.frontimg}`} />
                                        </div>

                                        <div className='searchCard_data_detailes '>
                                            <p><strong>{data.name}</strong> </p>
                                            <p>{data.ram} GB | {data.storage} GB</p>
                                            <p>{data.front} MP | {data.back} MP </p>
                                            <p> Display : {data.display} </p>
                                            <p> Battery : {data.battery} || {data.processor} </p>
                                            <p>Color : {data.color} Color</p>
                                        </div>
                                        <div className='searchCard_price_detailes'>
                                            <p><strong >₹ {data.price}</strong></p>
                                            <p><span className="text-decoration-line-through  text-secondary mx-1 ">₹ {data.preprice}</span><strong className='text-success'>{-Math.floor(((data.price - data.preprice) / data.preprice) * 100)}% Off</strong></p>
                                            <div className='text-success '>Free Delivery</div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
            <div className='SearchCard-Card mt-5'>
                    <h4 className='mx-5 '>Similar Products</h4>
                <div className='d-flex'>
                    {
                        downCards.map((element, i) => {
                            return (
                                <>
                                    <div className='searchCard_styles_main'>
                                        <div className=" searchCard_styles" key={{ i }}>
                                            <NavLink to={`/CardsInfo/${element._id}`} ><img src={`http://localhost:5000/${element.frontimg}`} className=' searchCard_style_img' /></NavLink>

                                            <div className='searchCard_styles_detail '>
                                                <div className='nameDetaile'>{element.name}  ({element.ram} & {element.storage})</div>
                                                <span>Price : ₹ {element.price} </span>
                                                <div> <span className='text-success '><span className="text-decoration-line-through  text-secondary mx-1 fs-6"> ₹ {element.preprice}</span ><strong>{-Math.floor(((element.price - element.preprice) / element.preprice) * 100)}% Off</strong></span></div>
                                                <p><strong>Rating :</strong> <span style={{ background: "green", color: "#fff", padding: "0px 5px", borderRadius: "5px" }}>{element.rating} ★</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <div className='SearchCard-Card mt-5'>
                <h4 className='mx-5 pb-2'>Recently View</h4>
                <div className='d-flex'>
                    {
                        downCards.map((element, i) => {
                            return (
                                <>
                                    <div className='searchCard_styles_main'>
                                        <div className=" searchCard_styles" key={{ i }}>
                                            <NavLink to={`/CardsInfo/${element._id}`} ><img src={`http://localhost:5000/${element.frontimg}`} className=' searchCard_style_img' /></NavLink>

                                            <div className='searchCard_styles_detail '>
                                                <div className='nameDetaile'>{element.name}  ({element.ram} & {element.storage})</div>
                                                <span>Price : ₹ {element.price} </span>
                                                <div> <span className='text-success '><span className="text-decoration-line-through  text-secondary mx-1 fs-6"> ₹ {element.preprice}</span ><strong>{-Math.floor(((element.price - element.preprice) / element.preprice) * 100)}% Off</strong></span></div>
                                                <p><strong>Rating :</strong> <span style={{ background: "green", color: "#fff", padding: "0px 5px", borderRadius: "5px" }}>{element.rating} ★</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
