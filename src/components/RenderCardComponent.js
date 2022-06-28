import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import {PlusSmIcon, ShoppingCartIcon} from "@heroicons/react/outline";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addItemToCart} from "../redux/cartSlice";

const RenderCardComponent = ({item}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
        <Card key={item.name} className=' m-2.5 '>
            <CardMedia
                onClick={() => navigate(`/product/${item.name}`,{replace:false,state:item})}
                className='h-52  w-full hover:cursor-pointer hover:scale-105'
                image={item.imageUrl}
                alt="Image Here"
            />
            <CardContent className='h-full'>
                <div className='text-xl mb-0.5 underline underline-offset-2 hover:text-blue-600 hover:cursor-pointer'>{item.name}</div>
                <div className='mt-1'>{item.description.length > 200 ? `${item.description.substring(0,200)}...` : item.description}</div>
                <CardActions className=' mt-2.5 -mb-2'>
                    <div className='flex  flex-row justify-between w-full'>
                        <div className=' text-lg mb-0'>
                            {item.onSale ?
                                <div className='flex flex-row '>
                                    <div className='mr-1.5 text-lg mb-0 line-through'>$ {item.price}</div>
                                    <div className=' text-lg mb-0'>{item.price - (item.price * .2)}</div>
                                </div>

                                : `$ ${item.price}`}

                        </div>
                        <div onClick={() => {
                                dispatch(addItemToCart({
                                    name:item.name,
                                    imageUrl:item.imageUrl,
                                    description:item.description,
                                    price:item.price,
                                    qty:1
                                }))}} className='flex flex-row my-auto -space-x-1 rounded-full p-1 hover:bg-blue-600 hover:scale-125 hover:cursor-pointer'>
                            <PlusSmIcon className='h-5 w-5 '/>
                            <ShoppingCartIcon className='h-5 w-5 '/>
                        </div>
                    </div>
                </CardActions>
            </CardContent>
        </Card>
    );
};

export default RenderCardComponent;