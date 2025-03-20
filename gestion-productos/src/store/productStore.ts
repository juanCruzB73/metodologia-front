import { create } from "zustand";
import { IProducts } from "../types/products";

interface IProductStore{
    products:IProducts[];
    activeProduct:IProducts|null;
    //methods
    addProduct:(product:IProducts)=>void;
    setActiveProduct:(product:IProducts)=>void;
    clearActiveProduct:()=>void;
    updateProduct:(product:IProducts)=>void;
    removeProduct:(id:Date)=>void;
}

export const productStore=create<IProductStore>((set)=>({
    products:[],
    activeProduct:null,
    addProduct:(newProductIn)=>set((state)=>({products:[...state.products,newProductIn]})),
    setActiveProduct:(activeProductIn)=>set(()=>({activeProduct:activeProductIn})),
    clearActiveProduct:()=>set(()=>({activeProduct:null})),
    updateProduct:(updatedProductIn)=>set((state)=>{
        console.log("store:",updatedProductIn)
        const productsArr=state.products.map((product)=>product.id==updatedProductIn.id ? {...product,...updatedProductIn} : product);
        return {products:productsArr};
    }),
    removeProduct:(id)=>set((state)=>{
        const productsArr=state.products.filter(product=>product.id!==id);
        return {products:productsArr};
    })
}))