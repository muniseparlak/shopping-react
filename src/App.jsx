import React from 'react'
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Alert from 'react-bootstrap/Alert';
import Confetti from "react-confetti";
import FuzzySearch from 'react-fuzzy';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


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
  const [productInput, setProductInput] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [confettiVisible, setConfettiVisible] = useState(false);
  

  const [filteredShopId, setFilteredShopId] = useState("");
  const [filteredCategoryId, setFilteredCategoryId] = useState("");
  const [filteredStatus, setFilteredStatus] = useState("all");
  const [filteredName, setFilteredName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState('')
  


  const addProducts = () => {
    if (!productInput || !selectedShop || !selectedCategory) {
      alert('Lütfen ürün adı, market ve kategori seçin.');
      return;
    }
    const newProduct = {
      id: nanoid(),
      name: productInput,
      shop: selectedShop, // Shop bilgisi eklendi
      category: selectedCategory, // Category bilgisi eklendi
      isBought: false,
    };

    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, newProduct];

      const allItemsBought = updatedProducts.every((item) => item.isBought);
      if (allItemsBought && updatedProducts.length > 0) {
        setConfettiVisible(true);
      }

      return updatedProducts;
    });

    setProductInput('');
  };

  useEffect(() => {
    const allItemsBought = products.every((item) => item.isBought);
    if (allItemsBought && products.length > 0) {
      setConfettiVisible(true);
    } else {
      setConfettiVisible(false);
    }
  }, [products]);

 

  const handleBuy = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, isBought: !product.isBought }
          : product
      )
    );
    setShowAlert(true);
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  useEffect(() => {
    const allItemsBought = products.every((item) => item.isBought);

    if (allItemsBought && products.length > 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [products]);

 
  
  

  const handleFilterChange = (result) => {
    setFilteredProducts(result);
  };

  const filterProducts = () => {
    return filteredProducts.filter((product) => {
      return (
        (!filteredShopId || product.shop == parseInt(filteredShopId)) &&
        (!filteredCategoryId || product.category == parseInt(filteredCategoryId)) &&
        (filteredStatus === 'all' ||
          (filteredStatus === 'bought' && product.isBought) ||
          (filteredStatus === 'notBought' && !product.isBought))
      );
    });
  };

  // useEffect(() => {
  //   // Filtrelerde herhangi bir değişiklik olduğunda çalışacak kod buraya gelecek
  //   const filteredProducts = filterProducts();
   
  // }, [filteredShopId, filteredCategoryId, filteredStatus, filteredName, products]);
  

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
          value={selectedShop}
          className="form-select"
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
          value={selectedCategory}
          className="form-select"
        >
          <option>Kategori seç</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Select>

        <button className="button m-3 px-5" onClick={addProducts} type="button">
          Button
        </button>
      </Form>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Alışveriş Tamamlandı!
        </Alert>
      )}
      {confettiVisible && <Confetti />}

      <div>
        <h1 className="label-head">Ürünleri Filtrele</h1>


        <FuzzySearch
          list={products}
          keys={["name", "shop", "category"]}
          onChange={handleFilterChange}
          resultsTemplate={(props, state, styles) => {
            return state.results.map((val, i) => (
              <div key={i} style={styles.results}>
                {val.name}
              </div>
            ));
          }}
        />

        <select onChange={(e) => setFilteredShopId(e.target.value)} value={filteredShopId}>
          <option value="">Market</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.id}>
              {shop.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setFilteredCategoryId(e.target.value)} value={filteredCategoryId}>
          <option value="">Kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div>
          <input
            type="radio"
            value="all"
            checked={filteredStatus === 'all'}
            onChange={() => setFilteredStatus('all')}
          />{' '}
          Tümü
          <input
            type="radio"
            value="bought"
            checked={filteredStatus === 'bought'}
            onChange={() => setFilteredStatus('bought')}
          />{' '}
          Satın Alınanlar
          <input
            type="radio"
            value="notBought"
            checked={filteredStatus === 'notBought'}
            onChange={() => setFilteredStatus('notBought')}
          />{' '}
          Satın Alınmayanlar
        </div>
        
      </div>

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
  );
}

export default App;
