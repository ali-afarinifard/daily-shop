import { Routes, Route } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Products from "../pages/products/Products"
import Categories from "../pages/Categories"
import Settings from "../pages/Settings"
import PageNotFound from "../pages/404"
import Layout from '../layout/Layout'
import Order from "../pages/Orders"
import AddProductPage from "../pages/products/add/AddProduct"
import Login from "../pages/Login"
import Register from "../pages/Register"
import DeleteProduct from "../pages/products/delete/DeleteProduct"
import EditProduct from "../pages/products/edit/EditProduct"

const Router = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} /> */}
                <Route path="/products" element={<Products />} />
                <Route path="/products/delete/:id" element={<DeleteProduct />} />
                <Route path="/products/edit/:id" element={<EditProduct />} />
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