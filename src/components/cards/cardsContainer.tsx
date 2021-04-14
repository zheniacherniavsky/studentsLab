import IProduct from "@/api/product.d";
import Card from "@/components/cards/card";
import "./cardsContainer.scss";

interface ICardsProps {
  title: string;
  data: Array<IProduct>;
  class: string;
}

const CardsContainer = (props: ICardsProps) => {
  const styleClass = `${props.class} cards_container page_content_container`;
  return (
    <div className={styleClass}>
      <h2>{props.title}</h2>
      <div className="content">
        {props.data.length !== 0 ? (
          props.data.map((item, index) => <Card tabindex={index} product={item} key={item.name} />)
        ) : (
          <h4>No results were found for your search...</h4>
        )}
      </div>
    </div>
  );
};

export default CardsContainer;
