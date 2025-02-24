import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePageThree from "./pages/HomePageThree";
import CompanyPage from "./pages/CompanyPage";
import ErrorPage from "./pages/ErrorPage";
import OrderListPage from "./pages/OrderListPage";
import InvoicePreviewPage from "./pages/InvoicePreviewPage";
import SignInPage from "./pages/SignInPage";
import ProductListPage from "./pages/ProductListPage";
import CategoryListPage from "./pages/CategoryListPage";
import SupplierListPage from "./pages/SupplierListPage";
import BranchListPage from "./pages/BranchListPage";
import TransactionListPage from "./pages/TransactionListPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import AddCategoryPage from "./pages/AddCategoryPage";
import EditCategoryPage from "./pages/EditCategoryPage";
import AddSupplierPage from "./pages/AddSupplierPage";
import EditSupplierPage from "./pages/EditSupplierPage";
import AddBranchPage from "./pages/AddBranchPage";
import EditBranchPage from "./pages/EditBranchPage";
import ViewBranchPage from "./pages/ViewBranchPage";
import ViewBranchOrdersPage from "./pages/ViewBranchOrdersPage";
import ViewSupplierPage from "./pages/ViewSupplierPage";
import ViewSupplierOrdersPage from "./pages/ViewSupplierOrdersPage";
import ViewSupplierProductsPage from "./pages/ViewSupplierProductsPage";
import SupplierInvoicePreviewPage from "./pages/SupplierInvoicePreviewPage";
import ViewProductPage from "./pages/ViewProductPage";
import DeliveryDaysListPage from "./pages/DeliveryDaysListPage";
import AddDeliveryDaysPage from "./pages/AddDeliveryDaysPage";
import EditDeliveryDaysPage from "./pages/EditDeliveryDaysPage";
import ReportsPage from "./pages/ReportsPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
    return (
        <AuthProvider>
            <BrowserRouter basename="/">
                <Routes>
                    <Route exact path="/" element={<SignInPage />} />
                    <Route exact path="/dashboard" element={<ProtectedRoute element={HomePageThree} allowedRoles={['admin']} />} />

                    <Route exact path="/order-list" element={<ProtectedRoute element={OrderListPage} allowedRoles={['admin']} />} />
                    <Route exact path="/order-view/:id" element={<ProtectedRoute element={InvoicePreviewPage} allowedRoles={['admin']} />} />

                    <Route exact path="/products-list" element={<ProtectedRoute element={ProductListPage} allowedRoles={['admin']} />} />
                    <Route exact path="/products-view" element={<ProtectedRoute element={ViewProductPage} allowedRoles={['admin']} />} />
                    <Route exact path="/products-add" element={<ProtectedRoute element={AddProductPage} allowedRoles={['admin']} />} />
                    <Route exact path="/products-edit/:productId" element={<ProtectedRoute element={EditProductPage} allowedRoles={['admin']} />} />

                    <Route exact path="/categories-list" element={<ProtectedRoute element={CategoryListPage} allowedRoles={['admin']} />} />
                    <Route exact path="/categories-add" element={<ProtectedRoute element={AddCategoryPage} allowedRoles={['admin']} />} />
                    <Route exact path="/categories-edit/:categoryId" element={<ProtectedRoute element={EditCategoryPage} allowedRoles={['admin']} />} />

                    <Route exact path="/suppliers-list" element={<ProtectedRoute element={SupplierListPage} allowedRoles={['admin']} />} />
                    <Route exact path="/suppliers-view" element={<ProtectedRoute element={ViewSupplierPage} allowedRoles={['admin']} />} />
                    <Route exact path="/suppliers-add" element={<ProtectedRoute element={AddSupplierPage} allowedRoles={['admin']} />} />
                    <Route exact path="/suppliers-edit/:supplierId" element={<ProtectedRoute element={EditSupplierPage} allowedRoles={['admin']} />} />
                    <Route exact path="/supplier-products/:supplierId" element={<ProtectedRoute element={ViewSupplierProductsPage} allowedRoles={['admin']} />} />
                    <Route exact path="/supplier-orders/:supplierId" element={<ProtectedRoute element={ViewSupplierOrdersPage} allowedRoles={['admin']} />} />
                    <Route exact path="/supplier-order-view/:supplierId/:orderId" element={<ProtectedRoute element={SupplierInvoicePreviewPage} allowedRoles={['admin']} />} />

                    <Route exact path="/shops-list" element={<ProtectedRoute element={BranchListPage} allowedRoles={['admin']} />} />
                    <Route exact path="/shop-view" element={<ProtectedRoute element={ViewBranchPage} allowedRoles={['admin']} />} />
                    <Route exact path="/shop-add" element={<ProtectedRoute element={AddBranchPage} allowedRoles={['admin']} />} />
                    <Route exact path="/shop-edit/:id" element={<ProtectedRoute element={EditBranchPage} allowedRoles={['admin']} />} />
                    <Route exact path="/shops-orders/:id" element={<ProtectedRoute element={ViewBranchOrdersPage} allowedRoles={['admin']} />} />

                    <Route exact path="/delivery-days" element={<ProtectedRoute element={DeliveryDaysListPage} allowedRoles={['admin']} />} />
                    <Route exact path="/add-delivery-days" element={<ProtectedRoute element={AddDeliveryDaysPage} allowedRoles={['admin']} />} />
                    <Route exact path="/edit-delivery-days/:id" element={<ProtectedRoute element={EditDeliveryDaysPage} allowedRoles={['admin']} />} />

                    <Route exact path="/transactions-list" element={<ProtectedRoute element={TransactionListPage} allowedRoles={['admin']} />} />
                    <Route exact path="/reports" element={<ProtectedRoute element={ReportsPage} allowedRoles={['admin']} />} />

                    <Route exact path="/company" element={<ProtectedRoute element={CompanyPage} allowedRoles={['admin']} />} />

                    <Route exact path="*" element={<ErrorPage />} />


                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;