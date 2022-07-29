import React from "react";
import { useParams } from "react-router-dom";
import { Products } from "../data/Products";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import { Transition } from "@headlessui/react";

import { useState, Fragment } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon, StarIcon, XIcon } from "@heroicons/react/solid";
import { CheckCircleIcon } from "@heroicons/react/outline";

const DetailedProductScreen = () => {
  const reviews = { average: 4, totalCount: 1624 };
  const dispatch = useDispatch();
  const name = useParams();
  const product = Products.find((item) => item.name === name.name);
  const [selectedSize, setSelectedSize] = useState(product.size[0]);
  const [show, setShow] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const handleClick = () => {
    dispatch(
      addItemToCart({
        name: product.name,
        imageUrl: product.imageUrl,
        description: product.description,
        price: product.price,
        qty: 1,
        countInStock: product.countInStock,
        size: selectedSize,
        color: product.color,
      })
    );
    setShow(true);
    wait(1250).then(() => setShow(false));
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="flex flex-col bg-gray-200 font-inter mx-60  pt-6">
      {product ? (
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="mt-4">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                {product.name}
              </h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <h2 id="information-heading" className="sr-only">
                Product information
              </h2>

              <div className="flex items-center">
                <p className="text-lg text-gray-900 sm:text-xl">
                  $ {product.price}
                </p>

                <div className="ml-4 pl-4 border-l border-gray-300">
                  <h2 className="sr-only">Reviews</h2>
                  <div className="flex items-center">
                    <div>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              reviews.average > rating
                                ? "text-yellow-400"
                                : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">
                        {reviews.average} out of 5 stars
                      </p>
                    </div>
                    <p className="ml-2 text-sm text-gray-500">
                      {reviews.totalCount} reviews
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-500">{product.description}</p>
              </div>

              <div className="mt-6 flex items-center">
                <CheckIcon
                  className="flex-shrink-0 w-5 h-5 text-green-500"
                  aria-hidden="true"
                />
                <p className="ml-2 text-sm text-gray-500">
                  In stock and ready to ship
                </p>
              </div>
            </section>
          </div>

          {/* Product image */}
          <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img
                src={product.imageUrl}
                alt={"ERR"}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          {/* Product form */}
          <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
            <section aria-labelledby="options-heading">
              <h2 id="options-heading" className="sr-only">
                Product options
              </h2>

              <form>
                <div className="sm:flex sm:justify-between">
                  {/* Size selector */}
                  {product.size ? (
                    <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                      <RadioGroup.Label className="block text-sm font-medium text-gray-700">
                        Size
                      </RadioGroup.Label>
                      <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {product.size.map((s) => (
                          <RadioGroup.Option
                            as="div"
                            key={s.name}
                            value={s}
                            className={({ active }) =>
                              classNames(
                                active ? "ring-2 ring-indigo-500" : "",
                                "relative block border border-gray-300 rounded-lg p-4 cursor-pointer focus:outline-none"
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label
                                  as="p"
                                  className="text-base font-medium text-gray-900"
                                >
                                  {s.name}
                                </RadioGroup.Label>
                                {s.description ? (
                                  <RadioGroup.Description
                                    as="p"
                                    className="mt-1 text-sm text-gray-500"
                                  >
                                    {s.description}
                                  </RadioGroup.Description>
                                ) : null}

                                <div
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "absolute -inset-px rounded-lg pointer-events-none"
                                  )}
                                  aria-hidden="true"
                                />
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  ) : null}
                </div>
                <div className="mt-10">
                  <button
                    type={"button"}
                    onClick={handleClick}
                    className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                  >
                    Add to bag
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      ) : (
        <div>ERROR</div>
      )}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="h-6 w-6 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      Added to Cart
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      type="button"
                      className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
};

export default DetailedProductScreen;
