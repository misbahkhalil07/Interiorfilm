//@ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoIosClose, IoMdCloseCircleOutline } from "react-icons/io";
import { RxMinus, RxPlus } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { message, Modal } from "antd";
import Button from "../Button/Button";
import PRODUCTS_TYPES from "types/interfaces";
import { IoCloseSharp } from "react-icons/io5";
interface TableProps {
  cartdata: PRODUCTS_TYPES[];
  wishlistdata: PRODUCTS_TYPES[];
  onCartChange: (updatedCart: PRODUCTS_TYPES[]) => void;
}

const Table: React.FC<TableProps> = ({
  cartdata,
  wishlistdata,
  onCartChange,
}) => {
  const pathName = usePathname();
  const [data, setData] = useState<PRODUCTS_TYPES[]>([]);
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const [subtotal, setSubtotal] = useState(0);
  const [changeId, setChangeId] = useState<number | null>(null);

  const ProductHandler = () => {
    const Products = localStorage.getItem(
      pathName === "/wishlist" ? "wishlist" : "cart"
    );
    if (Products && JSON.parse(Products).length > 0) {
      const items = JSON.parse(Products || "[]");
      setData(items);
      setCounts(
        items.reduce((acc: any, item: any, index: number) => {
          acc[index] = item.count || 1;
          return acc;
        }, {})
      );
      const sub = items.reduce(
        (total: number, item: any) => total + item.totalPrice,
        0
      );
      setSubtotal(sub);
    }
  };

  useEffect(() => {
    ProductHandler();
  }, [pathName, changeId]);

  const increment = (index: number) => {
    const newCounts = { ...counts };
    if (newCounts[index] < 100) {
      newCounts[index] = (newCounts[index] || 1) + 1;
      setCounts(newCounts);
      updateTotalPrice(index, newCounts[index]);
      window.dispatchEvent(new Event("cartChanged"));
      window.dispatchEvent(new Event("WishlistChanged"));
    } else {
      message.error("Quantity cannot be more than 100.");
    }
  };

  const decrement = (index: number) => {
    if (counts[index] > 1) {
      const newCounts = { ...counts };
      newCounts[index] -= 1;
      setCounts(newCounts);
      updateTotalPrice(index, newCounts[index]);
      window.dispatchEvent(new Event("cartChanged"));
      window.dispatchEvent(new Event("WishlistChanged"));
    } else {
      message.error("Quantity cannot be less than 1.");
    }
  };

  const updateTotalPrice = (index: number, newCount: number) => {
    const updatedData = [...data];
    updatedData[index].count = newCount;
    updatedData[index].totalPrice =
      (updatedData[index].discountPrice || updatedData[index].price) *
      newCount *
      updatedData[index].length;
    setData(updatedData);
    localStorage.setItem(
      pathName === "/wishlist" ? "wishlist" : "cart",
      JSON.stringify(updatedData)
    );
    const sub = updatedData.reduce(
      (total: number, item: any) => total + item.totalPrice,
      0
    );
    setSubtotal(sub);
    onCartChange(updatedData);
  };

  const removeItemFromCart = (index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
    localStorage.setItem(
      pathName === "/wishlist" ? "wishlist" : "cart",
      JSON.stringify(updatedData)
    );
    window.dispatchEvent(new Event("cartChanged"));
    window.dispatchEvent(new Event("WishlistChanged"));
    setChangeId(index);
    onCartChange(updatedData);
  };

  const showDeleteConfirm = (index: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this item?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        removeItemFromCart(index);
      },
    });
  };

  const addToCart = (product: PRODUCTS_TYPES, index: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product already exists in cart
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      // Update quantity and length
      cart[existingIndex].count += counts[index] || 1;
      cart[existingIndex].length = product.length;
      cart[existingIndex].totalPrice =
        (product.discountPrice || product.price) *
        cart[existingIndex].count *
        product.length;
    } else {
      // Add new item to cart
      const totalPrice =
        (product.discountPrice || product.price) *
        (counts[index] || 1) *
        product.length;
      cart.push({
        ...product,
        count: counts[index] || 1,
        totalPrice: totalPrice,
      });
    }

    // Update local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Remove item from wishlist if added to cart
    removeItemFromCart(index);

    // Trigger cart changed event
    window.dispatchEvent(new Event("cartChanged"));
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1 || value > 100) {
      message.error("Please select a quantity between 1 and 100.");
    } else {
      setCounts({ ...counts, [index]: value });
      updateTotalPrice(index, value);
      window.dispatchEvent(new Event("cartChanged"));
      window.dispatchEvent(new Event("WishlistChanged"));
    }
  };
  const handleLengthChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1 || value > 100) {
      message.error("Please select a length between 1 and 100.");
    } else {
      const updatedData = [...data];
      updatedData[index].length = value; // Update the length in your data
      setData(updatedData); // Update the state with the new data

      // Update the total price and subtotal
      updateTotalPrice(index, counts[index] || 1);

      // Call onCartChange to ensure the parent component updates the subtotal
      onCartChange(updatedData);
    }
  };

  return (
    <>
      <div className="hidden md:flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-[30px] font-optima text-dark"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-[30px] font-medium text-dark"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-[30px] font-medium text-dark"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-[30px] font-medium text-dark"
                    >
                      {pathName === "/wishlist" ? "Action" : "Total"}
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {data.map((product, index) => (
                    <tr key={index} className="border-b border-[#EFEFEF]">
                      <td className="md:px-3 md:py-4 text-sm font-medium">
                        <div className="flex gap-1">
                          <div className="relative">
                            <Image
                              className="w-24 h-24 bg-contain"
                              width={100}
                              height={100}
                              src={
                                product.imageUrl[0].imageUrl || product.imageUrl
                              }
                              alt="Product"
                            />
                            <div className="absolute -top-2 -right-2">
                              <div
                                onClick={() => showDeleteConfirm(index)}
                                className="bg-white shadow h-5  w-5 flex justify-center items-center  rounded-full cursor-pointer hover:text-white hover:bg-[#C62131]"
                              >
                                <IoCloseSharp size={18} />
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            <h1 className="text-sm md:text-base font-bold">
                              {typeof product.name === "string"
                                ? product.name
                                : ""}
                            </h1>
                            <div className="flex gap-2 items-center">
                              <p className="font-bold text-base">
                                Dimension : 1.22
                              </p>{" "}
                              <IoIosClose size={20} />
                              <input
                                min={1}
                                max={100}
                                type="number"
                                value={product.length} // Ensure this is bound to the correct property ('length')
                                onChange={(e) => handleLengthChange(index, e)} // Pass index to handleLengthChange
                                name="length"
                                placeholder="Enter Length"
                                className={`peer px-3 py-2 block border rounded-md border-gray-200 text-sm placeholder:text-slate-400 disabled:opacity-50 disabled:pointer-events-none autofill:pb-2`}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base">
                        <p>
                          AED{" "}
                          <span>
                            {pathName === "/wishlist"
                              ? product.discountPrice
                                ? product.discountPrice * (counts[index] || 1)
                                : product.price * (counts[index] || 1)
                              : product.discountPrice
                              ? product.discountPrice
                              : product.price}
                          </span>
                          .00
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm md:text-base">
                        <div className="flex">
                          <div
                            onClick={() => decrement(index)}
                            className="h-8 w-8  bg-[#E7E7EF] border border-gray flex justify-center items-center"
                          >
                            <RxMinus size={20} />
                          </div>
                          <div className="h-8 w-14  bg-[#F0EFF2] flex justify-center items-center">
                            <input
                              className="h-8 w-14 text-center border border-[#F0EFF2] "
                              type="text"
                              min={1}
                              max={100}
                              disabled
                              value={counts[index] || 1}
                              onChange={(e) => handleChange(index, e)}
                            />
                          </div>
                          <div
                            onClick={() => increment(index)}
                            className="h-8 w-8  bg-[#E7E7EF] border border-gray flex justify-center items-center"
                          >
                            <RxPlus size={20} />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-sm md:text-base">
                        {pathName === "/wishlist" ? (
                          <Button
                            onClick={() => addToCart(product, index)}
                            className="px-4 rounded-md"
                            title={"Add To Cart"}
                          />
                        ) : (
                          <p>
                            AED{" "}
                            <span>
                              {product.discountPrice
                                ? product.discountPrice *
                                  (counts[index] || 1) *
                                  product.length
                                : product.price *
                                  (counts[index] || 1) *
                                  product.length}
                            </span>
                            .00
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {data.map((product, index) => (
        <div
          className="p-2 rounded-md mt-5 bg-white shadow block md:hidden"
          key={index}
        >
          <div className="space-y-2">
            <div className="flex gap-3">
              <div className="relative ">
                <div className="bg-gray p-1 rounded-md">
                  <Image
                    className="w-20 h-20 bg-contain"
                    width={80}
                    height={80}
                    src={product.imageUrl[0].imageUrl || product.imageUrl}
                    alt="Product"
                  />
                </div>
                <div className="absolute -top-2 -right-2">
                  <div
                    onClick={() => showDeleteConfirm(index)}
                    className="bg-white shadow h-5 w-5 rounded-full cursor-pointer"
                  >
                    <IoCloseSharp size={20} />
                  </div>
                </div>
              </div>
              <div className="space-y-1 w-8/12">
                <h1 className="text-14 font-semibold">
                  {typeof product.name === "string" ? product.name : ""}
                </h1>
                <p>
                  AED{" "}
                  <span>
                    {pathName === "/wishlist"
                      ? product.discountPrice
                        ? product.discountPrice * (counts[index] || 1)
                        : product.price * (counts[index] || 1)
                      : product.discountPrice
                      ? product.discountPrice
                      : product.price}
                  </span>
                  .00
                </p>
                <div className="flex">
                  <div
                    onClick={() => decrement(index)}
                    className="h-7 w-7  bg-[#E7E7EF] border border-gray flex justify-center items-center"
                  >
                    <RxMinus size={20} />
                  </div>
                  <div className="h-7 w-7  bg-[#F0EFF2] flex justify-center items-center">
                    <input
                      className="h-7 w-8 text-center border border-gray "
                      type="text"
                      min={1}
                      max={100}
                      disabled
                      value={counts[index] || 1}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div
                    onClick={() => increment(index)}
                    className="h-7 w-7  bg-[#E7E7EF] border border-gray flex justify-center items-center"
                  >
                    <RxPlus size={20} />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="font-semibold text-base">Dimension : 1.22</p>{" "}
                  <IoIosClose size={20} />
                  <input
                    min={1}
                    max={100}
                    type="number"
                    value={product.length}
                    onChange={(e) => handleLengthChange(index, e)}
                    name="length"
                    placeholder="Enter Length"
                    className={`peer px-2 py-1 block border rounded-md border-gray-200 text-sm placeholder:text-slate-400 disabled:opacity-50 disabled:pointer-events-none autofill:pb-2`}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 items-center ">
              <h1 className="font-bold">Total: </h1>
              {pathName === "/wishlist" ? (
                <Button
                  onClick={() => addToCart(product, index)}
                  className="px-4 rounded-md"
                  title={"Add To Cart"}
                />
              ) : (
                <p>
                  AED{" "}
                  <span>
                    {product.discountPrice
                      ? product.discountPrice *
                        (counts[index] || 1) *
                        product.length
                      : product.price * (counts[index] || 1) * product.length}
                  </span>
                  .00
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Table;
