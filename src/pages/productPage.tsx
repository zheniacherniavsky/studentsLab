const ProductPage = ({ type }: { type: string }) => {
  switch (type) {
    case "pc":
      return (
        <div>
          <h1>This is pc page</h1>
        </div>
      );
    case "ps5":
      return (
        <div>
          <h1>This is ps5 page</h1>
        </div>
      );
    case "xbox1":
      return (
        <div>
          <h1>This is xbox1 page</h1>
        </div>
      );
    default:
      return null;
  }
};

export default ProductPage;
