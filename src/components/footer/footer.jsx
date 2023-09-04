import React from 'react'
import { FaGithub, FaLinkedin} from 'react-icons/fa'; 
import {BsInstagram,BsTwitter} from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="footer footer-center items-center md:mt-48 mt-5 p-4 bg-neutral text-neutral-content">
      <div className="items-center grid-flow-col">
        <p>Copyright © 2023 - All right reserved</p>
      </div> 
      <div className="grid-flow-col gap-4 md:place-self-center">

        <a href='/'> <FaGithub size={25}/></a>
        <a href='/'> <FaLinkedin size={25}/></a>
        <a href='/'> <BsInstagram size={25} /></a>
        <a href='/'> <BsTwitter size={25} /></a>
      </div>
    </footer>
  )
}

export default Footer
