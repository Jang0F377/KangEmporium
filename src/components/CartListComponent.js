import {TrashIcon} from "@heroicons/react/outline";
import {useDispatch} from "react-redux";
import {removeItemFromCart} from "../redux/cartSlice";


const CartListComponent = ({item}) => {
    const dispatch = useDispatch();



    return(
        <div className='flex border-b'>
            <div className=' p-2 m-2'>
                <div className='flex flex-row mb-1 underline'>
                    {item.name}
                </div>
                <img className='flex' src={item.imageUrl} alt="ERROR"/>
            </div>
            <div className='flex flex-col my-auto'>
                <div className='flex ml-2 mr-1 text-center mx-auto'>
                    ${item.price}
                </div>
                <TrashIcon onClick={() => {
                    dispatch(removeItemFromCart({
                        name:item.name
                    }))

                }} className='h-10 w-10 mx-auto hover:cursor-pointer hover:fill-red-500'/>
            </div>

        </div>
    );
};

export default CartListComponent;