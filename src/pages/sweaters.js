import "./sweaters.css";
import { useState, useEffect, useRef } from "react";
import ProductCard from "../components/card/productCard";
import { getProductsByType, filterProductsBySizes, filterProductByPriceRange } from "../services/dataServices";

const Sweaters = () => {
  const [sweaters, setSweater] = useState([]);
  const sizeFilters = useRef([]);
  const allSweatersList = useRef([]);
  const lowPriceRef = useRef();
  const highPriceRef = useRef();

  useEffect(() => {
    const res = getProductsByType("sweater");
    allSweatersList.current = res;
    setSweater(res);
  }, []);

  const handleFilterBySize = (status, productSize) => {
    if (status && !sizeFilters.current.includes(productSize)) {
      sizeFilters.current.push(productSize)
    }
    else if (!status && sizeFilters.current.includes(productSize)) {
      sizeFilters.current = sizeFilters.current.filter(size => size !== productSize)
    }
  };

  const handleFilterByPrice = () => {
    const min = lowPriceRef.current.value;
    const max = highPriceRef.current.value;
    const filteredBySize = filterProductsBySizes(
      sizeFilters.current,
      allSweatersList.current
    );
    const filteredByPrice = filterProductByPriceRange(min, max, filteredBySize)
    setSweater(filteredByPrice);

  }


  return (
    <div className="sweaters p-4">
      <div className="title-container">
        <h1 className="title">Sweaters</h1>
      </div>
      <div className="sweaters-container">
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
              <input className="checkbox-style" type={"checkbox"} onClick={(e) => handleFilterBySize(e.target.checked, "M")} />
            </div>
            <div>
              <span>L</span>
              <input className="checkbox-style" type={"checkbox"} onClick={(e) => handleFilterBySize(e.target.checked, "L")} />
            </div>
            <div>
              <span>XL</span>
              <input className="checkbox-style" type={"checkbox"} onClick={(e) => handleFilterBySize(e.target.checked, "XL")} />
            </div>
            <div>
              <span>XXL</span>
              <input className="checkbox-style" type={"checkbox"} onClick={(e) => handleFilterBySize(e.target.checked, "XXL")} />
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
        <div className="sweaters-container-products">
          {sweaters?.map((prod) => (
            <ProductCard data={prod} key={prod.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sweaters;
