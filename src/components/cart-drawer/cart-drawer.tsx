import React, { useEffect, useRef, useState } from "react";
import { Drawer, message, Modal } from "antd";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { RxMinus, RxPlus } from "react-icons/rx";
import ProductSelect from "components/ui/Select/ProductSelect";
import Link from "next/link";
import PRODUCTS_TYPES from "types/interfaces";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  OpenDrawer?: React.ReactNode;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  OpenDrawer,
}) => {
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const [lengths, setLengths] = useState<{ [key: number]: number }>({});
  const [cartItems, setCartItems] = useState<PRODUCTS_TYPES[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    fetchCartItems();

    const handleCartChange = () => {
      fetchCartItems();
    };

    window.addEventListener("cartChanged", handleCartChange);

    return () => {
      window.removeEventListener("cartChanged", handleCartChange);
    };
  }, []);

  const fetchCartItems = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const validCartItems = existingCart.map((item: any) => ({
      ...item,
      totalPrice: Number(item.totalPrice) || 0,
    }));
    setCartItems(validCartItems);
    setCounts(
      validCartItems.reduce((acc: any, item: any, index: number) => {
        acc[index] = item.count || 1;
        return acc;
      }, {})
    );
    setLengths(
      validCartItems.reduce((acc: any, item: any, index: number) => {
        acc[index] = item.length || 1;
        return acc;
      }, {})
    );
    calculateSubtotal(validCartItems);
  };

  const lengthOptions = (totalStockQuantity: number) => {
    const options = [];
    for (let i = 1; i <= Math.floor(totalStockQuantity); i++) {
      options.push({
        label: `${i} METERS`,
        value: i,
      });
    }
    if (options.length === 0) {
      options.push({
        label: "No sizes available",
        value: "",
      });
    }
    return options;
  };

  const onLengthChange = (index: number, value: number) => {
    const newLengths = { ...lengths, [index]: value };
    setLengths(newLengths);
    updateTotalPrice(index, counts[index], value);
  };

  const calculateSubtotal = (items: PRODUCTS_TYPES[]) => {
    console.log("Calculating subtotal with items:", items);
    const sub = items.reduce((acc, item, index) => {
      const price = item.discountPrice || item.price;
      const length = lengths[index] || item.length;
      const count = counts[index] || item.count;
      return acc + price * length * count;
    }, 0);
    setSubtotal(sub);
  };


  const updateTotalPrice = (index: number, newCount: number, length: number) => {
    const updatedData = [...cartItems];
    updatedData[index].count = newCount;
    updatedData[index].length = length;
    updatedData[index].totalPrice =
      (updatedData[index].discountPrice || updatedData[index].price) * length * newCount;
    updatedData[index].totalPrice = Number(updatedData[index].totalPrice) || 0;
    setCartItems(updatedData);
    localStorage.setItem("cart", JSON.stringify(updatedData));
    calculateSubtotal(updatedData);
  };

  const removeItem = (index: number) => {
    Modal.confirm({
      title: "Are you sure you want to remove this item?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        const newCartItems = cartItems.filter(
          (_, itemIndex) => itemIndex !== index
        );
        setCartItems(newCartItems);
        localStorage.setItem("cart", JSON.stringify(newCartItems));
        calculateSubtotal(newCartItems);
        message.success("Product removed from cart successfully!");
        window.dispatchEvent(new Event("cartChanged"));
      },
      onCancel: () => {
        message.info("Item removal canceled");
      },
    });
  };
 

  return (
    <>
    {open && (
        <div className="  right-0 sm:right-5 top-20 mt-2 fixed z-999 ">
          <div className="border sm:w-96  bg-white p-2">
            <div className="flex items-center justify-between">
              <p className="font-bold text-md-h6">SHOPPING CART</p>
              <IoIosClose
                className="cursor-pointer"
                size={30}
                onClick={() => onClose()} 
              />
            </div>
            <div className="max-h-52 border border-slate-100 overflow-y-scroll p-1 custom-scrollbar">
            {cartItems.map((item: any, index: number) => {
          const options = lengthOptions(item.totalStockQuantity || 0);

          return (
            <div key={index} className="rounded-md shadow p-2 mt-5 bg-white">
              <div className="space-y-2">
                <div className="flex gap-3">
                  <div className="relative">
                    <div className="bg-gray p-1 rounded-md">
                      <Image
                        className="w-16 h-16 bg-contain"
                        width={80}
                        height={80}
                        src={item.imageUrl || "/default-image.png"}
                        alt={item.name}
                      />
                    </div>
                    <div className="absolute -top-2 -right-1">
                      <div
                        className="bg-white shadow h-3 w-3 rounded-full cursor-pointer"
                        onClick={() => removeItem(index)}
                      >
                        <IoCloseSharp size={12} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1 w-8/12">
                    <h1 className="text-12 md:text-14 font-semibold">
                      {item.name}
                    </h1>
                    <p className="text-12 md:text-14">
                      AED
                      <span>
                        {item.discountPrice || item.price}
                      </span>
                   
                    </p>
                    <p className="font-semibold">{item.count}x</p>
                    <ProductSelect
                      className="w-[70%] h-8 border outline-none shipment text-20"
                      onChange={(value) => onLengthChange(index, value)}
                      options={options}
                      defaultValue={`${lengths[index] || item.length} METERS`}
                    />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <h1 className="font-bold">Total: </h1>
                  <p>
                      AED <span>
                        {item.totalPrice !== null && item.totalPrice !== undefined && !isNaN(item.totalPrice)
                          ? item.totalPrice.toFixed()
                          : null}
                      </span>
                     
                    </p>
                </div>
              </div>
            </div>
          );
        })}
            </div>
            <div className="text-end mt-2 mb-2">
              <p className="font-bold">
                Total: AED <span>{subtotal}</span>
              </p>
            </div>
            <p>*ALL ORDERS MAY TAKE 48 HOURS TO BE DELIVERED TO YOUR DOORSTEP</p>
            <div className="w-full mt-2 space-y-1">
              <Link
                href="/cart"
                className="w-full block text-center bg-black text-white py-1"
              >
                View Cart
              </Link>
              <button
                className="border w-full border-black hover:bg-black hover:text-white transition duration-300 py-1"
                onClick={() => onClose()} // Close cart section
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
   
    </>
  );
};

export default CartDrawer;
