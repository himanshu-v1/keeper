import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import App from "../App";
import Landing from "../components/landing/Landing";
import Login from "../components/Login/Login";
import { Outlet } from 'react-router-dom';

function Routing() {
  return (
    <>
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </Router>
    
    <Outlet />
    </>
  );
}

export default Routing;