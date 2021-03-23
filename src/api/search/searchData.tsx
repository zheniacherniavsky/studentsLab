import IProduct from "@/api/product";

async function getData() {
  // i will find a better way to do it
  const inputValue = (document.getElementById("search_input") as HTMLInputElement).value; // or it's good?

  if (inputValue === (undefined || "")) return [];

  const result = await fetch("http://localhost:3000/products");
  const products = await result.json();

  return products.filter((value: IProduct) => value.name.toLowerCase().includes(inputValue.toLowerCase()));
}

export default getData;
