import "./tshirt.css";
import data from "../data/data.json";
import ProductCard from "../components/card/productCard";
import { useState, useEffect, useRef } from "react";
import {
  getProductsByType,
  filterProductsBySizes,
  filterProductByPriceRange
} from "../services/dataServices";

const Tshirt = () => {
  const [tshirts, setTshirts] = useState([]);
  const sizeFilters = useRef([]);
  const allTshirtsList = useRef([]);
  const lowPriceRef = useRef();
  const highPriceRef = useRef();

  useEffect(() => {
    const res = getProductsByType("tshirt");
    allTshirtsList.current = res;
    setTshirts(res);
  }, []);

  const handleFilterBySize = (status, productSize) => {
    if (status && !sizeFilters.current.includes(productSize)) {
      sizeFilters.current.push(productSize);
    } else if (!status && sizeFilters.current.includes(productSize)) {
      sizeFilters.current = sizeFilters.current.filter(
        (size) => size !== productSize
      );
    }
  };

  const handleFilterByPrice = () => {
    const min = lowPriceRef.current.value;
    const max = highPriceRef.current.value;
    const filteredBySize = filterProductsBySizes(
      sizeFilters.current,
      allTshirtsList.current
    );
    const filteredByPrice = filterProductByPriceRange(min, max, filteredBySize)
    setTshirts(filteredByPrice);
  }


  return (
    <div className="tshirt p-4">
      <div className="title-container">
        <h1 className="title">T-shirts</h1>
      </div>
      <div className="tshirt-container">
        <div className="filter-container p-3">
          <h4 className="text-center mt-2">Filter</h4>
          <label>
            <h5 className="m-2">Sizes</h5>
            <div>
              <span>S</span>
              <input
                className="checkbox-style"
                type={"checkbox"}
                onClick={(e) => handleFilterBySize(e.target.checked, "S")}
              />
            </div>
            <div>
              <span>M</span>
              <input
                className="checkbox-style"
                type={"checkbox"}
                onClick={(e) => handleFilterBySize(e.target.checked, "M")}
              />
            </div>
            <div>
              <span>L</span>
              <input
                className="checkbox-style"
                type={"checkbox"}
                onClick={(e) => handleFilterBySize(e.target.checked, "L")}
              />
            </div>
            <div>
              <span>XL</span>
              <input
                className="checkbox-style"
                type={"checkbox"}
                onClick={(e) => handleFilterBySize(e.target.checked, "XL")}
              />
            </div>
            <div>
              <span>XXL</span>
              <input
                className="checkbox-style"
                type={"checkbox"}
                onClick={(e) => handleFilterBySize(e.target.checked, "XXL")}
              />
            </div>
          </label>

          <div className="price-container p-3">
            <h5 className="p-2">Price Between</h5>
            <div className="price-container-range">
              <input type={"number"} className="input-text" ref={lowPriceRef} />
              <h5 className="text-center">And</h5>
              <input
                type={"number"}
                className="input-text"
                ref={highPriceRef}
              />
              <button className="button" onClick={handleFilterByPrice}>Show Products</button>
            </div>
          </div>
        </div>
        <div className="tshirt-container-products">
          {tshirts?.map((prod) => (
            <ProductCard data={prod} key={prod.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tshirt;
