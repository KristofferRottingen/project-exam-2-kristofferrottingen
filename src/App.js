import React from "react";
import "./sass/style.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./sites/Home";
import ProductPage from "./sites/ProductPage"
import DetailsPage from "./sites/DetailsPage";
import ContactPage from "./sites/ContactPage";
import LoginForm from "./sites/Login";
import { AuthProv } from "./context/Auth";
import AdminProducts from "./components/adminpage/AdminProducts";
import AdminAddProduct from "./components/adminpage/AdminAddProduct"
import AdminMessages from "./components/adminpage/AdminMessages";
import AdminFeedback from "./components/adminpage/AdminFeedback";
import AdminEdit from "./components/adminpage/AdminEdit";

function App() {
  return (
    <AuthProv>
      <Router>
        <div>
          
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/produkter" exact element={<ProductPage />} />
            <Route path="/detail/:id" element={<DetailsPage />} />
            <Route path="/kontakt" exact element={<ContactPage />} />
            <Route path="/login" exact element={<LoginForm />} />
            <Route path="/admin/produkter" element={<AdminProducts />} />
            <Route path="/admin/legg-til-produkt" element={<AdminAddProduct />} />
            <Route path="/admin/henvendelser" element={<AdminMessages />} />
            <Route path="/admin/feedback" element={<AdminFeedback />} />
            <Route path="/admin/produkter/edit/:id" element={<AdminEdit />} />
          </Routes>
          <footer>
            <div>All rights served Evon © 2022</div>
            <div>post@elements.as</div>
          </footer>
        </div>
      </Router>
    </AuthProv>
  );
}

export default App;
