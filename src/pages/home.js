import "./home.css"
import Logo from "../components/logo/logo";
import data from "../data/data.json";
import ProductCard from "../components/card/productCard";


const Home = () => {
  // console.log(data);
  return (
    <div className="p-4">
      <div style={{ marginTop: "2rem" }}>
        <h2 className="text-center mb-4">Most buyed items</h2>
        <div className="cards-container">
          {data.mostBuyedItems.map((prod) => (
            <ProductCard data={prod} key={prod.id}/>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Home;
