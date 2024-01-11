import { AddToForm } from "./container/AddToForm";
import { useState } from "react";
import {nanoid} from 'nanoid'


function App() {

  const [productInput, setProductInput] = useState('')
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  const addProducts = ()=>{
    const newProduct = {
      id: nanoid(),  // Use nanoid to generate a unique ID
      name: productInput,
      shop: selectedShop,
      category: selectedCategory,
      isBought: false,
    };
  
    setProducts([...products, newProduct]);
    setProductInput("");
  }

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

  
  

  return (
    <>
     <AddToForm
      productInput={productInput}
      setProductInput={setProductInput}
      addProducts={addProducts}
      handleBuy={handleBuy}
      handleDelete = {handleDelete}
      selectedShop={selectedShop}  // Pass selectedShop to the form
        setSelectedShop={setSelectedShop}  // Pass setSelectedShop to the form
        selectedCategory={selectedCategory}  // Pass selectedCategory to the form
        setSelectedCategory={setSelectedCategory}  // Pass setSelectedCategory to the form
        products={products}
     />

    </>
  )
}

export default App
