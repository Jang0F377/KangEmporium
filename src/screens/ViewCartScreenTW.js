import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromCart,
  selectCartItems,
  strictDecreaseQty,
  strictIncreaseQty,
} from "../redux/cartSlice";
import { useEffect, useState } from "react";

const ViewCartScreenTW = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  const anythingInCart = cartItems.length;

  const getCartSubtotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };
  const EmptyCart = () => {
    return (
      <div className="flex flex-col font-inter my-auto p-3 text-center">
        <div className="text-3xl ">Your cart is currently empty.</div>
        <div className="text-3xl ">Start adding things to see them here!</div>
      </div>
    );
  };

  return (
    <div className="font-inter mx-auto pt-16 pb-24 px-4 sm:px-6 w-9/12 lg:px-8 bg-white rounded">
      <h1 className="text-3xl font-inter font-extrabold tracking-tight text-gray-900 md:text-5xl">
        Shopping Cart
      </h1>
      <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
        <section aria-labelledby="cart-heading" className="lg:col-span-7">
          <h2 id="cart-heading" className="sr-only">
            Items in your shopping cart
          </h2>
          <ul className="border-t border-b border-gray-200 divide-y divide-gray-200 ">
            {anythingInCart ? (
              cartItems.map((item) => <CartScreenListComp product={item} />)
            ) : (
              <EmptyCart />
            )}
          </ul>
        </section>
        <section
          aria-labelledby="summary-heading"
          className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
        >
          <CartScreenOrderSummary getCartSubtotal={getCartSubtotal()} />
        </section>
      </form>
    </div>
  );
};

const CartScreenOrderSummary = (props) => {
  const [tax, setTax] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setTax(Number((props.getCartSubtotal * 0.085).toFixed(2)));
    setSubtotal(Number((props.getCartSubtotal + tax).toFixed(2)));
  }, [props.getCartSubtotal, tax]);

  return (
    <div className="">
      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Subtotal</dt>
          <dd className="text-sm font-medium text-gray-900">
            $ {props.getCartSubtotal}
          </dd>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <dt className="flex items-center text-sm text-gray-600">
            <span>Shipping estimate</span>
            <div className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
              <span className="sr-only">
                Learn more about how shipping is calculated
              </span>
              <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </dt>
          <dd className="text-sm font-medium text-gray-900"></dd>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <dt className="flex text-sm text-gray-600">
            <span>Tax estimate</span>
            <div className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
              <span className="sr-only">
                Learn more about how tax is calculated
              </span>
              <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </dt>
          <dd className="text-sm font-medium text-gray-900">$ {tax}</dd>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <dt className="text-base font-medium text-gray-900">Order total</dt>
          <dd className="text-base font-medium text-gray-900">$ {subtotal}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

const CartScreenListComp = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <li key={product.name} className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <img
          src={product.imageUrl}
          alt={"ERR"}
          className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm md:text-base">
                <div
                  className="font-medium text-gray-700 hover:text-gray-800 hover:cursor-pointer"
                  onClick={() =>
                    navigate(`/product/${product.name}`, {
                      replace: false,
                      state: product,
                    })
                  }
                >
                  {product.name}
                </div>
              </h3>
            </div>
            <div className="mt-1 flex text-sm md:text-base">
              {product.color ? (
                <p className="text-gray-500">{product.color}</p>
              ) : null}
              {product.size ? (
                <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">
                  {product.size}
                </p>
              ) : null}
            </div>
            <p className="mt-1 text-sm md:text-base font-medium text-gray-900">
              $ {product.price}
            </p>
          </div>

          <div className="mt-4 sm:mt-0 sm:pr-9">
            <label htmlFor={`quantity-${product.name}`} className="sr-only">
              Quantity, {product.name}
            </label>
            <div className="w-fit p-1.5 md:text-base font-medium text-gray-700 text-left text-sm">
              {product.qty}
            </div>
            <div className="absolute right-0 top-0">
              <button
                type="button"
                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                onClick={() => {
                  dispatch(
                    removeItemFromCart({
                      name: product.name,
                      qty: product.qty,
                    })
                  );
                }}
              >
                <span className="sr-only">Remove</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row relative">
          <p className="mt-4 flex text-sm text-gray-700 space-x-2">
            {product.countInStock ? (
              <CheckIcon
                className="flex-shrink-0 h-5 w-5 text-green-500"
                aria-hidden="true"
              />
            ) : (
              <ClockIcon
                className="flex-shrink-0 h-5 w-5 text-gray-300"
                aria-hidden="true"
              />
            )}

            <span>
              {product.countInStock ? "In stock" : `Ships in 3-4 weeks`}
            </span>
          </p>
          <div className="flex flex-col absolute bottom-0 right-1 gap-y-3">
            <button
              type="button"
              className="text-sm font-medium text-indigo-500 hover:text-indigo-800"
              onClick={() => {
                dispatch(
                  strictIncreaseQty({
                    name: product.name,
                    qty: product.qty,
                  })
                );
              }}
            >
              <span>Add</span>
            </button>
            <button
              type="button"
              className="text-sm font-medium px-1 text-indigo-500 hover:text-indigo-800 "
              onClick={() => {
                dispatch(
                  strictDecreaseQty({ name: product.name, qty: product.qty })
                );
              }}
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ViewCartScreenTW;