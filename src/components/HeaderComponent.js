import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Divider, Drawer} from "@mui/material";
import {auth} from "../firebase";
import {signOut} from 'firebase/auth'
import { useSelector} from "react-redux";
import {selectCartItems, selectCartQuantity} from "../redux/cartSlice";
import CartListComponent from "./CartListComponent";


const HeaderComponent = () => {
    const [drawer,toggleDrawer] = useState(false);
    const [authorizedUser,setAuthorizedUser] = useState(false);
    const cartQuantity = useSelector(selectCartQuantity);
    const cartItems = useSelector(selectCartItems);
    let navigate = useNavigate();

    const logoutFlow = async () => {
        await signOut(auth)
            .then(() => {
                alert("Sign out Success!");
                navigate('/',{replace:true})
            })
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
    }


    useEffect(() => {
        return auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setAuthorizedUser(true);
            }
            if (!authUser) {
                setAuthorizedUser(false);
            }
        })
    },[]);


    return(
        <div>
            <header className="flex flex-col bg-cyan-200 mx-72 ">
                <div className='flex flex-row justify-end pr-1'>
                    <div hidden={authorizedUser} className='p-1 hover:text-blue-600 hover:cursor-pointer' onClick={() => navigate('/login')}>
                        Login
                    </div>
                    <div hidden={authorizedUser} className='p-1 px-1.5'>/</div>
                    <div hidden={!authorizedUser} className='p-1 pr-2 hover:text-blue-600 hover:cursor-pointer' onClick={logoutFlow}>Logout -></div>
                    <div hidden={authorizedUser} className='p-1 hover:text-blue-600 hover:cursor-pointer' onClick={() => navigate('/register')}>
                        Register
                    </div>
                </div>
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
                <div className='w-72 lg:w-96 text-2xl'>
                    <div className='flex flex-row justify-around'>
                        <div className='text-4xl underline decoration-2 pt-1 underline-offset-8'>
                            My Cart
                        </div>
                        <div className='text-4xl   pt-1 '>
                            ({cartQuantity})
                        </div>
                    </div>

                    <Divider className='pt-4'/>
                    <div className=' border'>
                        {cartQuantity ? cartItems.map((item) => (
                            <CartListComponent key={item.name} item={item}/>
                        )) : <EmptyCart/>}
                    </div>
                </div>
            </Drawer>
        </div>

    );
};

export default HeaderComponent;