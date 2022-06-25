import {createUserWithEmailAndPassword} from 'firebase/auth';
import {useState} from "react";
import {Button, Input} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {auth, db} from "../firebase";
import {setDoc,doc,serverTimestamp} from 'firebase/firestore'

const RegisterScreen = () => {
    const [firstName,setFirstName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const handleKeypress = (e) => {
        if (e.keyCode === 13) {
            registrationFlow().then();
        }
    };

    const sendUserToFirestore = async (user,email) => {
        await setDoc(doc(db,'users', `${email}`), {
            firstName:firstName,
            timestamp: serverTimestamp(),
        })
    }


    const registrationFlow = async () => {
        await createUserWithEmailAndPassword(auth,email,password)
            .then((userCred) => {
                const user = userCred.user;
                sendUserToFirestore(user,user.email).then(() => {
                    wait(1000).then(() => {
                        navigate('/',{replace:true});
                    })
                }).catch(err => alert(err))
            })
            .catch(err => alert(err))
    };


    return(
        <div className='flex lg:pb-20 flex-col bg-gray-200 mx-96 rounded items-center  pt-4'>
            <div className='text-7xl pt-2 text-center'>Welcome!</div>
            <div className='text-5xl pt-2 text-center'>Just a few deets</div>
            <div className='text-5xl pt-2 text-center'>is all we need:</div>
            <div className='p-1.5 m-5 bg-black w-96'/>
            <div className='flex flex-col'>
                <Input className='flex-1 mt-10 bg-white lg:w-72 rounded p-2' type='text' value={firstName}
                       onChange={(event) => setFirstName(event.target.value)}
                       placeholder={'First Name'}/>
                <Input className='flex-1 mt-10 bg-white lg:w-72 rounded p-2' type='email' value={email}
                       onChange={(event) => setEmail(event.target.value)}
                       placeholder={'Email'}/>
                <Input className='flex-1 mt-10 bg-white lg:w-72 rounded p-2' type='password' value={password}
                       onChange={(event) => setPassword(event.target.value)}
                       placeholder={'Password'}/>
                <Input className='flex-1 mt-10 bg-white lg:w-72 rounded p-2' type='password' value={confirmPassword}
                       onChange={(event) => {
                           setConfirmPassword(event.target.value)
                       }}
                       placeholder={'Confirm Password'}
                       onKeyDown={handleKeypress}
                />
                <Button disabled={!email || !firstName || !password || password !== confirmPassword} onClick={registrationFlow} sx={{marginTop:6}} variant={"contained"}>Register</Button>
                <div onClick={() => navigate('/login')} className='text-sm text-center mt-4 hover:cursor-pointer hover:text-blue-600'>Already have an account?</div>

            </div>
        </div>
    );
};

export default RegisterScreen;