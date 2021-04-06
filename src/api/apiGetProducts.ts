import IProduct from "./product";

// FIXME: Promise return?

export default async function getProducts(
  searchName: string | null,
  criteria: string,
  type: string,
  genre: string,
  age: string
): Promise<IProduct[]> {
  const result = await fetch(
    `http://localhost:3000/sortedProducts/${type}/${criteria}/${genre}/${age}/${searchName || "__emptyName__"}`
  );
  const products = await result.json();
  return products;
}
