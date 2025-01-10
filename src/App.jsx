import './App.css'
import Navbar from './components/Navbar';
import ProductsList from './components/ProductList';
import Cart from './components/Cart'
import {Routes,Route  } from 'react-router-dom';
import AddEditProduct from './components/AddEditProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add-product" element={<AddEditProduct />} />

      </Routes>
    </>
  )
}

export default App
