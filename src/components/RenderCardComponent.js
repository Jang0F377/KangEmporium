import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const RenderCardComponent = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const player = React.createRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const handleClick = () => {
    if (!loading) {
      setLoading(true);
      dispatch(
        addItemToCart({
          name: item.name,
          imageUrl: item.imageUrl,
          description: item.description,
          price: item.price,
          qty: 1,
          countInStock: item.countInStock,
        })
      );
      player.current.play();
      wait(300).then(() => setLoading(false));
    }
  };

  return (
    <div
      onClick={() =>
        navigate(`/product/${item.name}`, { replace: false, state: item })
      }
      key={item.name}
      className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden font-inter"
    >
      <div className="aspect-w-3 aspect-h-4 bg-gray-200 object-center object-cover group-hover:opacity-75 sm:aspect-none sm:h-96">
        <img
          src={item.imageUrl}
          alt={"ALT"}
          className="w-full h-full object-center object-cover  sm:w-full sm:h-full"
        />
      </div>
      <div className="flex-1 p-4 space-y-2 flex flex-col">
        <h3 className="text-sm font-medium text-gray-900">
          <div>
            <span aria-hidden="true" className="absolute inset-0" />
            {item.name}
          </div>
        </h3>
        <p className="text-sm text-gray-500">
          {item.description.length > 200
            ? `${item.description.substring(0, 200)}...`
            : item.description}
        </p>
        <div className="flex-1 flex flex-col justify-end">
          <p className="text-sm italic text-gray-500">{item.options}</p>
          <p className="text-base font-medium text-gray-900">$ {item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default RenderCardComponent;
