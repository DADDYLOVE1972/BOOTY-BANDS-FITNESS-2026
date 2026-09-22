import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import PolicyPage from "./pages/PolicyPage";

function App() {
  return (<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/success" element={<Success />} />
    <Route path="/cancel" element={<Cancel />} />
    <Route path="/policies/:policyId" element={<PolicyPage />} />
  </Routes>
  );
}

export default App;