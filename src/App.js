import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import Home from "./pages/home";
import Tshirt from "./pages/t-shirt";
import Logo from "./components/logo/logo";
import Footer from "./components/footer/footer";
import Cart from "./pages/cart";
import Sweaters from "./pages/sweaters";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Logo />
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/t-shirt" element={<Tshirt />} />
            <Route path="/sweaters" element={<Sweaters />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;