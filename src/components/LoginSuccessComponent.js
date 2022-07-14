import {Player} from '@lottiefiles/react-lottie-player';


const LoginSuccessComponent = () => {
    
    return(
        <div className='h-full'>
            <div className='mx-auto my-auto'>
                <Player
                    autoplay
                    loop={false}
                    speed={1}
                    src='https://assets2.lottiefiles.com/packages/lf20_hbdelex6.json'
                    style={{width:'500px',height:'500px'}}
                />
            </div>
        </div>
    );

}

export default LoginSuccessComponent