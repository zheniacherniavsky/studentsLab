import IProduct from "@/api/product.d";

async function getRecentlyAddedProducts(count: number) {
  const result = await fetch("http://localhost:3000/products");
  const products = await result.json();

  products.sort((a: IProduct, b: IProduct) => Date.parse(b.date) - Date.parse(a.date));

  const resultArray = [];
  for (let i = 0; i < count; i++) if (products[i]) resultArray.push(products[i]);
  return resultArray;
}

export default getRecentlyAddedProducts;
