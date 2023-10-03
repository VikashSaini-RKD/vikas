import React from 'react'
// import { Button } from 'react-bootstrap';
import { Link} from 'react-router-dom'

function Footer() {
  const auth = localStorage.getItem("user");
// const navigate= useNavigate()
//   const logout = () => {
//     localStorage.clear();
//     navigate("/login")
// }
  return (
 <>
  {auth?  <div className='footer-main'>
  <div className='footer-primary'>
    <Link to="/" className="text-decoration-none text-light pt-3" >Home</Link>
    <Link to="/About" className="text-decoration-none text-light pt-3" >About Us</Link>
    <Link to="/Contact" className="text-decoration-none text-light pt-3" >Contact</Link>
    <Link to="/Profile" className="text-decoration-none text-light pt-3" >Profile</Link>
  </div>
  <div className='footer-secondary '>
    <Link to="/Order" className="text-decoration-none text-light pt-3" >Order</Link>
    <Link to="/" className="text-decoration-none text-light pt-3" >Help</Link>
    <Link to="/" className="text-decoration-none text-light pt-3" >Products</Link>
    <Link to="/" className="text-decoration-none text-light pt-3" >T&C</Link>
  </div>
  {/* <div className='footer-logout'>
    <span to="/login" className="text-decoration-none text-light" onClick={logout} >Log Out</span>
  </div> */}
</div>:null}
 </>
  )
}

export default Footer