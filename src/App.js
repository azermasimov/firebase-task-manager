import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Explore from "./pages/Explore";
import Offers from "./pages/Offers";
import Category from "./pages/Category";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/edit-product/:productId" element={<EditProduct />} />
          <Route
            path="/category/:categoryName/:productId"
            element={<Product />}
          />
          <Route path="/contact/:salespersonId" element={<Contact />} />
        </Routes>
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
