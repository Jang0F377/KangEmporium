import {Button, Input} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from "../firebase";
import LoadingScreen from "./LoadingScreen";
import LoginSuccessComponent from "../components/LoginSuccessComponent";


const LoginScreen = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false);
    const navigate = useNavigate();
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }


    const handleKeypress = (e) => {
        if (e.keyCode === 13) {
            loginFlow().then();
        }
    };

    const loginFlow = async () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            await signInWithEmailAndPassword(auth,email,password)
                .then((userCred) => {
                    const user = userCred.user;
                    console.log(user);
                    wait(600).then(() => {
                        setSuccess(true);
                        setLoading(false);
                    }).then(() => wait(3000).then(() => {
                        setLoading(false);
                        setSuccess(false);
                    })).then(() => navigate('/',{replace:true}));
                })
                .catch(err => alert(err))
        }
    };

    return(
        <div className='flex flex-col lg:pb-56  bg-gray-200 mx-96 rounded items-center  pt-4'>
            {loading && !success ?
                <LoadingScreen/> :
                !loading && success ?
                    <LoginSuccessComponent/> :
                    <div className='flex flex-col rounded items-center  pt-4'>
                        <div className='text-7xl pt-2 text-center'>Welcome Back,</div>
                        <div className='text-5xl pt-2 text-center'>please sign-in</div>
                        <div className='p-1.5 m-5 bg-black w-96'/>
                        <div className='flex flex-col'>
                            <Input className='flex-1 mt-10 bg-white lg:w-72 rounded p-2' type='email' value={email} onChange={(event) => setEmail(event.target.value)} multiline={false} placeholder='Enter login email..'/>
                            <Input onKeyDown={handleKeypress} className='flex-1 mt-10 bg-white lg:w-72 rounded p-2' type='password' value={password} onChange={(event) => setPassword(event.target.value)}  multiline={false} placeholder='Enter password..'/>
                            <div onClick={() => alert("Functionality not yet set up")} className='text-sm text-end mt-1.5 hover:cursor-pointer hover:text-blue-600'>
                                I forgot my password
                            </div>
                            <Button disabled={!email || !password} onClick={loginFlow} sx={{marginTop:6}} variant={"contained"}>LOGIN</Button>
                            <div onClick={() => navigate('/register')} className='text-sm text-center mt-4 hover:cursor-pointer hover:text-blue-600'>Create an account</div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default LoginScreen;