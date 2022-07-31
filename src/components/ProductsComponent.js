import { Products } from "../data/Products";
import RenderCardComponent from "./RenderCardComponent";

const ProductsComponent = () => {
  return (
    <div className="mx-auto py-16 px-4 sm:py-24 lg:w-9/12 sm:px-6 lg: lg:px-8 bg-gray-400 rounded">
      <h2 className="sr-only">Products</h2>

      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-3">
        {Products.map((item) => (
          <RenderCardComponent key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductsComponent;
