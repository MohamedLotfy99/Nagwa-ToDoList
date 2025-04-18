import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./assets/components/pages/Layout";
import Home from "./assets/components/pages/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
