import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//signup

const ProductDataAdd = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");
    const [modalNo, setModal] = useState("");
    const [brand, setBrand] = useState("");
    const [display, setDisplay] = useState("");
    const [processor, setProcessor] = useState("");
    const [frontimg, setFrontImg] = useState("")
    const [backimg, setBackImg] = useState("")
    const [rightimg, setRightImg] = useState("")
    const [leftimg, setLeftImg] = useState("")
    const [battery, setBattery] = useState("")
    const [callrecord, setCallRecord] = useState("")
    const [color, setColor] = useState("")
    const [preprice, setPrePrice] = useState("")
    const [flash, setFlash] = useState("")
    const [front, setFront] = useState("")
    const [warranty, setWarranty] = useState("")
    const [operatingSystem, setOperationSystem] = useState("")
    const [orderPlace, setOrderPlace] = useState("")
    const [rating, setRating] = useState("")
    const [ram, setRam] = useState("")
    const [storage, setStorage] = useState("")
    const [speaker, setSpeaker] = useState("")
    const [recording, setRecording] = useState("")
    const [recordingType, setRecordingType] = useState("")
    const [resolution, setResolution] = useState("")
    const [zoom, setZoom] = useState("")
    const [back, setBack] = useState("")


    const formData = new FormData();
    formData.append('img', frontimg);
    formData.append('img', backimg);
    formData.append('img', rightimg);
    formData.append('img', leftimg);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('company', company);
    formData.append('modalNo', modalNo);
    formData.append('brand', brand);
    formData.append('display', display);
    formData.append('processor', processor);
    formData.append('battery', battery)
    formData.append('callrecord', callrecord)
    formData.append('color', color)
    formData.append('preprice', preprice)
    formData.append('flash', flash)
    formData.append('front', front)
    formData.append('warranty', warranty)
    formData.append('operatingSystem',operatingSystem)
    formData.append('orderPlace', orderPlace)
    formData.append('rating', rating)
    formData.append('ram', ram)
    formData.append('storage', storage)
    formData.append('speaker', speaker)
    formData.append('recording', recording)
    formData.append('recordingType', recordingType)
    formData.append('resolution', resolution)
    formData.append('zoom', zoom)
    formData.append('back', back)


    const collectData = async () => {

        try {
            if (name && price && company && modalNo && brand && display 
                && processor && frontimg && backimg && rightimg && leftimg &&battery && back &&zoom 
                &&resolution&&recording&&recordingType &&color&&rating&&speaker&&storage&&ram&&orderPlace&&operatingSystem
                &&warranty&&front&&flash&&preprice&&callrecord) {
                let result = await axios.post("http://localhost:5000/pro/", formData);
                if (result.status === 200 && result.statusText === 'OK') {
                    toast.success(`Welcome , Data Save Successfully `, {
                        position: "top-center",
                        autoClose: 2000,
                        theme: "colored",
                    });
                }
            } else {
                toast.error("Please Enter All Fields", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "colored",
                });
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="signup-form" style={{marginBottom:"20rem"}}>
            <div className="containers">
                <input className="input-box" type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                <input className="input-box" type="text" onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price" />
                <input className="input-box" type="text" onChange={(e) => setPrePrice(e.target.value)} placeholder="Enter Previous Price" />
                <input className="input-box" type="text" onChange={(e) => setCompany(e.target.value)} placeholder="Enter Company" />
                <input className="input-box" type="text" onChange={(e) => setModal(e.target.value)} placeholder="Enter Modal no." />
                <input className="input-box" type="text" onChange={(e) => setBrand(e.target.value)} placeholder="Enter Brand Name" />
                <input className="input-box" type="text" onChange={(e) => setDisplay(e.target.value)} placeholder="Display" />
                <input className="input-box" type="text" onChange={(e) => setProcessor(e.target.value)} placeholder="Processor" />
                <input className="input-box" type="text" onChange={(e) => setOrderPlace(e.target.value)} placeholder="OrderPlace" />
                <input className="input-box" type="text" onChange={(e) => setRating(e.target.value)} placeholder="Rating" />
                <input className="input-box" type="text" onChange={(e) => setOperationSystem(e.target.value)} placeholder="Operating System" />
                <input className="input-box" type="text" onChange={(e) => setCallRecord(e.target.value)} placeholder="Call Record" />
                <input className="input-box" type="text" onChange={(e) => setSpeaker(e.target.value)} placeholder="Speaker" />
                <input className="input-box" type="text" onChange={(e) => setRam(e.target.value)} placeholder="Ram" />

                <button onClick={collectData} className="appButton" style={{ width: "100%" }} type="button">Submit</button>

            </div>
            <div className="containers">
                <input className="input-box" type="text" onChange={(e) => setStorage(e.target.value)} placeholder="Storage" />
                <input className="input-box" type="text" onChange={(e) => setFront(e.target.value)} placeholder="Front" />
                <input className="input-box" type="text" onChange={(e) => setBack(e.target.value)} placeholder="Back" />
                <input className="input-box" type="text" onChange={(e) => setRecording(e.target.value)} placeholder="Recording" />
                <input className="input-box" type="text" onChange={(e) => setRecordingType(e.target.value)} placeholder="Recording Type" />
                <input className="input-box" type="text" onChange={(e) => setZoom(e.target.value)} placeholder="Zoom" />
                <input className="input-box" type="text" onChange={(e) => setFlash(e.target.value)} placeholder="Flash" />
                <input className="input-box" type="text" onChange={(e) => setResolution(e.target.value)} placeholder="Resolution" />
                <input className="input-box" type="text" onChange={(e) => setColor(e.target.value)} placeholder="Color" />
                <input className="input-box" type="text" onChange={(e) => setBattery(e.target.value)} placeholder="Battery" />
                <input className="input-box" type="text" onChange={(e) => setWarranty(e.target.value)} placeholder="Warranty" />

                <label ><i className="  fa fa-camera mx-2 px-2">
                    <input type="file" onChange={(e) => setFrontImg(e.target.files[0])} hidden />
                </i>F-Image</label>

                <label ><i className="  fa fa-camera mx-2 px-2">
                    <input type="file" onChange={(e) => setBackImg(e.target.files[0])} hidden />
                </i>B-Image</label><br />

                <label ><i className="  fa fa-camera mx-2 px-2">
                    <input type="file" onChange={(e) => setRightImg(e.target.files[0])} hidden />
                </i>R-Image</label>

                <label ><i className="  fa fa-camera mx-2 px-2">
                    <input type="file" onChange={(e) => setLeftImg(e.target.files[0])} hidden />
                </i>L-Image</label>

            </div>
            {name ? <ToastContainer limit={1} /> : null}
        </div>
    )
}
export default ProductDataAdd


