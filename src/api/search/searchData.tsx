class Value {
  name: string;
}

async function getData() {
  // i will find a better way to do it
  const inputValue = (document.getElementById("search_input") as HTMLInputElement).value; // or it's good?

  if (inputValue === (undefined || "")) return [];

  const result = await fetch("http://localhost:3000/products");
  const json = await result.json();
  const products = Object.values(json);

  return products.filter((value) => (value as Value).name.toLowerCase().includes(inputValue.toLowerCase()));
}

export default getData;
