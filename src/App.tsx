import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Results from "./pages/Results";

export default function App() {
  return (
    <BrowserRouter basename="/nutrition-assistant">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
