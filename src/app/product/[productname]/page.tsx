"use client"
import Thumbnail from 'components/Carousel/Thumbnail/Thumbnail';
import Container from 'components/Layout/Container/Container';
import Overlay from 'components/widgets/Overlay/Overlay';
import React, { useState, useEffect } from 'react';
import { Rate, message, Tabs } from 'antd';
import { GoHeart } from 'react-icons/go';
import ProductSlider from 'components/Carousel/ProductSlider/ProductSlider';
import axios from 'axios';
import Loader from 'components/Loader/Loader';
import Review from 'components/Common/Review';
import { RxMinus, RxPlus } from 'react-icons/rx';
import { generateSlug } from 'data/Data';
import PRODUCTS_TYPES from 'types/interfaces';
import SelectList from 'components/ui/Select/Select';

const { TabPane } = Tabs;

const Product = ({ params }: { params: { productname: string } }) => {
  const parsedProduct = params.productname ? params.productname : null;
  const [products, setProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [productDetail, setProductDetail] = useState<PRODUCTS_TYPES | null>(null);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<PRODUCTS_TYPES[]>([]);
  const [relatedProductsLoading, setRelatedProductsLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [length, setLength] = useState<number>(1);

  const handleIncrement = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);
    } else {
      message.error('Quantity cannot exceed 100.');
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      message.error('Quantity cannot be less than 1.');
    }
  };

  useEffect(() => {
    if (productDetail?._id) {
      fetchReviews(productDetail._id);
    }
  }, [productDetail]);

  useEffect(() => {
    if (productDetail) {
      const price = productDetail.discountPrice || productDetail.salePrice;

      setTotalPrice((price * length) * quantity);
    }
  }, [length, quantity, productDetail]);

  const fetchReviews = async (productId: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/getReviews/${productId}`);
      setReviews(response.data.reviews);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.star, 0);
    return totalRating / reviews.length;
  };


  const handleAddToCart = (product: any) => {
    const newCartItem = {
      id: product._id,
      name: product.name,
      price: product.salePrice,
      imageUrl: product.posterImageUrl?.imageUrl,
      discountPrice: product.discountPrice,
      count: quantity,
      length: length,
      totalPrice: (product.discountPrice || product.salePrice) * length * quantity,
      purchasePrice: product.purchasePrice,
      sizes: product.sizes
    };

    let existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = existingCart.findIndex((item: any) => item.id === product._id);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].length += length;
      existingCart[existingItemIndex].count += quantity;
      existingCart[existingItemIndex].totalPrice += (product.discountPrice || product.salePrice) * length * quantity;
    } else {
      existingCart.push(newCartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    message.success('Product added to cart successfully!');
    window.dispatchEvent(new Event("cartChanged"));
  };


  const handleAddToWishlist = (product: any) => {
    const newWishlistItem = {
      id: product._id,
      name: product.name,
      price: product.salePrice,
      imageUrl: product.posterImageUrl?.imageUrl,
      discountPrice: product.discountPrice,
      count: quantity,
      length: length,
      totalPrice: (product.discountPrice || product.salePrice) * length * quantity,
    };

    let existingWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const existingItemIndex = existingWishlist.findIndex((item: any) => item.id === product._id);

    if (existingItemIndex !== -1) {
      // Update length and quantity
      existingWishlist[existingItemIndex].length += length;
      existingWishlist[existingItemIndex].count += quantity;
      existingWishlist[existingItemIndex].totalPrice += (product.discountPrice || product.salePrice) * length * quantity;
    } else {
      existingWishlist.push(newWishlistItem);
    }

    localStorage.setItem("wishlist", JSON.stringify(existingWishlist));
    message.success('Product added to Wishlist successfully!');
    window.dispatchEvent(new Event("WishlistChanged"));
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        setProductsLoading(true)
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
        if (parsedProduct && (response.data.products && response.data.products.length > 0)) {
          let slicedProducts = response.data.products.length > 4 ? response.data.products.filter((item: any) => generateSlug(item.name) !== parsedProduct).slice(0, 4) : response.data.products.filter((item: any) => generateSlug(item.name) !== parsedProduct)
          setProducts(slicedProducts);
          for (let key of response.data.products) {
            if (generateSlug(key.name) === parsedProduct) {
              setProductDetail(key);
              fetchRelatedProducts(key.category);
              return;
            }
          }
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setProductsLoading(false)
      }
    };

    const fetchRelatedProducts = async (categoryId: string) => {
      try {
        setRelatedProductsLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
        const relatedProducts = response.data.products.filter((product: any) => product.category === categoryId && generateSlug(product.name) !== parsedProduct);
        setRelatedProducts(relatedProducts.slice(0, 4));
      } catch (error) {
        console.log('Error fetching related products:', error);
      } finally {
        setRelatedProductsLoading(false);
      }
    };

    fetchData();
  }, [parsedProduct]);

  const tabData = [
    {
      key: "1",
      label: 'Description',
      children: (
        <div className='space-y-3'>
          <div>
            <p>{productDetail?.description}</p>
          </div>
        </div>
      )
    },
    {
      key: "2",
      label: 'Additional Info',
      children: (
        <div className='space-y-3'>
          <div>
            <ul className='px-6'>
              {productDetail?.spacification?.map((item: any, index: number) => (
                <li className='list-disc' key={index}>{item.specsDetails}</li>
              ))}
            </ul>
          </div>
        </div>
      )
    },
    {
      key: "3",
      label: 'Review',
      children: <><Review reviews={reviews} productId={productDetail?._id} fetchReviews={fetchReviews} /></>
    },

    {
      key: "4",
      label: 'Video',
      children: <><Review reviews={reviews} productId={productDetail?._id} fetchReviews={fetchReviews} /></>
    },
  ];
  const averageRating = calculateAverageRating();

  const onChange = (value: string) => {
    setLength(Number(value))
  };



  let options: any = []

  {
    ((productDetail && productDetail.sizes) && productDetail.sizes.length > 0) && productDetail.sizes.forEach((item: any) => {
      let SizesArray = { label: "1.22" + "x" + item.sizesDetails + " METERS", value: item.sizesDetails }
      options.push(SizesArray)

      return null
    })
  }

  


  return (
    <>
      <Overlay title='Product Detail' />
      {
        productsLoading ? <div className='flex justify-center items-center h-[20vh]'><Loader /></div> : productDetail ?
          <>
            <Container className='mt-10 mb-5'>
              <div className='shadow  bg-white'>
                <div className='grid grid-cols-2 md:grid-cols-3 mt-2 p-2 gap-4'>

                  <div className='w-full col-span-2'>
                    <Thumbnail thumbs={productDetail.imageUrl} />
                  </div>

                  <div className='py-3 px-8 space-y-2 md:space-y-8 '>
                    <h1 className='text-3xl'>{productDetail.name}</h1>

                    {(reviews.length && reviews.length > 0) ?
                      <div className='flex gap-2'>
                        <Rate className='text-primary product_starts' value={averageRating} disabled />
                        <p className='flex items-center h-[30x] w-[30x]'>({reviews.length})</p>
                      </div>
                      : null}



                    <div className='flex gap-2'>
                      <p className='text-secondary font-poppins text-[85] font-bold'>
                        Dhs. <span>{productDetail.discountPrice ? productDetail.discountPrice : productDetail.salePrice}</span>.00
                      </p>
                      {productDetail.discountPrice ?
                        <p className='line-through text-light'>
                          Dhs. <span>{productDetail.salePrice}</span>.00
                        </p>
                        : null}
                    </div>
                    <p><span className='text-text'>Available Quantity: </span> {productDetail.totalStockQuantity && productDetail.totalStockQuantity > 0 ? "In Stock" : "Out Of Stock"} </p>

                    <div className='flex gap-2 items-center'>
                      <p className='font-font-semibold	 text-text'>Quantity :</p>
                      <div className='flex'>
                        <div className='h-7 w-7 rounded-md bg-white border border-gray flex justify-center items-center' onClick={handleDecrement}>
                          <RxMinus size={20} />
                        </div>
                        <div className='h-7 w-7 rounded-md bg-white flex justify-center items-center'>
                          <input
                            className="h-8 w-8 text-center border border-gray rounded-md"
                            type="text"
                            min={1}
                            max={100}
                            disabled
                            value={quantity}
                          />
                        </div>
                        <div className='h-7 w-7 rounded-md bg-white border border-gray flex justify-center items-center' onClick={handleIncrement}>
                          <RxPlus size={20} />
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-2 items-center w-[70%]'>

                      <SelectList
                        className='w-full h-10 border outline-none shipment text-20'
                        onChange={onChange}
                        options={options}
                        defaultValue="Select Size"

                      />

                    </div>


                    <p className='text-secondary font-bold'>
                      <span className='font-font-semibold	 text-text'>Total Price :</span> Dhs. <span>{totalPrice}</span>.00
                    </p>

                    {productDetail.totalStockQuantity == null ? (
                      <p className="text-primary text-center text-2xl">Product is out of stock</p>
                    ) : (
                      <div className='flex gap-2'>

                        <button className='bg-secondary truncate py-2 px-5 text-white' onClick={() => { }} >Order Now</button>
                        <button className='bg-secondary  truncate py-2 px-5 text-white' onClick={() => handleAddToCart(productDetail)} >Add To Cart</button>
                        <button className='bg-primary py-3 px-3 text-white' onClick={() => handleAddToWishlist(productDetail)}><GoHeart size={25} /></button>
                      </div>
                    )}
                    <div className='flex items-center gap-2 text-black dark:text-white'>
                      <p className='font-medium text-lg'>Categories: </p>
                      <p className='text-dark'>All, Featured, Shoes</p>
                    </div>
                  </div>


                </div>
              </div>
            </Container>

            <div className='bg-white mt-20'>
              <Container>
                <Tabs defaultActiveKey="1">
                  {tabData.map(tab => (
                    <TabPane tab={tab.label} key={tab.key}>
                      {tab.children}
                    </TabPane>
                  ))}
                </Tabs>
              </Container>
            </div>
          </>
          : null
      }
      <Container className='mt-20'>
        <div className='flex justify-center items-center'>
          <h1 className='w-fit text-center text-lg border-b-2 border-[#FF914E] md:text-3xl mb-5 up'>FEATURE PRODUCT</h1>

        </div>
        <ProductSlider />
      </Container>
    </>
  )
}

export default Product;
