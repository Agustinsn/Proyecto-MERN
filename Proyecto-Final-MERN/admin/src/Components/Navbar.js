import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa'
import {BsPersonBoundingBox,BsFillPeopleFill} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import {FiMail} from 'react-icons/fi'
import {MdWork} from 'react-icons/md'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    const [sidebar, setSidebar]= useState(false)

    const showSidebar =()=>{
        setSidebar(!sidebar)
    }

    return (
        <>
            <div className="navbar">
                <Link to="#" className="menu-bars" onClick={showSidebar}>
                    <FaIcons.FaBars/>
                </Link>
            </div>
            <nav className={sidebar? 'nav-menu active': 'nav-menu'}>
                <ul className="nav-menu-items" >
                    <li className="navbar-toggle" onClick={showSidebar}>
                        <Link to="#" className="menu-bars">
                            <AiOutlineClose/>
                        </Link>
                    </li>
                    <li className="nav-text" onClick={showSidebar}>
                        <Link to="Home">
                            <FaIcons.FaHome/><span>Home</span>
                        </Link>
                    </li>
                    <li className="nav-text" onClick={showSidebar}>
                        <Link to="Cita">
                            <BsFillPeopleFill/><span>Citas</span>
                        </Link>
                    </li>
                    <li className="nav-text" onClick={showSidebar}>
                        <Link to="Solicitudes">
                            <FiMail/><span>Solicitudes</span>
                        </Link>
                    </li>
                    <li className="nav-text" onClick={showSidebar}>
                        <Link to="Servicios">
                            <MdWork/><span>Servicios</span>
                        </Link>
                    </li>
                    <li className="nav-text" onClick={showSidebar}> 
                        <Link to="Trabajadores">
                            <BsPersonBoundingBox/><span>Trabajadores</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
