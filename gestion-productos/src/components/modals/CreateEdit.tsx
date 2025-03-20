import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { IProducts } from "../../types/products";
import { productStore } from "../../store/productStore";

const initialState: IProducts = {
  name: "",
  price: 0,
  category: "",
};

type Modal = {
  onClosePopUp: VoidFunction;
};

export const CreateEdit: FC<Modal> = ({ onClosePopUp }) => {
  const activeProduct = productStore((state) => state.activeProduct);
  const clearActiveProduct = productStore((state) => state.clearActiveProduct);
  const updateProduct = productStore((state) => state.updateProduct);
  const addProduct = productStore((state) => state.addProduct);

  const [formValue, setFormValue] = useState<IProducts>(initialState);

  useEffect(() => {
    if (activeProduct) {
      setFormValue(activeProduct);
    } else {
      setFormValue(initialState);
    }
  }, [activeProduct]); // ✅ Added dependency

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formValue)
    if (activeProduct) {
      updateProduct(formValue);
    } else {
      const date=new Date()
      const formWithId={...formValue,id:date}
      addProduct(formWithId);
    }
    clearActiveProduct();
    onClosePopUp();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} style={{ backgroundColor: "red", padding: "20px", borderRadius: "8px" }}>
        <input onChange={handleChange} type="text" name="name" value={formValue.name} placeholder="name" />
        <input onChange={handleChange} type="number" name="price" value={formValue.price} placeholder="price" />
        <input onChange={handleChange} type="text" name="category" value={formValue.category} placeholder="category" />
        <button type="submit">Submit</button>
        <button type="button" onClick={onClosePopUp}>Close</button>
      </form>
    </div>
  );
};
