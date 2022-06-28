import {useParams} from "react-router-dom";
import {Products} from "../data/Products";
import {PlusSmIcon, ShoppingCartIcon} from "@heroicons/react/outline";
import {useDispatch} from "react-redux";
import {addItemToCart} from "../redux/cartSlice";


const DetailedProductScreen = () => {
    const dispatch = useDispatch();
    const name = useParams()
    const item = Products.find(item => item.name === name.name)


    const DetailedProductComponent = () => {
        return(
            <div className='flex'>
                <div className='flex flex-col p-2 m-10'>
                    <img className=' ' src={item.imageUrl} alt="ERROR"/>
                </div>
                <div className='flex flex-col p-5'>
                    <div className="text-2xl p-1.5 underline">
                        Description
                    </div>
                    <div className="text-xl p-1.5">
                        {item.description}
                    </div>
                    <div className='flex flex-row justify-between'>
                        <div className='mt-10 text-lg'>
                            Left in stock: {item.countInStock}
                        </div>
                        <div className='flex flex-row'>
                            <div className='my-auto rounded-full mt-16 mr-8 p-1' >Add to cart</div>
                            <div onClick={() => {
                                dispatch(addItemToCart({
                                    name:item.name,
                                    imageUrl:item.imageUrl,
                                    description:item.description,
                                    price:item.price,
                                    qty:1
                                }))}} className='flex flex-row my-auto -space-x-1 rounded-full mt-10 p-1  hover:bg-blue-600 hover:scale-125 hover:cursor-pointer'>
                                <PlusSmIcon className='h-16 w-16 '/>
                                <ShoppingCartIcon className='h-16 w-16 '/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )

    }

    return(
        <div className='flex flex-col bg-gray-200 mx-60  pt-6'>
            <div className='text-6xl text-center p-1 mb-2'>
                {item.name}
            </div>
            {item ? <DetailedProductComponent/> : <div>ERROR</div>}
        </div>
    );

};


export default DetailedProductScreen;