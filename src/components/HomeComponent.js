import { Products } from "../data/Products";
import RenderCardComponent from "./RenderCardComponent";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div className="mx-auto py-10 px-4 sm:py-16 lg:w-9/12 sm:px-6 lg: lg:px-8 bg-gray-400 rounded">
      <div className="text-center pb-4 mb-4 text-7xl underline font-playfair">
        Welcome
      </div>
      <div className="">
        <div className="text-center font-poppins text-4xl mb-4 mt-4">
          Check out our{" "}
          <Link className="text-blue-600 underline" to="product">
            Products
          </Link>{" "}
          page to see our complete stock!
        </div>
        <div className="text-center font-poppins text-4xl mb-6 mt-16">
          Have a look at what's on sale today:
        </div>
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8 px-2">
          {Products.filter((product) => product.onSale).map((item) => (
            <RenderCardComponent key={item.name} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
