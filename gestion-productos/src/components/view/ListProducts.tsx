import { use, useEffect, useState } from 'react';
import { productStore } from '../../store/productStore';
import './listProducts.css'
import { CreateEdit } from '../modals/CreateEdit';
import {IProducts} from "../../types/products"
export const ListProducts = () => {
    
    const products=productStore((state)=>state.products);

    const [handlePopUp,setHandlePopUp]=useState(false);
    const setActiveProduct=productStore((state)=>state.setActiveProduct);
    const removeProduct=productStore((state)=>state.removeProduct);

    const handleOpenPopUp = () => setHandlePopUp(true);
    const handleClosePopUp = () => setHandlePopUp(false);
    
    let [productsMaps,setProductsMaps]=useState<IProducts[]>([])

    useEffect(() => {
        if (Array.isArray(products)) {
          setProductsMaps(products);
        } else {
            console.log("is not array")
          setProductsMaps([]);
        }
        console.log(productsMaps);
      }, [products]);

    return (
    <div>
        <button onClick={()=>{handleOpenPopUp()}}>create</button>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
            {
                productsMaps.map(product=>(
                
                    <tr>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <div>
                        <button onClick={() => { handleOpenPopUp(); setActiveProduct(product); }}>Edit</button>
                        <button onClick={() => removeProduct(product.id!)}>Delete</button>
                        </div>
                    </tr>
        
                ))
            }
            </tbody>
        </table>
        {handlePopUp && <CreateEdit onClosePopUp={handleClosePopUp} />}

    </div>
  )
}
