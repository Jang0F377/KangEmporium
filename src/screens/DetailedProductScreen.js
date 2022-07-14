import React from 'react'
import {useParams} from "react-router-dom";
import {Products} from "../data/Products";
import {PlusSmIcon, ShoppingCartIcon} from "@heroicons/react/outline";
import {useDispatch} from "react-redux";
import {addItemToCart} from "../redux/cartSlice";
import {useState} from "react";
import {Player} from "@lottiefiles/react-lottie-player";


const DetailedProductScreen = () => {
    const [loading,setLoading] = useState(false);
    const player = React.createRef();
    const dispatch = useDispatch();
    const name = useParams()
    const item = Products.find(item => item.name === name.name);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }


    const handleClick = () => {
        if (!loading) {
            setLoading(true)
            dispatch(addItemToCart({
                name:item.name,
                imageUrl:item.imageUrl,
                description:item.description,
                price:item.price,
                qty:1
            }))
            player.current.play()
            wait(300).then(() => setLoading(false))
        }
    };

    return(
        <div className='flex flex-col bg-gray-200 mx-60  pt-6'>
            <div className='text-6xl text-center p-1 mb-2'>
                {item.name}
            </div>
            {item ?
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
                        <div className='text-5xl text-right mr-4 mt-10'>
                            $ {item.price}
                        </div>
                        <div className='flex flex-row justify-between'>
                            <div className='mt-10 text-lg'>
                                Left in stock: {item.countInStock}
                            </div>
                            <div className='flex flex-row'>
                                <div className='my-auto rounded-full mt-16 mr-8 p-1' >Add to cart</div>
                                <div onClick={handleClick} className='flex flex-row my-auto -space-x-1 rounded-full mt-10 p-1.5  hover:bg-blue-600 hover:scale-125 hover:cursor-pointer'>
                                    <Player ref={player} autoplay={false} loop={false} src={'https://assets9.lottiefiles.com/packages/lf20_4dz2pspl.json'} style={{height:'75px',width:'80px'}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <div>ERROR</div>}
        </div>
    );

};


export default DetailedProductScreen;