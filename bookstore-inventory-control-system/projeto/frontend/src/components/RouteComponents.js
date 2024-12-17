import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage.js';
import NotFoundPage from '../pages/NotFoundPage.js';
import BookDetailsPage from '../pages/BookListPage.js';
import BookFormPage from '../pages/BookFormPage.js';
import CustomerListPage from '../pages/CustomerListPage.js';
import CustomerFormPage from '../pages/CustomerFormPage.js';
import PurchaseListPage from '../pages/PurchaseListPage.js';
import PurchaseFormPage from '../pages/PurchaseFormPage.js';
import SaleListPage from '../pages/SaleListPage.js';
import SaleFormPage from '../pages/SaleFormPage.js';

const RouteComponents = () => {
  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/*" element={<NotFoundPage />} />

          <Route path="/sach" element={<BookDetailsPage />} />
          <Route path="/them-sach" element={<BookFormPage />} />
          <Route path="/chinh-sua-sach/:id" element={<BookFormPage />} />

          <Route path="/khach-hang" element={<CustomerListPage />} />
          <Route path="/them-khach-hang/" element={<CustomerFormPage />} />
          <Route path="/sua-khach-hang/:id" element={<CustomerFormPage />} />

          <Route path="/don-hang" element={<PurchaseListPage />} />
          <Route path="/them-don-hang/" element={<PurchaseFormPage />} />
          <Route path="/chinh-sua-don-hang/:id" element={<PurchaseFormPage />} />

          <Route path="/vendas" element={<SaleListPage />} />
          <Route path="/add-venda/" element={<SaleFormPage />} />
          <Route path="/edit-venda/:id" element={<SaleFormPage />} />
        </Routes>

      </Router>
    </>
  );

};

export default RouteComponents;
