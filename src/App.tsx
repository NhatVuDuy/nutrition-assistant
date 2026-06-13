import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Results from "./pages/Results";
import FoodLookup from "./pages/FoodLookup";
import System from "./pages/System";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/results" element={<Results />} />
          <Route path="/food" element={<FoodLookup />} />
          <Route path="/sys" element={<System />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
