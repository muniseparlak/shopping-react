import React from 'react'

import { useState, useEffect } from "react";
import {nanoid} from 'nanoid'
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Confetti from 'react-confetti'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import useWindowSize from 'react-use/lib/useWindowSize';



const shops = [
  { id: 1, name: "Migros" },
  { id: 2, name: "Bim" },
  { id: 3, name: "Toyzz Shop" },
];

const categories = [
  { id: 1, name: "Elektronik" },
  { id: 2, name: "Oyuncak" },
  { id: 3, name: "Şarküteri" },
];

const IconButton = ({ icon }) => (
  <button type="button" onClick={() => alert("Product deleted!")}>
    {icon}
  </button>
);



function App() {

  const [productInput, setProductInput] = useState('')
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const { width, height } = useWindowSize()

  const addProducts = () => {
    const newProduct = {
      id: nanoid(),
      name: productInput,
      shop: selectedShop,  // Shop bilgisi eklendi
      category: selectedCategory,  // Category bilgisi eklendi
      isBought: false,
    };

    setProducts([...products, newProduct]);
    setProductInput("");
  };


  const handleBuy = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, isBought: !product.isBought } : product
      )
    );
  };

  const handleDelete = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  useEffect(() => {
    // handleCompleted fonksiyonunu tanımlamışsınız ve orada bir durumu güncelliyorsunuz
    handleCompleted();
  }, [isCompleted]);

  const handleCompleted = () => {
    // isCompleted durumunu güncellendiğinde Confetti bileşenini render etmek istiyorsunuz
    // Burada Confetti bileşenini render etmek için bir durumu kontrol edebilirsiniz
    if (isCompleted) {
      return (
        <Confetti
          width={width}
          height={height}
        />
      );
    }
  }
  
  


  

  return (
    <div className="container">
      <Form>
        <Form.Group>
          <Form.Label className="label-head" htmlFor="products">
            Alınacaklar
          </Form.Label>
          <Form.Control
            id="products"
            type="text"
            className="input"
            value={productInput}
            onChange={(e) => setProductInput(e.target.value)}
          />
        </Form.Group>
       

        <Form.Select
          onChange={(e) => setSelectedShop(e.target.value)}
          value={selectedShop} className="form-select"
        >
          <option>Market seç</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.id}>
              {shop.name}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory} className="form-select"
        >
          <option>Kategori seç</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
  
          ))}
        </Form.Select>
        
        <button className="button m-3 px-5" onClick={addProducts} type="button" >
  Button
</button>
      </Form>

      <Table className="table-container">
        <thead>
          <tr>
            <th>Ürün Adı</th>
            <th>Market</th>
            <th>Kategori</th>
            <th>Durum</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              style={{
                textDecoration: product.isBought ? "line-through" : "none",
              }}
            >
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.shop}</td>
              <td onClick={() => handleBuy(product.id)}>
                {product.isBought ? "Satın Alındı" : "Satın Al"}
              </td>
              <td onClick={() => handleDelete(product.id)}>
                <IconButton icon="✖️" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    
  )
}

export default App