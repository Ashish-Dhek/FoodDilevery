import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'



const Footer = () => {
  return (
    <div className='footer'  id='footer'>
        <div className="footer-content">

            {/* left */}

            <div className='footer-content-left'>
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At saepe mollitia pariatur ab. Odit dolores deserunt dolore illo. Recusandae nobis, distinctio fugit assumenda sapiente architecto sint qui tenetur eius aliquam.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>

            {/* centre */}

            <div className='footer-content-centre'>
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>


            {/* right */}

            <div className='footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+123456789</li>
                    <li>dummy@cravingpoint.com</li>
                </ul>
            </div>


        </div>

        <hr />
        <p className="footer-copyright">
            Copyright 2024 @ Cravingpoint.com - All Right Reserved.
        </p>

    </div>
  )
}

export default Footer
