import IProduct from "@/api/product";
import TextInput from "@/elements/inputs/textInput";
import Textarea from "@/elements/inputs/textarea";
import Modal from "@/elements/modal";
import ModalCloseButton from "@/elements/modalCloseButton";
import { FormEvent, useState } from "react";
import noPhotoImg from "@/assets/images/no-photo.png";
import SelectInput from "@/elements/inputs/selectInput";

const EditCardModal = ({
  closeCallback,
  closeCallbackSuccess,
  product: p,
}: {
  closeCallbackSuccess: () => void;
  closeCallback: () => void;
  product: IProduct;
}) => {
  const [imgPath, changeImgPath] = useState(p.image);
  const [name, changeName] = useState(p.name);
  const [category, changeCategory] = useState(p.category);
  const [description, changeDescription] = useState(p.shortdescription);
  const [price, changePrice] = useState(p.price.toFixed(2));
  const [age, setAge] = useState(p.age.toString());

  const [imgPathError, imgPathErrorDispatch] = useState("");
  const [nameError, nameErrorDispatch] = useState("");
  const [categoryError, categoryErrorDispatch] = useState("");
  const [priceError, priceErrorDispatch] = useState("");
  const [descriptionError, descriptionErrorDispatch] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    closeCallbackSuccess();
  };

  return (
    <Modal>
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
            <TextInput
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
          </div>
        </div>
        <div className="buttons">
          <button type="submit" className="modal_button">
            Submit
          </button>
          <button type="submit" className="modal_button">
            Delete card
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCardModal;
