import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// ******************************************************************************************************************************************                                           *************** Get Data UserProfile ***********************                                 *****************************************************************************************************************************************

export const Profile = () => {

    const auth = localStorage.getItem("user");
    const id = JSON.parse(auth)._id
    const [data, setData] = useState([]);
    const [img, setImg] = useState("");

    useEffect(() => {
        getUser(id)
    }, [id])


//Data get using API in Database by async function
    const getUser = async (id) => {
        const response = await fetch(`http://localhost:5000/profile/${id}`)
        const data = await response.json();
        setData(data.data)//set  data useState
        setImg(data)//set image data useState
        // console.log(data)
    }

    return (
        <div className="profile_body">
        < div className="container d-flex justify-content-center ">
            <div className="card mt-5" style={{
                maxWidth: "400px", minWidth: "280px", background:"lightyellow", boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.082"
            }}>
            {/*  user data show as a profile  */}
                <h4 className="text-center mt-2">User Profile</h4>
                < div className="card-body">
                    < div >
                        <div className="flex-column align-items-center text-center">
                            {data.img == undefined ? <img src="https://bootdey.com/img/Content/avatar/avatar6.png" className="rounded-circle p-1 bg-primary mb-3" width="140" height="140" /> : <img src={`http://localhost:5000/${data.img}`} className="rounded-circle p-1 bg-primary mb-3" width="140" height="140" />}
                            <div className="mt-3">
                                <h4>{data.name}<Link to={'/UpdateProfile'}><i className="fa-solid fa-pen-to-square m-2 text-secondary fs-0.2" ></i></Link></h4>
                                <p className="text-secondary mb-2">{data.bio}</p>
                                <div style={{ padding: "8PX 3rem", textAlign: 'start' }}>
                                    <p className="text-muted "> <strong className="text-dark">Gender:  </strong>{data.gender}</p>
                                    <p className="text-muted "> <strong className="text-dark">DOB:  </strong>{data.dob}</p>
                                    <p className="text-muted "> <strong className="text-dark">Phone:  </strong>{data.phone}</p>
                                    <p className="text-muted "> <strong className="text-dark">Email: </strong>{data.email}</p>
                                </div>
                            </div>

                              {/* Bottom show as icon in a social media */}

                            <div className="d-flex justify-content-between ">
                                <Link to={"https://mail.google.com/mail/u/0/#inbox"}><li className="list-group-item">
                                    <h6 style={{ fontSize: "30px", cursor: "pointer", color: "red" }}><i className="fa-solid fa-envelope " ></i></h6>
                                </li></Link>
                                <Link to={'https://www.facebook.com/profile.php?id=100040960129428'}><li className="list-group-item">
                                    <h6 style={{ fontSize: "30px", cursor: "pointer" }}><i className="fa-brands fa-facebook " ></i></h6>
                                </li></Link>
                                <Link to={'https://www.instagram.com/laadla_khatu_wale._.ka/'}> <li className="list-group-item">
                                    <h6 style={{ color: "palevioletred", fontSize: "30px", cursor: "pointer" }}><i className="fa-brands fa-instagram " ></i>
                                    </h6>
                                </li></Link>
                                <Link to={"https://twitter.com/home"}>  <li className="list-group-item">
                                    <h6 style={{ fontSize: "30px", cursor: "pointer" }}><i className="fa-brands fa-twitter " ></i>
                                    </h6>
                                </li></Link>
                                <Link to={"https://github.com/VikashSaini-RKD"}><li className="list-group-item">
                                    <h6 style={{ fontSize: "30px", cursor: "pointer", color: "black`" }}><i className=" fa-brands fa-github " ></i>
                                    </h6>
                                </li></Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
        </div >
    )
}



// ******************************************************************************************************************************************                                      *************** Update Data UserProfile **********************                                *****************************************************************************************************************************************


export function UpdateProfile() {
    const [alert, setAlert] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [bio, setBio] = useState("");
    const [img, setImg] = useState(null);



    const navigate = useNavigate();

// Get data localStorage
    const auth = localStorage.getItem("user");
    const id = JSON.parse(auth)._id//localStorge data get id by JSON.parse(LocalStorage Data).any data get

//call only by dependencies by id 
    useEffect(() => {
        getUsers(id);
    }, [id])

  //Get data by localStorage and show input field to updateUser
    async function getUsers(id) {
        let resp = await fetch(`http://localhost:5000/profile/${id}`)
        resp = await resp.json()
        setName(resp.data.name)//set a data useState
        setPhone(resp.data.phone)//set a data useState
        setEmail(resp.data.email)//set a data useState
        setDob(resp.data.dob)//set a data useState
        setGender(resp.data.gender)//set a data useState
        setBio(resp.data.bio)//set a data useState
        setImg(resp.data.img)//set a data useState

    }

//Update user data and save database
    function updateUser() {
        let item = { name, email, phone, dob, gender, bio }//All data one variable and use body in fetch
        try {
            fetch(`http://localhost:5000/profile/${id}`, {
                method: 'PUT',
                body: JSON.stringify(item),
                headers: {
                    "Accept": "application/json",
                    "content-Type": "application/json"
                }
            }).then((result) => {
                result.json().then((resp) => {
                    // console.log(resp)
                    if (resp.acknowledged == true) {
                        setAlert(result)
                        const resolveed = new Promise(resolve => setTimeout(resolve, 2000));
                        toast.promise(
                            resolveed,
                            {
                                pending: 'Updated is pending',
                                success: 'Profile Update Successfully 👌',
                            }
                        )
                        setTimeout(() => navigate("/profile"), 3000)

                    }
                })
            })
        } catch (error) {
            console.error(error, "error")
        }
    }

//Image append and formData to use body in fetch 
    const formData = new FormData();
    formData.append('img', img);

//only run to image update to render this function
    useEffect(() => {
        const id = setTimeout(() => {
            updateImg();

        }, 100);
        return () => {
            clearTimeout(id)
        }
    }, [img])


//image update function
    function updateImg() {
        try {
            fetch(`http://localhost:5000/profileimg/${id}`, {
                method: 'PUT',
                body: formData,
            }).then((result) => {
                result.json().then((resp) => {
                    // console.log(resp)
                    if(resp){
                    getUsers(id);
                    }
                })
            })
        } catch (error) {
            console.error(error, "error")
        }
    }


    return (
        <>
            <div className="card container d-flex justify-content-center mt-5 py-3" style={{ maxWidth: "400px", minWidth: "280px" }}>
                <div className="flex-column align-items-center text-center profilephoto ">
                    {img ? <img src={`http://localhost:5000/${img}`} className="profilepic rounded-circle p-1 bg-primary " /> : <img src="https://bootdey.com/img/Content/avatar/avatar6.png" className=" profilepic rounded-circle p-1 bg-primary " />}
                    <label><i className=" camera  fa fa-camera fa-beat"></i><input type="file" name="img" onChange={(e) => { setImg(e.target.files[0]) }} hidden /></label>

                    <input className="input-box" type="text" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Enter Name" />
                    <input className="input-box" type="text" value={email} placeholder="Enter Email" />
                    <input className="input-box" type="text" value={phone} placeholder="Enter Phone" />
                    <input className="input-box" type="date" onChange={(e) => { setDob(e.target.value) }} placeholder="Enter Date of birth" />
                    <select className="input-box" value={gender} onChange={(e) => { setGender(e.target.value) }}>
                        <option value="">Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input className="input-box" type="text" value={bio} onChange={(e) => { setBio(e.target.value) }} placeholder="Enter Bio data" />
                    <button className="appButton" onClick={updateUser}>Update</button>
                </div>
                {alert.status === 200 ? <ToastContainer limit={1} position="top-center" theme="colored" autoClose={1000} /> : null}
            </div>
        </>
    )

}

