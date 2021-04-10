import IProduct from "@/api/product";
import SelectInput from "@/elements/inputs/selectInput";
import useActions from "@/helpers/hooks/useActions";
import useTypedSelector from "@/helpers/hooks/useTypedSelector";
import { useState } from "react";
import { InfoModal, InfoModalProps, InfoType } from "@/components/modal/infoModal";
import "./cartPage.scss";

let selectedProductsArray: Array<IProduct> = [];

const Product = ({ product: p }: { product: { product: IProduct; count: number } }) => {
  const [productAmount, setProductAmount] = useState(p.count);
  const [platform, choosePlatfrom] = useState("");

  const redux = useActions();

  const getDateNow = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const yyyy = today.getFullYear();

    return <>{`${mm}/${dd}/${yyyy}`}</>;
  };

  const getPlatformsArray = (): string[] => {
    const platformsArray: string[] = [];
    p.product.platform.forEach((platform: string) => {
      switch (platform) {
        case "pc":
          platformsArray.push("PC");
          break;
        case "playstationfive":
          platformsArray.push("PlayStation 5");
          break;
        case "xboxone":
          platformsArray.push("XBox One");
          break;
        default:
          break;
      }
    });
    return platformsArray;
  };

  return (
    <tr>
      <td>{p.product.name}</td>
      <td>
        <SelectInput
          header=""
          value={platform}
          handleChange={(e) => choosePlatfrom(e.currentTarget.value)}
          name={`${p.product.name}_platform`}
          options={[...getPlatformsArray()]}
        />
      </td>
      <td>{getDateNow()}</td>
      <td>
        <input
          className="productAmount"
          type="number"
          value={productAmount}
          onChange={(e) => {
            const { value } = e.currentTarget;
            const amount = Number(value);
            if (amount < 1) {
              setProductAmount(1);
              redux.changeProductCount({ product: p.product, count: 1 });
            } else {
              setProductAmount(amount);
              redux.changeProductCount({ product: p.product, count: amount });
            }
          }}
        />
      </td>
      <td>{(p.product.price * productAmount).toFixed(2)}</td>
      <td>
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.currentTarget.checked) selectedProductsArray.push(p.product);
            else
              selectedProductsArray = selectedProductsArray.filter((value: IProduct) => {
                if (value.name !== p.product.name) return value;
                return null;
              });
          }}
        />
      </td>
    </tr>
  );
};

const CartPage = () => {
  const { products } = useTypedSelector((state) => state.cart);
  const [removeEmptyError, showRemoveEmptyError] = useState(false);
  const [cartEmptyError, showCartEmptyError] = useState(false);
  const [buyModal, showBuyModal] = useState(false);

  const redux = useActions();

  const getTotalCost = () => {
    let total = 0;
    products.forEach((p) => {
      total += p.product.price * p.count;
    });
    return total;
  };

  const removeEmptyErrorProps: InfoModalProps = {
    infoModalHeader: "Error",
    infoModalText: "Please select the items you want to remove from your shopping cart.",
    infoModalType: InfoType.ALERT,
    infoModalCallback: () => null,
    closeInfoModalCallback: () => showRemoveEmptyError(false),
  };

  const buyEmptyErrorProps: InfoModalProps = {
    infoModalHeader: "Error",
    infoModalText: "Your cart is empty. Add some games.",
    infoModalType: InfoType.ALERT,
    infoModalCallback: () => null,
    closeInfoModalCallback: () => showCartEmptyError(false),
  };

  const buyModalProps: InfoModalProps = {
    infoModalHeader: "Please, confirm your order.",
    infoModalText: `Sum: ${getTotalCost().toFixed(2)}`,
    infoModalType: InfoType.PROMPT,
    infoModalCallback: () => {
      redux.clearCart();
      showBuyModal(false);
    },
    closeInfoModalCallback: () => showBuyModal(false),
  };

  return (
    <div className="cartPage page_content_container">
      {removeEmptyError ? <InfoModal {...removeEmptyErrorProps} /> : null}
      {cartEmptyError ? <InfoModal {...buyEmptyErrorProps} /> : null}
      {buyModal ? <InfoModal {...buyModalProps} /> : null}
      <h2>Cart page</h2>
      <table>
        <tbody>
          <tr key="header">
            <th>Name</th>
            <th>Platform</th>
            <th>Order date</th>
            <th>Amount</th>
            <th>Price ($)</th>
            <td />
          </tr>
          {products.map((p) => (
            <Product product={p} key={p.product.name} />
          ))}
          <tr>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td>
              <button
                type="button"
                onClick={() => {
                  if (selectedProductsArray.length !== 0) {
                    redux.removeProductFromCart(selectedProductsArray);
                    selectedProductsArray = [];
                  } else showRemoveEmptyError(true);
                }}
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <h3>Games cost: {getTotalCost().toFixed(2)}</h3>
        <h3>Your balance: 32.98 $</h3>
        <button
          type="button"
          onClick={() => {
            if (products.length !== 0) {
              showBuyModal(true);
            } else showCartEmptyError(true);
          }}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default CartPage;
