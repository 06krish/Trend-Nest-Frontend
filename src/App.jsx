
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetails from "./pages/ProductDetails.jsx";

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/products" element={<Products/>} />
          <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
  );
}
