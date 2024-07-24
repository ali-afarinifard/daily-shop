import { Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Products from "../pages/products/Products"
import Categories from "../pages/Categories"
import Settings from "../pages/Settings"
import PageNotFound from "../pages/404"
import Order from "../pages/Orders"
import AddProductPage from "../pages/products/add/AddProduct"
import DeleteProduct from "../pages/products/delete/DeleteProduct"
import EditProduct from "../pages/products/edit/EditProduct"
import ProductView from "../pages/products/view/ProductView"
import Register from "../components/templates/Register"
import Login from "../components/templates/Login"
import ProtectedRoute from "../components/templates/ProtectedRoute"
import RedirectIfAuthenticated from "../components/templates/RedirectIfAuthenticated"


const Router = () => {

    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
            <Route path="/products/delete/:id" element={<ProtectedRoute><DeleteProduct /></ProtectedRoute>} />
            <Route path="/products/edit/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
            <Route path="/products/view/:id" element={<ProtectedRoute><ProductView /></ProtectedRoute>} />
            <Route path="/products/add" element={<ProtectedRoute><AddProductPage /></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Order /></ProtectedRoute>} />
            <Route path="/login" element={<RedirectIfAuthenticated><Login /></RedirectIfAuthenticated>} />
            <Route path="/register" element={<RedirectIfAuthenticated><Register /></RedirectIfAuthenticated>} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default Router