import IProduct from "./product";

export default async function getProducts(
  searchName: string | null,
  platform: string,
  criteria: string,
  type: string,
  genre: string,
  age: string
): Promise<IProduct[]> {
  const result = await fetch(
    `http://localhost:3000/sortedProducts/${platform}/${type}/${criteria}/${genre}/${age}/${
      searchName || "__emptyName__"
    }`
  );
  const products = await result.json();
  return products;
}
