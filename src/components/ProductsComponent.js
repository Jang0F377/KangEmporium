import {Products} from "../data/Products";
import RenderCardComponent from "./RenderCardComponent";


const ProductsComponent = () => {


    return(
        <div className=' bg-gray-200 mx-60  pt-6'>
            <div className='grid grid-cols-3 gap-x-28 gap-y-10'>
                {Products.map((item) => (
                    <RenderCardComponent key={item.name} item={item} />
                    ))}
            </div>
        </div>
    );
};

export default ProductsComponent;