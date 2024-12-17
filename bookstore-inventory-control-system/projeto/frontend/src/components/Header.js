import React, { useState } from "react";
import "../styles/header.css"
import {
    FaBars, FaTimes, FaBookOpen, FaUser, FaShoppingCart
} from "react-icons/fa";
import { AiFillHome } from 'react-icons/ai';
import { MdPointOfSale } from 'react-icons/md';
import { BiChevronDown } from 'react-icons/bi';
import { HiDocumentReport } from 'react-icons/hi';
import logo from "../assets/img/logo2.png";

function Header() {

    const [click, setClick] = useState(false);

    const handleClick = () => {
        setClick(!click);

        document.body.style.overflow = !click ? 'hidden' : 'auto';
    };

    return (
        <div className="header-container">

            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>

            <div className="menu-toggle-icon" onClick={handleClick} >
                {click ? (
                    <FaTimes />
                ) : (
                    <FaBars />
                )}
            </div>

            <ul className={`nav-menu ${click ? "active" : ""}`}>
                <li>
                    <a href="/#">
                        <AiFillHome className="nav-menu-icon" />
                        Trang chủ
                    </a>
                </li>

                <li>
                    <a href="/sach">
                        <FaBookOpen className="nav-menu-icon" />
                        Sách
                    </a>
                </li>

                <li>
                    <a href="/khach-hang">
                        <FaUser className="nav-menu-icon" />
                        Khách hàng
                    </a>
                </li>

                <li>
                    <a href="/don-hang">
                        <FaShoppingCart className="nav-menu-icon" />
                        Nhập hàng
                    </a>
                </li>

                <li>
                    <a href="/vendas">
                        <MdPointOfSale className="nav-menu-icon" />
                        Bán Hàng
                    </a>
                </li>

                <li className="sub-meunu-li">
                    <a href={`/`}>
                        <HiDocumentReport className="nav-menu-icon" />
                        Báo cáo
                        <BiChevronDown className="nav-menu-icon" />
                    </a>

                    <ul className="sub-menu">
                        <li>
                            <a href="/" >
                                <FaBookOpen className="nav-menu-icon" />
                                Sách
                            </a>
                        </li>
                        <li>
                            <a href="/" >
                                <FaUser className="nav-menu-icon" />
                                Khách hàng
                            </a>
                        </li>
                        <li>
                            <a href="/" >
                                <FaShoppingCart className="nav-menu-icon" />
                                Nhập hàng
                            </a>
                        </li>
                        <li>
                            <a href="/" >
                                <FaShoppingCart className="nav-menu-icon" />
                                Bán hàng
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>

        </div>
    );
}

export default Header;