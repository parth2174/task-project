import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from '../home/Login'
import Register from '../home/Register'
import Dashboard from '../dashboard/Dashboard'


function Routing() {
    
    return (
      <div className="app">
        <BrowserRouter>              
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            </BrowserRouter>
        </div>
    );
  
 }
  
    export default Routing;