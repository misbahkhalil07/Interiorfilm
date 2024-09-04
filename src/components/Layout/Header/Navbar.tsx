"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import whitelogo from "../../../../public/images/logowhite.png";
import blacklogo from "../../../../public/images/logoblack.png";
import { IoIosSearch, IoMdHeartEmpty } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import DrawerMenu from "components/ui/DrawerMenu/DrawerMenu";
import { useRouter } from "next/navigation";
import { Modal, Popover } from "antd";
import Megamanu from "./Megamanu/Megamanu";
import { generateSlug } from "data/Data";
import axios from "axios";
import { useAppSelector } from "components/Others/HelperRedux";
import Cookies from "js-cookie";
import { loggedInUserAction } from "../../../redux/slices/userSlice";
import { useAppDispatch } from "components/Others/HelperRedux";
import Profile from "components/user_profile/Profile";
import { Categories_Types } from "types/interfaces";
import { usePathname } from "next/navigation";
import PRODUCTS_TYPES, { Category } from "types/interfaces";
import whatsapp from "../../../../public/images/whatsapp.png";
import { SlHandbag } from "react-icons/sl";
import CartDrawer from "components/cart-drawer/cart-drawer";
import TopNav from "./TopNav";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<Category | undefined>();
  const [Categories, setCategories] = useState<Categories_Types[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [category, setcategory] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [WishlistItems, setWishlistItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<PRODUCTS_TYPES[]>([]);
  const pathname = usePathname(); // Get the current path
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { loggedInUser }: any = useAppSelector((state) => state.userSlice);
  const isHomePage = pathname === "/";

  const productHandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
      );
      setCategories(response.data);
    } catch (err) {
      console.log(err, "err");
    }
  };
  useEffect(() => {
    productHandler();
  }, [Categories]);

  const AddminProfileTriggerHandler = async (token: string) => {
    try {
      if (!token) return null;
      let user: any = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getuserHandler`,
        {
          headers: {
            token: token,
          },
        }
      );
      dispatch(loggedInUserAction(user.data.user));
    } catch (err: any) {
      console.log(err, "err");
    }
  };

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };

  const closePopover = () => {
    setVisible(false);
  };
  const handleCloseDrawer = () => setDrawerOpen(false);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const existingWishlist = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );
    setWishlistItems(existingWishlist);
  }, []);
  useEffect(() => {
    const handleWishlistChange = () => {
      const updatedWishlist = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      setWishlistItems(updatedWishlist);
    };

    window.addEventListener("WishlistChanged", handleWishlistChange);

    return () => {
      window.removeEventListener("WishlistChanged", handleWishlistChange);
    };
  }, []);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(existingCart);
  }, []);

  useEffect(() => {
    const handleCartChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(updatedCart);
    };

    window.addEventListener("cartChanged", handleCartChange);

    return () => {
      window.removeEventListener("cartChanged", handleCartChange);
    };
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const CategoryHandler = () => {
    setcategory(true);
  };

  const CategoryHandlerclose = () => {
    setcategory(false);
    setOpen(false);
  };

  const router = useRouter();

  useEffect(() => {
    const handleCartChange = () => {
      setcategory(false);
      setOpen(false);
    };

    window.addEventListener("cartChanged", handleCartChange);

    return () => {
      window.removeEventListener("cartChanged", handleCartChange);
    };
  }, []);

  useEffect(() => {
    if (isModalOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isModalOpen]);
  const truncateText = (text: any, maxLength: any) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    let previousCartItemCount = cartItems.reduce(
      (count, item: any) => count + item.count,
      0
    );

    const handleCartChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCartItemCount = updatedCart.reduce(
        (count: number, item: any) => count + item.count,
        0
      );
      if (updatedCartItemCount > previousCartItemCount) {
        setCartItems(updatedCart);
        setDrawerOpen(true);
        setTimeout(() => {
          setDrawerOpen(false);
        }, 2000);
      }
      previousCartItemCount = updatedCartItemCount;
    };

    window.addEventListener("cartChanged", handleCartChange);

    return () => {
      window.removeEventListener("cartChanged", handleCartChange);
    };
  }, [cartItems]);

  return (
    <>
      <TopNav />
      <nav
        className={`z-99 w-full p-2 px-4 lg:px-8 xl:px-32   ${
          isHomePage
            ? isScrolled
              ? "bg-white text-black top-0 fixed"
              : "bg-white text-black sticky top-0"
            : "bg-white text-black sticky top-0 "
        }`}
      >
        <div className="grid grid-cols-3 items-center mt-2">
          <div
            className=" cursor-pointer text-20 md:text-2xl"
            onClick={showModal}
          >
            <IoIosSearch />
          </div>
          <div className="mx-auto">
            <Link href="/">
              <Image
                src={
                  isHomePage ? (isScrolled ? blacklogo : blacklogo) : blacklogo
                }
                alt="logo"
                width={207}
                height={39}
              />
            </Link>
          </div>
          <div className="flex items-center justify-end gap-2 md:gap-4">
            {loggedInUser ? (
              <Profile />
            ) : (
              <Link className=" text-16 md:text-2xl" href="/login">
                <FaRegUser className=" cursor-pointer" />
              </Link>
            )}
            <Link href={"/wishlist"} className="relative text-16 md:text-2xl">
              <IoMdHeartEmpty className=" cursor-pointer" />
              {cartItems.length > 0 ? (
                <div className="md:w-5 md:h-5 w-3 h-3 rounded-full z-50 flex justify-center items-center shadow-2xl bg-white text-black absolute left-2 top-2 md:left-3 md:top-3">
                  <span className="font-medium text-11 md:text-18">
                    {WishlistItems.reduce(
                      (count: any, item: any) => count + item.count,
                      0
                    )}
                  </span>
                </div>
              ) : (
                <></>
              )}
            </Link>
            <Link href={"/cart"} className="relative text-16 md:text-2xl">
              <SlHandbag className=" cursor-pointer" />
              {cartItems.length > 0 ? (
                <>
                  <div className="md:w-5 md:h-5 w-3 h-3 rounded-full z-50 flex justify-center items-center bg-white text-black absolute left-2 top-2 md:left-3 md:top-3">
                    <span className="font-medium text-11 md:text-18">
                      {cartItems.reduce(
                        (count: any, item: any) => count + item.count,
                        0
                      )}
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </Link>
            <div className=" block lg:hidden">
              <DrawerMenu
                showDrawer={showDrawer}
                onClose={onClose}
                open={open}
                width={250}
                title={
                  <>
                    <div className="text-16 md:text-2xl ">
                      <FaBars />
                    </div>
                  </>
                }
                content={
                  <>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          className="text-14 font-medium text-black hover:text-black"
                          href="/"
                        >
                          Home
                        </Link>
                      </li>
                   {Categories &&
                        Categories.map((cat, index) => (
                            <li>
                          <div
                            key={index}
                            className="link-underline text-14 font-medium text-black hover:text-black cursor-pointer"
                            onClick={() => {
                              const slug = generateSlug(cat.name);
                              router.push(`/products?category=${slug}`);
                              onClose();
                            }}
                          >
                            {cat.name}
                          </div>
                   </li>
                        ))}
                      <li>
                        <Link
                          className="text-14 font-medium text-black hover:text-black "
                          onClick={onClose}
                          href="/about"
                        >
                          About Us
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-14 font-medium text-black hover:text-black"
                          onClick={onClose}
                          href="/contact"
                        >
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </>
                }
              />
            </div>
          </div>
        </div>

        <div>
          <ul
            className={`hidden lg:flex lg:space-x-4  xl:space-x-5 2xl:space-x-17 text-11 xl:text-13 py-3 2xl:px-6 whitespace-nowrap  ${
              isHomePage
                ? isScrolled
                  ? "bg-white text-black"
                  : "bg-white text-black"
                : "bg-white text-black"
            }`}
          >
            <Link
              className="link-underline 2xl:leading-7 2xl:tracking-[20%] "
              href="/"
            >
              Home
            </Link>
            {Categories &&
              Categories.map((cat, index) => (
                <div
                  key={index}
                  className="link-underline 2xl:leading-7 2xl:tracking-[20%] cursor-pointer"
                  onClick={() => {
                    const slug = generateSlug(cat.name);
                    router.push(`/products?category=${slug}`);
                  }}
                >
                  {cat.name}
                </div>
              ))}
            <Link
              className="link-underline 2xl:leading-7 2xl:tracking-[20%] "
              href="/about"
            >
              About
            </Link>
            <Link
              className="link-underline 2xl:leading-7 2xl:tracking-[20%] "
              href="/contact"
            >
              Contact
            </Link>
          </ul>
        </div>
      </nav>

      <div className="fixed top-auto bottom-0 md:top-[150px] right-0 z-999 ">
        <Link
          target="_blank"
          href={"https://wa.link/mb359y"}
          className="sticky top-1 "
        >
          <Image
            width={200}
            height={200}
            src={whatsapp}
            alt="whatsappo"
            className="w-30 md:w-50"
          />
        </Link>
      </div>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer=""
        width={800}
      >
        <>
          <div className="mt-8 space-y-3 mb-3">
            <input
              className="w-full px-4 border h-14 rounded-md outline-none"
              type="text"
              ref={searchInputRef} // Assign the ref here
              placeholder="Search Product Here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {searchTerm && ( // Render products only when there is a search term
            <div className="max-h-[400px] overflow-y-scroll  pr-2 bg-white rounded-md p-2">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <Link
                    key={index}
                    href={{
                      pathname: `/product/${generateSlug(product.name)}`,
                    }}
                    onClick={() => setIsModalOpen(false)}
                    className="shadow p-2 flex gap-2 mt-2 rounded-md border text-black hover:text-black border-gray hover:border-primary"
                  >
                    {product.posterImageUrl && (
                      <Image
                        className="rounded-md"
                        width={100}
                        height={100}
                        src={product.posterImageUrl.imageUrl}
                        alt="image"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-lg md:text-xl">
                        {product.name}
                      </p>
                      <p>{truncateText(product.description, 160)}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-dark dark:text-white">No products found</p>
              )}
            </div>
          )}
        </>
      </Modal>
      <CartDrawer open={drawerOpen} onClose={handleCloseDrawer} />
    </>
  );
};

export default Navbar;
