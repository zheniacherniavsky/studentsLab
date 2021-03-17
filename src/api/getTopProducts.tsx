import Product from "@/api/Product";

async function getRecentlyAddedProducts(count) {
  const result = await fetch("http://localhost:3000/products");
  const json = await result.json();
  const products = Object.values(json);

  products.sort((a: Product, b: Product) => Date.parse(b.date) - Date.parse(a.date));

  const resultArray = [];
  for (let i = 0; i < count; i++) if (products[i]) resultArray.push(products[i]);
  return resultArray;
}

export default getRecentlyAddedProducts;
