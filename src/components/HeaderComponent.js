import {Link} from "react-router-dom";
import {useState} from "react";
import {Drawer} from "@mui/material";


const HeaderComponent = () => {
    const [drawer,toggleDrawer] = useState(false);





    return(
        <div>
            <header className="flex flex-col bg-cyan-200 mx-48">
                <div className='text-center text-3xl lg:text-black text-indigo-800 lg:text-5xl md:tracking-wider pb-5 underline decoration-8 underline-offset-8'>Koach Kang's Emporium</div>
                <div className='flex flex-row'>
                    <div className='flex flex-row flex-1 p-2 justify-around text-2xl lg:text-3xl'>
                        <Link to='/' className='p-2 mx-2 hover:cursor-pointer hover:text-blue-600 hover:scale-125 hover:rotate-6'>Home</Link>
                        <Link to='product' className='p-2 mx-2 hover:text-blue-600 hover:cursor-pointer hover:scale-125 hover:-rotate-6'>Products</Link>
                        <p onClick={() => toggleDrawer(true)} className='p-2 mx-2 hover:text-blue-600 hover:cursor-pointer hover:scale-125 hover:rotate-6'>Cart</p>
                    </div>
                </div>
            </header>
            <Drawer anchor={"left"} open={drawer}  onClose={() => toggleDrawer(false)}>
                <div className='w-96 text-2xl'>
                    Cart Items
                </div>
            </Drawer>
        </div>

    );
};

export default HeaderComponent;