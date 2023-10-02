// import React, { useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// async function Verify() {
//     const params =useParams();
//     console.log(params)
//     const navigate = useNavigate()
//     let res = await axios.post(`http://localhost:5000/verify/${params.id}`)
//    console.log(res.data.user)
//    if (res.data.user && res.data.user.verified===1 ) {
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setTimeout(() => navigate("/"), 1000)
//   }
    

//       return(
//          <div>
//           <div><input type="text" /></div>
//          </div>
//       )

// }
// export default Verify;

