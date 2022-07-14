import {removeItemFromCart, selectCartItems} from "../redux/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {TrashIcon} from "@heroicons/react/solid";
import {useNavigate} from "react-router-dom";

const CartScreenListComponent = ({item}) => {
    const dispatch = useDispatch()

    return(
        <div className='flex flex-row bg-white  p-1 mx-4 justify-around  border-black border-b-2'>
            <div className='flex flex-col'>
                <div className='text-center text-2xl underline'>
                    {item.name}
                </div>
                <div>
                    <img className='h-52 w-96 p-1 m-1' src={item.imageUrl} alt="ERROR"/>
                </div>
            </div>
            <div className='flex flex-row '>
                <div className='flex flex-col my-auto mr-20'>
                    <div className='text-4xl underline'>Qty:</div>
                    <div className='text-3xl text-center'>{item.qty}</div>
                </div>
                <div className='flex flex-col my-auto p-1 mr-20'>
                    <div className='text-4xl underline'>Price</div>
                    <div className='text-3xl text-center'>${item.price}</div>
                </div>
                <div className='flex flex-col my-auto p-1 ml-20 mr-8'>
                    <div className='text-4xl underline'>Total:</div>
                    <div className='text-3xl text-center'>${item.price * item.qty}</div>
                </div>
            </div>
            <div className='my-auto'>
                <TrashIcon
                    onClick={() => {
                        dispatch(removeItemFromCart({
                            name:item.name
                        }))}}
                    className='h-14 w-14 p-1 mr-16 hover:cursor-pointer hover:fill-red-500'/>
            </div>
        </div>
    );
}




const ViewCartScreen = () => {
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems)

    const anythingInCart = cartItems.length

    const getCartSubtotal = () => {
        return cartItems.reduce((price,item) => (item.price * item.qty) + price,0)
    }

    const EmptyCart = () => {
        return(
            <div className='flex flex-col my-auto p-3 text-center'>
                <div className='text-3xl'>
                    Your cart is currently empty.
                </div>
                <div className='text-3xl'>
                    Start adding things to see them here!
                </div>
            </div>
        );
    };

    return(
        <div className='flex flex-col bg-gray-200 mx-60  pt-6'>
            <div className='text-center text-7xl  mb-16 underline tracking-wider font-bold'>
                My Cart
            </div>
            {anythingInCart ? cartItems.map((item) => (
                <CartScreenListComponent item={item}/>
            )) : <EmptyCart/>}
            <div>
                <div className='text-end text-4xl p-1 mr-4 mt-10'>
                    Total:
                </div>
                <div className='text-end text-4xl p-2 mr-4'>
                    $ {getCartSubtotal()}
                </div>
                <div className='text-end m-3 mr-4 p-1'>
                    <button
                        disabled={!anythingInCart}
                        className='p-3 rounded bg-blue-400 mt-10 justify-self-center enabled:hover:bg-blue-600 disabled:opacity-20 mb-8'
                        onClick={() => navigate('/checkout')}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    )
};


export default ViewCartScreen;