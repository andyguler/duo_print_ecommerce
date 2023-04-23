import { useContext } from "react";
import { Context } from "../../context/context";
import { getProductById } from "../../services/dataServices";
import "./productCard.css";

const ProductCard = ({ data, qty, showByNow = true, className }) => {
  const { cart, setCart } = useContext(Context);

  const handleOnClick = (data) => {
    const temp = cart.map(obj => ({...obj}));
    const existedProd = temp.find((obj) => obj.id === data.id);
    if (existedProd) {
      existedProd.qty++;
    } else {
      const tempObj = {...data};
      data.qty = 1;
      temp.push(data);
    }
    setCart(temp);
  };

  return (
    <div className={`card-container ${className}`}>
      <img src={data.img} />
      <h3>{data.title}</h3>
      <h4>{data.size.join(", ")}</h4>
      <div className="d-flex custom-price-btn">
        <p className="price">{data.price + " Lei"}</p>
        {showByNow && (
          <button className="btn-button" onClick={() => handleOnClick(data)}>
            Buy Now
          </button>
        )}
        {qty && <div>Qty: {qty}</div>}
      </div>
    </div>
  );
};

export default ProductCard;
