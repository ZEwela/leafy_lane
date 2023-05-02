import "./App.css";
import { sampleProducts } from "./data";

function App() {
  return (
    <div>
      <header>
        <h1>Leafy Lane</h1>
      </header>
      <main>
        {sampleProducts.map((product) => (
          <li key={product.slug}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h2>{product.name}</h2>
            <p>£ {product.price}</p>
          </li>
        ))}
      </main>
      <footer>Leafy Lane 2023</footer>
    </div>
  );
}

export default App;
