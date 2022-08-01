import { Products } from "../data/Products";
import RenderCardComponent from "./RenderCardComponent";
import { Link } from "react-router-dom";
import NewsletterComponent from "./NewsletterComponent";
import FooterComponent from "./FooterComponent";

const HomeComponent = () => {
  return (
    <div className="mx-auto py-10 px-4 sm:py-16 w-11/12 lg:w-9/12 sm:px-6  lg:px-8 bg-gray-400 rounded mt-10 lg:mt-20 lg:py-16">
      <div className="text-center pb-4 mb-4 text-4xl lg:text-7xl underline font-inter">
        Welcome
      </div>
      <div className="">
        <div className="text-center font-inter text-3xl my-2 lg:text-4xl lg:mb-4 lg:mt-4">
          Check out our{" "}
          <Link className="text-blue-600 underline" to="product">
            Products
          </Link>{" "}
          page to see our complete stock!
        </div>
        <div className="text-center font-inter text-2xl lg:text-4xl mt-6 mb-6 lg:mt-16">
          Have a look at what's on sale today:
        </div>
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8 px-2">
          {Products.filter((product) => product.onSale).map((item) => (
            <RenderCardComponent key={item.name} item={item} />
          ))}
        </div>
      </div>
      <NewsletterComponent />
      <FooterComponent />
    </div>
  );
};

export default HomeComponent;
