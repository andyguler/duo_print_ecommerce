import "./footer.css";


const Footer = () => {

    return (
        <div className="footer-container">
            <div>
                <img src="./images/facebook.png" />
                <span style={{color: "white"}}> Facebook</span>
            </div>
            <div>
                <img src="./images/instagram.png" />
                <span style={{color: "white"}}> Instagram</span>
            </div>
            <div>
                <img src="./images/whtasapp.png" />
                <span style={{color: "white"}}> 0712 345 678</span>
            </div>
            <div>
                <img src="./images/email.png" />
                <span style={{color: "white"}}> contact@duoprint.ro</span>
            </div>
        </div>
    )
}

export default Footer;