// ** Components
import Header from "../components/templates/dashboard/Header"
import ProductDashboard from "../components/templates/dashboard/ProductDashboard"
import CategoryDashboard from "../components/templates/dashboard/CategoryDashboard"

const DashboardPage = () => {
    return (
        <div>
            <div>
                <Header />
            </div>

            <hr className="my-3" />

            <div
                className="flex items-center justify-between gap-8 m:flex-col m:gap-4"
            >

                <div className="w-full">
                    <ProductDashboard />
                </div>

                <div className="w-full">
                    <CategoryDashboard />
                </div>
            
            </div>
        </div>
    )
}

export default DashboardPage