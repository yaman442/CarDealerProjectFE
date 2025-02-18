import { Route, Routes } from "react-router-dom";
import LandingPage from "./static/LandingPage";
import Navbar from "./static/Navbar";
import CarIndex from "./components/cars/CarIndex";
import DealerIndex from "./components/dealers/DealerIndex";
import CreateCar from "./components/cars/CreateCar";
import CreateDealer from "./components/dealers/CreateDealer";
import UpdateCar from "./components/cars/UpdateCar";
import UpdateDealer from "./components/dealers/UpdateDealer"; // ✅ Added Import

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/car-index" element={<CarIndex />} />
        <Route path="/dealer-index" element={<DealerIndex />} />
        <Route path="/create-car" element={<CreateCar />} />
        <Route path="/create-dealer" element={<CreateDealer />} />
        <Route path="/update-car/:id" element={<UpdateCar />} />
        <Route path="/update-dealer/:id" element={<UpdateDealer />} /> {/* ✅ Added Route */}
      </Routes>
    </>
  );
}

export default App;
