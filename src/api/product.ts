import IProduct from "./product.d";

export const createProduct = async (product: IProduct) => {
  const response = await fetch("http://localhost:3000/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...product }),
  });

  const answer = await response.json();

  if (response.ok) {
    return answer.product;
  }
  return { errorMessage: answer.message };
};

export const updateProduct = async (
  id: number,
  name: string,
  category: string,
  description: string,
  price: number,
  age: number,
  imgPath: string,
  platforms: Array<string>
) => {
  const response = await fetch("http://localhost:3000/product", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ id, name, category, description, price, age, imgPath, platforms }),
  });

  const answer = await response.json();

  if (response.ok) {
    return answer.product;
  }
  return { errorMessage: answer.message };
};

export const deleteProduct = async (id: number) => {
  const response = await fetch(`http://localhost:3000/product/${id}`, {
    method: "DELETE",
  });

  const answer = await response.json();

  if (response.ok) {
    return true;
  }
  return { errorMessage: answer.message };
};
