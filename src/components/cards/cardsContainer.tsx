import IProduct from "@/api/product";
import Card from "@/components/cards/card";
import "./cardsContainer.scss";

interface ICardsProps {
  title: string;
  data: Array<IProduct>;
}

const CardsContainer = (props: ICardsProps) => (
  <div className="cards_container page_content_container">
    <h2>{props.title}</h2>
    <div className="content">
      {props.data.length !== 0 ? (
        props.data.map((item) => <Card product={item} key={item.name} />)
      ) : (
        <h4>No results were found for your search...</h4>
      )}
    </div>
  </div>
);

export default CardsContainer;
