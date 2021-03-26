import IProduct from "@/api/product";
import Card from "@/components/cards/card";
import "@/components/cards/cardsContainer.scss";

interface ICardsProps {
  data: Array<IProduct>;
  type: string;
  count: number;
}

const CardsContainer = (props: ICardsProps) => {
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
        <h2 className="cards_container__title">{title}</h2>
        <div className="cards_container__content">
          {props.data.map((item: IProduct) => (
            <Card product={item} key={item.name} />
          ))}
        </div>
      </div>
    );
  }

  return <></>;
};

export default CardsContainer;
