"use client";
import React, { useState, useEffect } from "react";
import HeroSlider from "components/Carousel/HeroSlider/HeroSlider";
import Offer from "components/widgets/Offer/Offer";
import { SlDiamond } from "react-icons/sl";
import { CgBulb } from "react-icons/cg";
import { GiPayMoney } from "react-icons/gi";
import { RiCustomerService2Line } from "react-icons/ri";
import ProductSlider from "components/Carousel/ProductSlider/ProductSlider";
import Container from "components/Layout/Container/Container";
import Mobiletab from "components/ui/Tabs/Mobiletab/Mobiletab";
import axios from 'axios';
import PRODUCTS_TYPES from "types/interfaces";
import OfferProduct from "components/OfferProduct/OfferProduct";

const offers = [
  {
    icon: <SlDiamond className="text-primary group-hover:text-white" size={40} />,
    title: "Savings to your pocket ",
    detail: "We cut out the middle man, passing the savings on to you.",
  },
  {
    icon: <CgBulb className="text-primary group-hover:text-white" size={40} />,
    title: "Fast Delivery",
    detail: "Choose your material, select quantity, check out and receive by the next working day.",
  },
  {
    icon: <GiPayMoney className="text-primary group-hover:text-white" size={40} />,
    title: "Exclusive Collection ",
    detail: "We buy direct from the factory and are exclusive distributors for the GCC.",
  },
  {
    icon: <RiCustomerService2Line className="text-primary group-hover:text-white" size={40} />,
    title: "Service Promise",
    detail: "Our professional team are on hand 365 days a year to help with any queries you may have.",
  },
];

export default function Home() {
  const [allProducts, setAllProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
        setAllProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const featuredProducts = allProducts.slice(0, 10);

  return (
    <>
      <HeroSlider />
      <h1 className="lg:text-[55px] md:text-3xl text-xl font-bold md:font-black text-center mt-20 text-heading">
        Discover Our Product Ranges
      </h1>
      <Container className="mt-10">
        <Mobiletab className="color-black" staticConatiner={"hidden md:block"} />
      </Container>
      <OfferProduct/>
      <Container className="mt-20">
        <h1 className="lg:text-5xl md:text-3xl font-semibold text-xl text-center mb-5 text-heading">
          Feature Products
        </h1>
        <ProductSlider products={featuredProducts} loading={loading} />
      </Container>
      <Offer Offers={offers} />
      {/* <Testimonial /> */}
    </>
  );
}
