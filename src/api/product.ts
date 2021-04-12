export const createProduct = () => null;

export const updateProduct = (
  id: number,
  name: string,
  category: string,
  description: string,
  price: number,
  age: number,
  imgPath: string,
  platforms: Array<string>
) => {
  console.log("updateProduct", [id, name, category, description, price, age, imgPath], platforms);
};

export const deleteProduct = () => null;
