import { Player } from "@lottiefiles/react-lottie-player";

const EventFailedComponent = (props) => {
  return (
    <div className="h-full">
      <div className="mx-auto my-auto">
        <Player
          autoplay
          loop={false}
          speed={0.8}
          src="https://assets10.lottiefiles.com/packages/lf20_fil5eda6.json"
          style={{ width: "500px", height: "500px" }}
        />
      </div>
      <div className="text-center text-3xl">{props.message}</div>
    </div>
  );
};

export default EventFailedComponent;
