import "./App.css";
import Home from "./components/pages/home/Home";
import Orders from "./components/pages/orders/Orders";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
  );
}

export default App;
