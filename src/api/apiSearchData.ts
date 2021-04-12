import IProduct from "@/api/product.d";

async function getData(searchInput: string) {
  if (searchInput === (undefined || "")) return [];

  const result = await fetch("http://localhost:3000/products");
  const products = await result.json();

  return products.filter((value: IProduct) => value.name.toLowerCase().includes(searchInput.toLowerCase()));
}

export default getData;
