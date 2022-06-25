import {Card, CardContent, CardMedia} from "@mui/material";
import {Products} from "../data/Products";


const ProductsComponent = () => {

    function RenderCard({item}) {
        return(
            <Card className=' m-2 '>
                <CardMedia
                    className='h-56 w-full'
                    image={item.imageUrl}
                    alt="Image Here"
                />
                <CardContent>
                    <div className='text-xl underline underline-offset-2'>{item.name}</div>
                    <div className='mt-2'>{item.description.substring(0,300)}...</div>
                    <div className='mt-1.5 mb-0'>$ {item.price}</div>
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