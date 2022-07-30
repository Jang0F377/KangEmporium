import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart, selectCartItems } from "../redux/cartSlice";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

const HeaderComponent = () => {
  const [drawer, setDrawer] = useState(false);
  const [authorizedUser, setAuthorizedUser] = useState(false);
  const cartItems = useSelector(selectCartItems);
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutFlow = async () => {
    await signOut(auth).then(() => {
      alert("Sign out Success!");
      navigate("/", { replace: true });
    });
  };

  const EmptyCart = () => {
    return (
      <div className="flex flex-col my-auto p-3 text-center ">
        <div className="text-2xl p-1 m-1  font-poppins">
          Your cart is currently empty.
        </div>
        <div className="text-2xl p-1 m-1 font-poppins">
          Start adding things to see them here!
        </div>
      </div>
    );
  };

  const handleCheckoutClick = () => {
    if (drawer) {
      setDrawer(false);
      navigate("/cart");
    } else navigate("/cart");
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((price, item) => item.price * item.qty + price, 0);
  };
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  useEffect(() => {
    return auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setAuthorizedUser(true);
      }
      if (!authUser) {
        setAuthorizedUser(false);
      }
    });
  }, [authorizedUser]);

  return (
    <div>
      <header className="flex flex-col bg-color-primary mx-72  rounded-b">
        <div className="flex flex-row justify-end pr-1 font-inter">
          <div
            hidden={authorizedUser}
            className="p-1 hover:text-blue-600 hover:cursor-pointer "
            onClick={() => navigate("/login")}
          >
            Login
          </div>
          <div hidden={authorizedUser} className="p-1 px-1.5">
            /
          </div>
          <div
            hidden={!authorizedUser}
            className="p-1 pr-2 hover:text-blue-600 hover:cursor-pointer "
            onClick={logoutFlow}
          >
            Logout ->
          </div>
          <div
            hidden={authorizedUser}
            className="p-1 hover:text-blue-600 hover:cursor-pointer "
            onClick={() => navigate("/register")}
          >
            Register
          </div>
        </div>
        <div className="text-center font-playfair text-3xl lg:text-black text-indigo-800 lg:text-5xl md:tracking-wider pb-5 underline decoration-8 underline-offset-8">
          Koach Kang's Emporium
        </div>
        <div className="flex flex-row font-playfair">
          <div className="flex flex-row flex-1 p-2 justify-around text-2xl lg:text-3xl">
            <Link
              to="/"
              className="p-2 mx-2 hover:cursor-pointer hover:text-blue-600 hover:scale-125 hover:rotate-6"
            >
              Home
            </Link>
            <Link
              to="product"
              className="p-2 mx-2 hover:text-blue-600 hover:cursor-pointer hover:scale-125 hover:-rotate-6"
            >
              Products
            </Link>
            <p
              onClick={() => setDrawer(true)}
              className="p-2 mx-2 hover:text-blue-600 hover:cursor-pointer hover:scale-125 hover:rotate-6"
            >
              Cart
            </p>
          </div>
        </div>
      </header>
      <Transition.Root show={drawer} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 font-inter"
          onClose={() => setDrawer(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-2xl font-medium text-gray-900">
                            {" "}
                            Shopping cart{" "}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setDrawer(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul className="-my-6 divide-y divide-gray-200">
                              {getCartCount() ? (
                                cartItems.map((product) => (
                                  <li key={product.name} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={product.imageUrl}
                                        alt={"ERR"}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3> {product.name}</h3>
                                          <p className="ml-4">
                                            ${product.price}
                                          </p>
                                        </div>
                                        {product.color ? (
                                          <p className="mt-1 text-sm text-gray-500">
                                            {product.color}
                                          </p>
                                        ) : null}
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">
                                          Qty {product.qty}
                                        </p>

                                        <div className="flex">
                                          <button
                                            onClick={() => {
                                              dispatch(
                                                removeItemFromCart({
                                                  name: product.name,
                                                  qty: product.qty,
                                                })
                                              );
                                            }}
                                            type="button"
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))
                              ) : (
                                <EmptyCart />
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>$ {getCartSubtotal().toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <button
                            onClick={handleCheckoutClick}
                            className="w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setDrawer(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default HeaderComponent;
