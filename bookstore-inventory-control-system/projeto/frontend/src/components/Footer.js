import "../styles/footer.css"
import logo from "../assets/img/logo3.png";
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

function Footer() {

  return (
    <div className="footer-container">

      <div>
        <h2>KHÁM PHÁ</h2>
        <p>
          <a href="/#">Trang chủ</a>
        </p>
        <p>
          <a href="/sach">Sách</a>
        </p>
        <p>
          <a href="/khach-hang">Khách hàng</a>
        </p>
        <p>
          <a href="/don-hang">Mua hàng</a>
        </p>
      </div>

      <div>
        <h2>THÔNG TIN LIÊN HỆ</h2>
        <p>SĐT: (84) 902459122</p>
        <p>Email: 22520211@gm.uit.edu.vn</p>
        <div className="footer-social-icon">
          <a href="https://twitter.com/">
            <i><FaTwitter /></i>
          </a>
          <a href="https://www.instagram.com/">
            <i> <AiFillInstagram /></i>
          </a>
          <a href="https://www.linkedin.com/">
            <i><FaLinkedinIn /></i>
          </a>
        </div>
      </div>

      <div>
        <img
          src={logo}
          alt="Logo"
          className="footer-logo" />
        <h2>© 2024 - SE104.P11 Team 8. All rights reserved.</h2>
      </div>

    </div>
  );
}

export default Footer;
