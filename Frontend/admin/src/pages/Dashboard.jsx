// ** Components
import Header from "../components/templates/dashboard/Header"
import ProductDashboard from "../components/templates/dashboard/ProductDashboard"
import CategoryDashboard from "../components/templates/dashboard/CategoryDashboard"
import OrderDashboard from "../components/templates/dashboard/OrderDashboard"

const DashboardPage = () => {
    return (
        <div>
            <div>
                <Header />
            </div>

            <hr className="my-3" />

            <div
                className="flex items-center justify-between gap-8 xl:flex-col xl:gap-4"
            >

                <div className="w-full">
                    <ProductDashboard />
                </div>

                <div className="w-full">
                    <CategoryDashboard />
                </div>
            
            </div>

            <div className="w-full">
                <OrderDashboard />
            </div>
        </div>
    )
}

export default DashboardPage