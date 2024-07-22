import { Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Products from "../pages/products/Products"
import Categories from "../pages/Categories"
import Settings from "../pages/Settings"
import PageNotFound from "../pages/404"
import Layout from '../layout/Layout'
import Order from "../pages/Orders"
import AddProductPage from "../pages/products/add/AddProduct"
import DeleteProduct from "../pages/products/delete/DeleteProduct"
import EditProduct from "../pages/products/edit/EditProduct"
import ProductView from "../pages/products/view/ProductView"
import Register from "../components/templates/Register"
import Login from "../components/templates/Login"
import ProtectedRoute from "../components/templates/ProtectedRoute"

const Router = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route index element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/products" element={<Products />} />
                <Route path="/products/delete/:id" element={<DeleteProduct />} />
                <Route path="/products/edit/:id" element={<EditProduct />} />
                <Route path="/products/view/:id" element={<ProductView />} />
                <Route path="/products/add" element={<AddProductPage />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/orders" element={<Order />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Layout>
    )
}

export default Router