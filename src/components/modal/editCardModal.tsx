import { createProduct, deleteProduct, updateProduct } from "@/api/product";
import IProduct from "@/api/product.d";
import TextInput from "@/elements/inputs/textInput";
import Textarea from "@/elements/inputs/textarea";
import Modal from "@/elements/modal";
import ModalCloseButton from "@/elements/modalCloseButton";
import { FormEvent, useState } from "react";
import noPhotoImg from "@/assets/images/no-photo.jpg";
import SelectInput from "@/elements/inputs/selectInput";
import { InfoModal, InfoType } from "./infoModal";

export const enum EditCardType {
  ADD,
  UPDATE,
}

export const EditCardModal = ({
  closeCallback,
  closeCallbackSuccess,
  product: p,
  type,
}: {
  closeCallbackSuccess: () => void;
  closeCallback: () => void;
  product: IProduct;
  type: EditCardType;
}) => {
  const [imgPath, changeImgPath] = useState(p.image);
  const [name, changeName] = useState(p.name);
  const [category, changeCategory] = useState(p.category);
  const [description, changeDescription] = useState(p.shortdescription);
  const [price, changePrice] = useState(p.price.toFixed(2));
  const [age, setAge] = useState(p.age.toString());

  const [platformPc, togglePlatformPC] = useState(p.platform.includes("pc"));
  const [platformPs5, togglePlatformPs5] = useState(p.platform.includes("playstationfive"));
  const [platformXBoxOne, togglePlatformXBoxOne] = useState(p.platform.includes("xboxone"));

  const [imgPathError, imgPathErrorDispatch] = useState("");
  const [nameError, nameErrorDispatch] = useState("");
  const [categoryError, categoryErrorDispatch] = useState("");
  const [priceError, priceErrorDispatch] = useState("");
  const [descriptionError, descriptionErrorDispatch] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const platforms = [];
    if (platformPc) platforms.push("pc");
    if (platformPs5) platforms.push("playstationfive");
    if (platformXBoxOne) platforms.push("xboxone");
    switch (type) {
      case EditCardType.ADD:
        await createProduct({
          ...p,
          name,
          category,
          shortdescription: description,
          price: parseFloat(price),
          age: parseFloat(age),
          platform: platforms,
          image: imgPath,
          date: new Date().toString(),
        });
        break;
      case EditCardType.UPDATE:
        await updateProduct(p.id, name, category, description, parseFloat(price), parseFloat(age), imgPath, platforms);
        break;
      default:
        break;
    }
    closeCallbackSuccess();
  };

  const [deleteInfoModal, showDeleteInfoModal] = useState(false);

  return (
    <Modal>
      {deleteInfoModal ? (
        <InfoModal
          infoModalHeader={`Delete ${p.name}`}
          infoModalText="You want delete this game?"
          infoModalType={InfoType.PROMPT}
          infoModalCallback={async () => {
            await deleteProduct(p.id);
            showDeleteInfoModal(false);
            closeCallbackSuccess();
          }}
          closeInfoModalCallback={() => showDeleteInfoModal(false)}
        />
      ) : null}

      <form onSubmit={handleSubmit}>
        <div className="head">
          <h2>Edit Card</h2>
          <ModalCloseButton closeCallback={closeCallback} />
        </div>
        <div className="content">
          <div className="image">
            <h3>Card image</h3>
            <img src={imgPath || noPhotoImg} alt="Product" />
          </div>
          <div className="inputs">
            <h3>Information</h3>
            <TextInput
              autofocus
              id="changeName"
              type="text"
              label="Name"
              maxLength={50}
              value={name}
              handleChange={changeName}
              errorDispatch={nameErrorDispatch}
            />
            <p>{nameError}</p>
            <TextInput
              autofocus={false}
              id="changeCategory"
              type="text"
              label="Category"
              maxLength={50}
              value={category}
              handleChange={changeCategory}
              errorDispatch={categoryErrorDispatch}
            />
            <p>{categoryError}</p>
            <TextInput
              autofocus={false}
              id="changePrice"
              type="number"
              label="Price"
              maxLength={10}
              value={price}
              handleChange={changePrice}
              errorDispatch={priceErrorDispatch}
            />
            <p>{priceError}</p>
            <TextInput
              autofocus={false}
              id="changeImage"
              type="text"
              label="Image"
              maxLength={360}
              value={imgPath}
              handleChange={changeImgPath}
              errorDispatch={imgPathErrorDispatch}
            />
            <p>{imgPathError}</p>
            <Textarea
              id="description"
              label="Description"
              maxLength={310}
              value={description}
              handleChange={changeDescription}
              errorDispatch={descriptionErrorDispatch}
            />
            <p>{descriptionError}</p>
            <SelectInput
              header="Age"
              name="age"
              value={age}
              handleChange={(e) => setAge(e.currentTarget.value)}
              options={["3+", "6+", "12+", "18+"]}
            />
            <h3>Platform</h3>
            <label htmlFor="platform/pc">
              <span>PC</span>
              <input
                className="radioButton"
                id="platform/pc"
                type="checkbox"
                checked={platformPc}
                onChange={() => togglePlatformPC(!platformPc)}
              />
            </label>
            <label htmlFor="platform/ps5">
              <span>PlayStation 5</span>
              <input
                className="radioButton"
                id="platform/ps5"
                type="checkbox"
                checked={platformPs5}
                onChange={() => togglePlatformPs5(!platformPs5)}
              />
            </label>
            <label htmlFor="platform/xboxone">
              <span>XBox One</span>
              <input
                className="radioButton"
                id="platform/xboxone"
                type="checkbox"
                checked={platformXBoxOne}
                onChange={() => togglePlatformXBoxOne(!platformXBoxOne)}
              />
            </label>
          </div>
        </div>
        <div className="buttons">
          <button type="submit" className="modal_button">
            Submit
          </button>
          {type === EditCardType.UPDATE ? (
            <button type="button" className="modal_button" onClick={() => showDeleteInfoModal(true)}>
              Delete card
            </button>
          ) : null}
        </div>
      </form>
    </Modal>
  );
};
