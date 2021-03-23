import IProduct from "@/api/product";
import Card from "@/Components/Cards/card";
import "@/Components/Cards/cardsContainer.scss";

const CardsContainer = (props: any) => {
  let title;

  if (props.data.length !== 0) {
    switch (props.type) {
      case "search":
        title = "Search results";
        break;
      case "top":
        title = `Top ${props.count} products`;
        break;
      default:
        break;
    }
    return (
      <div className="cards_container">
        <h1 className="cards_container__title">{title}</h1>
        <div className="cards_container__content">
          {props.data.map((item: IProduct) => (
            <Card product={item} />
          ))}
        </div>
      </div>
    );
  }

  return <></>;
};

export default CardsContainer;
