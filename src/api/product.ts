export const createProduct = () => null;

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
  console.log("updateProduct", [id, name, category, description, price, age, imgPath], platforms);
  const response = await fetch("http://localhost:3000/updateProduct", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ id, name, category, description, price, age, imgPath, platforms }),
  });

  const answer = await response.json();

  if (response.ok) {
    console.log(answer.product);
  }
  return { errorMessage: answer.message };
};

export const deleteProduct = () => null;
