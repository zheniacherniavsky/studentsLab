import IProduct from "@/api/product.d";
import Card from "@/components/cards/card";
import "./cardsContainer.scss";

interface ICardsProps {
  title: string;
  data: Array<IProduct>;
  class: string;
  toggleEditCardModal: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  setEditProduct: React.Dispatch<React.SetStateAction<IProduct | undefined>> | undefined;
}

const CardsContainer = (props: ICardsProps) => {
  const styleClass = `${props.class} cards_container page_content_container`;
  return (
    <div className={styleClass}>
      <h2>{props.title}</h2>
      <div className="content">
        {props.data.length !== 0 ? (
          props.data.map((item, index) => (
            <Card
              tabindex={index}
              product={item}
              key={item.name}
              toggleEditCardModal={props.toggleEditCardModal}
              setEditProduct={props.setEditProduct}
            />
          ))
        ) : (
          <h4>No results were found for your search...</h4>
        )}
      </div>
    </div>
  );
};

export default CardsContainer;
