import { useContext, useRef, useState } from "react";
import { Context } from "../context/context";
import ProductCard from "../components/card/productCard";
import { Spinner } from "react-bootstrap";
import emailjs from "@emailjs/browser";
import "./cart.css";

const Cart = () => {
  const [loading, setLoading] = useState(false);

  const { cart, setCart } = useContext(Context);
  const formRef = useRef();

  const handleQty = (id, value) => {
    const temp = cart.map((obj) => ({ ...obj }));
    const found = temp.find((obj) => obj.id === id);
    found.qty = value;
    setCart(temp);
  };

  const hanldeDeleteFromCart = (id) => {
    const temp = cart.map((obj) => ({ ...obj }));
    const newArr = temp.filter((prod) => prod.id !== id);
    setCart(newArr);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = {
      fullName: formRef.current[0].value,
      email: formRef.current[1].value,
      phone: formRef.current[2].value,
      address: formRef.current[3].value,
      message: formRef.current[4].value,
      cart: cart
        .map(
          (prod) =>
            `(id=${prod.id}, title=${prod.title}, qty=${prod.qty}, price=${prod.price})`
        )
        .join("|"),
      totalPrice: cart
        .map((prod) => prod.price * prod.qty)
        .reduce((acc, current) => acc + current),
    };
    console.log(form);
    console.log("send email");
    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          alert("Email sent!!!");
          console.log(result.text);
          setLoading(false);
        },
        (error) => {
          console.log(error.text);
          setLoading(false);
        }
      );
  };

  return (
    <div className="mt-3">
      <h2 className="text-center p-4">Your Cart</h2>
      {cart.map((prod) => (
        <div key={prod.id} className="row container cart-card m-2 m-auto">
          <ProductCard
            data={prod}
            showByNow={false}
            qty={prod.qty}
            className="col-md-6"
          />
          <div className="col-md-6">
            <p>
              Quantity:
              <span>
                <input
                  defaultValue={prod.qty}
                  type="number"
                  onChange={(e) => handleQty(prod.id, e.target.value)}
                />
              </span>
            </p>
            <p>
              Pret: <span>{prod.price * prod.qty}</span>ron
            </p>
            <button onClick={() => hanldeDeleteFromCart(prod.id)}>
              Delete Product
            </button>
          </div>
        </div>
      ))}
      <div className="form-container">
        <form className="form-style" ref={formRef}>
          <h4>Enter your details</h4>
          <ul className="form">
            <li>
              <label className="label" for="full-name">
                Full Name:
              </label>
              <input type="text" id="full-name" name="full_name" />
            </li>
            <li>
              <label className="label" for="mail">
                E-mail:
              </label>
              <input type="email" id="mail" name="user_email" />
            </li>
            <li>
              <label className="label" for="phone">
                Phone number:
              </label>
              <input type="tel" id="phone" name="phone-number" />
            </li>
            <li>
              <label className="label" for="adress">
                Adress:
              </label>
              <input type="text" id="adress" name="adress" />
            </li>
            <li>
              <label className="label" for="message">
                Message:
              </label>
              <textarea
                rows="6"
                cols="40"
                id="message"
                name="user_message"
              ></textarea>
            </li>
            <li className="justify-content-center">
              <button onClick={handleCheckout} disabled={loading}>
                {loading ? <Spinner /> : "Send your order"}
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default Cart;
