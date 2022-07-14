import {Player} from '@lottiefiles/react-lottie-player';

const LoadingScreen = () => {

    return(
        <div className='h-full'>
            <div className='my-auto mx-auto'>
                <Player autoplay loop src='https://assets6.lottiefiles.com/private_files/lf30_kjdggdn1.json' style={{height:'500px', width:'500px'}}/>
            </div>

        </div>
    );
};

export default LoadingScreen;