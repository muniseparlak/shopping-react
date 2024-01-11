import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { nanoid } from "nanoid";

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

const getShopName = (shopId) => {
  const shop = shops.find((s) => s.id === shopId);
  return shop ? shop.name : "";
};

const getCategoryName = (categoryId) => {
  const category = categories.find((c) => c.id === categoryId);
  return category ? category.name : "";
};

export const AddToForm = ({
  products,
  productInput,
  setProductInput,
  addProducts,
  handleBuy,
  handleDelete,
  selectedShop,
  setSelectedShop, selectedCategory, setSelectedCategory
}) => {
  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label className="label-head" htmlFor="products">
            Alınacaklar
          </Form.Label>
          <Form.Control
            id="products"
            type="text"
            value={productInput}
            onChange={(e) => setProductInput(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" size="xl" onClick={addProducts} type="button">
          Ekle
        </Button>

        <Form.Select
          onChange={(e) => setSelectedShop(e.target.value)}
          value={selectedShop}
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
        >
          <option>Kategori seç</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Form.Select>
      </Form>

      <Table striped bordered hover>
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
              <td>{getCategoryName(product.category)}</td>
              <td>{getShopName(product.shop)}</td>
              <td onClick={() => handleBuy(product.id)}>
                {product.isBought ? "Satın Alındı" : "Satın Al"}
              </td>
              <td onClick={() => handleDelete(product.id)}>
                <IconButton icon="❌" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
