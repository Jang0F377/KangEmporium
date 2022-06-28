import {Products} from "../data/Products";
import RenderCardComponent from "./RenderCardComponent";
import {Link} from "react-router-dom";


const HomeComponent = () => {




    return(

        <div className=' bg-gray-200 mx-60  pt-6'>
            <div className='text-center pb-4 mb-4 text-7xl underline'>
                Welcome
            </div>
            <div className=''>
                <div className='text-center text-4xl mb-4 mt-4'>Check out our <Link className='text-blue-600 underline' to='product'>Products</Link> page to see our complete stock!</div>
                <div className='text-center text-4xl mb-4 mt-16'>Have a look at what's on sale today:</div>
                <div className='grid grid-cols-3 gap-x-28 gap-y-10'>
                    {Products.filter(product => product.onSale).map((item) => (
                        <RenderCardComponent key={item.name} item={item}/>
                    ))}
                </div>
            </div>



        </div>
    );
};

export default HomeComponent;