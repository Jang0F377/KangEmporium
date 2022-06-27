import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import {Products} from "../data/Products";
import {PlusSmIcon, ShoppingCartIcon} from "@heroicons/react/outline";


const ProductsComponent = () => {

    function RenderCard({item}) {
        return(
            <Card className=' m-2.5 '>
                <CardMedia
                    className='h-52  w-full'
                    image={item.imageUrl}
                    alt="Image Here"
                />
                <CardContent className='h-full'>
                    <div className='text-xl mb-0.5 underline underline-offset-2 hover:text-blue-600 hover:cursor-pointer'>{item.name}</div>
                    <div className='mt-1'>{item.description.length > 200 ? `${item.description.substring(0,200)}...` : item.description}</div>
                    <CardActions className=' mt-2.5 -mb-2'>
                        <div className='flex  flex-row justify-between w-full'>
                            <div className='my-auto text-lg mb-0'>$ {item.price}</div>
                            <div className='flex flex-row my-auto -space-x-1 rounded-full p-1 hover:bg-blue-600 hover:scale-125 hover:cursor-pointer'>
                                <PlusSmIcon className='h-5 w-5 '/>
                                <ShoppingCartIcon className='h-5 w-5 '/>
                            </div>
                        </div>
                    </CardActions>
                </CardContent>
            </Card>
        );
    }

    return(
        <div className=' bg-gray-200 mx-60  pt-6'>
            <div className='grid grid-cols-3 gap-x-28 gap-y-10'>
                {Products.map((item) => (
                    <RenderCard item={item} />
                    ))}
            </div>
        </div>
    );
};

export default ProductsComponent;