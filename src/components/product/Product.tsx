'use client'
import Container from 'components/Layout/Container/Container'
import Overlay from 'components/widgets/Overlay/Overlay'
import React, { useState, useEffect } from 'react'
import Card from 'components/ui/Card/Card'
import Collapse from 'components/ui/Collapse/Collapse'
import { Select, Space } from 'antd'
import DrawerMenu from 'components/ui/DrawerMenu/DrawerMenu'
import { IoFunnelOutline } from 'react-icons/io5'
import PRODUCTS_TYPES from 'types/interfaces'
import Loader from "components/Loader/Loader";
import type { CheckboxProps, RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import Input from 'components/Common/regularInputs'
import axios from 'axios'
import SkeletonLoading from 'components/Skeleton-loading/SkeletonLoading'
import { Checkbox } from 'antd';
import { IoIosSearch } from 'react-icons/io'
import { useSearchParams } from 'next/navigation'
import { generateSlug } from 'data/Data'
import { Suspense } from 'react'



interface category {
  posterImageUrl: {
    public_id: string,
    imageUrl: string
  },
  _id: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  __v: any
}

const StaticCategory = {
  posterImageUrl: {
    public_id: 'string',
    imageUrl: "string"
  },
  _id: "all",
  name: "View All",
  createdAt: "string",
  updatedAt: "string",
  __v: "any"
}


const ProductPage = () => {
  const [totalProducts, setTotalProducts] = useState<PRODUCTS_TYPES[]>([])
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [colorName, setColorName] = useState<string>()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [sortOption, setSortOption] = useState<string>("Default")
  const [category, setCategory] = useState<category[]>([])
  const [open, setOpen] = useState(false)
  const [priceRange, setPriceRange] = useState({ from: '', to: '' })
  const [value, setValue] = useState(1)
  const [activeLink, setActiveLink] = useState<category | undefined>()
  const [inStockOnly, setInStockOnly] = useState<boolean>(true)
  const [outOfStockOnly, setOutOfStockOnly] = useState<boolean>(false)
  const searchParams = useSearchParams()
  
  const categoryName = searchParams.get('category');

  useEffect(() => {
    get_recordHandler();
  }, []);

  useEffect(() => {
    productHandler(categoryName);
  }, [categoryName]);

  const get_recordHandler=async()=>{
    try {
      setLoading(true);
      const [categoryResponse, productResponse] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`),
      ]);

      const categories = [StaticCategory, ...categoryResponse.data];
      setCategory(categories);
      setTotalProducts(productResponse.data.products);
      if(!categoryName){
        setActiveLink(StaticCategory);
      }else {
        console.log(categoryName, "categoryName")
      const activeCategory = categories.find((cat) =>{
          console.log(cat, "cat")
          return generateSlug(cat.name) === categoryName}
    
    );
      console.log(activeCategory, "activeCategory")

      setActiveLink(activeCategory);

      }
    } catch (err) {
      console.error('Error loading products or categories', err);
    } finally {
      setLoading(false);
    }
  }
  const productHandler = async (categoryName: string | null) => {
    try {
      const activeCategory = category.find((cat) =>generateSlug(cat.name) === categoryName);
      setActiveLink(activeCategory);
    } catch (err) {
      console.error('Error loading products or categories', err);
    }
  };



  const handleCategoryClick = (category: category) => {
    setActiveLink(category);
    const newUrl = new URL(window.location.href);
    const slug = generateSlug(category.name);
    newUrl.searchParams.set('category', slug);
    window.history.pushState({}, '', newUrl.toString());

    productHandler(slug);
  };

  const handleInStockChange: CheckboxProps['onChange'] = (e) => {
    setInStockOnly(e.target.checked)
    setOutOfStockOnly(false)
    setValue(2)
  }

  const handleOutOfStockChange: CheckboxProps['onChange'] = (e) => {
    setOutOfStockOnly(e.target.checked)
    setInStockOnly(false)
    setValue(3)
  }

  const handleAllProductsChange = () => {
    setInStockOnly(false)
    setOutOfStockOnly(false)
    setValue(1)
  }

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
    if (e.target.value === 1) {
      handleAllProductsChange()
    } else if (e.target.value === 2) {
      setInStockOnly(true)
      setOutOfStockOnly(false)
    } else if (e.target.value === 3) {
      setOutOfStockOnly(true)
      setInStockOnly(false)
    }
  }
  const showDrawer = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }

  const filteredProductsByCategory = activeLink
    ? totalProducts.filter((product) => {
        if (activeLink._id === "all") {
          return product;
        }
        return product.category === activeLink._id;
      })
    : totalProducts;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const handlePriceChange = (field: any, value: any) => {
    setPriceRange(prevRange => ({
      ...prevRange,
      [field]: value === '' ? '' : Number(value)
    }));
  };

  const resetPriceFilter = () => {
    setPriceRange({ from: '', to: '' });
  };


  const filteredProducts = filteredProductsByCategory.filter((product: PRODUCTS_TYPES) => {
    if (!product) return true;
    const price = product.discountPrice ?? product.salePrice;
    const priceMatch = (priceRange.from === '' || price >= priceRange.from) && (priceRange.to === '' || price <= priceRange.to);
    const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const colorMatch = !colorName || (product.colors && product.colors.some(color => color.colorName === colorName));
    const inStockMatch = !inStockOnly || product.totalStockQuantity && product.totalStockQuantity > 0;
    const outOfStockMatch = !outOfStockOnly || product.totalStockQuantity === 0 || !product.totalStockQuantity;
    return nameMatch && colorMatch && priceMatch && inStockMatch && outOfStockMatch;
  });

  const sortProducts = (products: PRODUCTS_TYPES[]) => {
    if (sortOption === "Default") {
      return products.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // Convert to uppercase for case-insensitive comparison
        const nameB = b.name.toUpperCase();
        return nameA.localeCompare(nameB, undefined, { numeric: true, sensitivity: 'base' });
      });
    } else if (sortOption === "Low to High") {
      const getPrice = (product: PRODUCTS_TYPES) => product.discountPrice ?? product.salePrice;
      return products.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sortOption === "High to Low") {
      const getPrice = (product: PRODUCTS_TYPES) => product.discountPrice ?? product.salePrice;
      return products.sort((a, b) => getPrice(b) - getPrice(a));
    } else {
      return products; // Default case, no sorting
    }
  };

  const sortedProducts = sortProducts(filteredProducts);


  return (
   
<>
      <Overlay title="Product" />
      <Container className="mt-20 md:overflow-hidden">
        <div className="flex justify-end items-end gap-3">
          <div className="flex flex-wrap gap-2 items-center w-3/6 md:w-auto">
            <h1>Sort By: </h1>
            <Select
              defaultValue="Default"
              className='w-40 h-10 rounded-none'
              onChange={handleSortChange}
              options={[
                { value: "Default", label: "Default" },
                { value: "Low to High", label: "Low to High" },
                { value: "High to Low", label: "High to Low" },
              ]}
            />
          </div>
          <div className="relative w-3/6 md:w-auto flex items-center border border-secondary" >
            <input
              className="px-2 py-2 rounded-none outline-none  w-[90%] border-sky-900"
              type="search"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <IoIosSearch className="inline-block absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap gap-2 space-y-4 ">
          <div className="w-full lg:w-3/12 space-y-3 hidden lg:block  " style={{ boxShadow: "1px 0px 2px #00000029" }}>
            <div className="sticky top-20">
              <div className="p-2 bg-white">
                <Collapse title="All Categories">
                  <ul className="px-1 pt-2 space-y-1">
                    {loading ? (
                      <div className="flex flex-col space-y-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <div key={index} className=' flex flex-col mt-3 w-full'>
                            <SkeletonLoading
                              title={false}
                              style={{ flexDirection: 'column' }}
                              paragraph={{ rows: 1 }}
                              className='flex w-full'
                              active={true}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      category && category.map((item, index) => {
                        let viewAllflag = item.name == "View All"
                        console.log(viewAllflag, "flag")
                        return (
                          <li className='flex flex-col w-full' key={index}>
                            <div
                              onClick={() => handleCategoryClick(item)}
                              className={
                                activeLink?.name === item.name
                                  ? `bg-secondary px-2 text-white w-full h-8 flex tracking-[2px] items-center  cursor-pointer text-lg truncate
`
                                  : `hover:bg-secondary px-2 hover:text-white w-full h-8 flex items-center  cursor-pointer text-lg truncate text-text	
`
                              }
                            >
                              {item.name.toUpperCase()}
                            </div>
                          </li>

                        )
                      })
                    )}
                  </ul>
                </Collapse>
              </div>
              <div className="p-2 bg-white ">
                <Collapse title="Availability">
                  <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">

                      <Checkbox checked={inStockOnly} onChange={handleInStockChange} value={2}>In Stock</Checkbox>
                      <Checkbox checked={outOfStockOnly} onChange={handleOutOfStockChange} value={3}>Out Of Stock</Checkbox>
                    </Space>
                  </Radio.Group>
                </Collapse>
              </div>
              <div className="p-2 bg-white">
                <Collapse title="Filter Price">
                  <div className='flex gap-2'>
                    <Input
                      className='h-10 border-black border-1 rounded-none'
                      placeholder='FROM'
                      type='number'
                      value={priceRange.from}
                      onChange={(e: any) => handlePriceChange('from', e.target.value)}
                    />
                    <Input
                      className='h-10 border-black border-1 rounded-none'
                      placeholder='TO'
                      type='number'
                      value={priceRange.to}
                      onChange={(e: any) => handlePriceChange('to', e.target.value)}
                    />
                  </div>
                  <div className='text-end pt-2 underline cursor-pointer uppercase font-poppins- text-xs text-dark' onClick={resetPriceFilter}>Reset Price</div>
                </Collapse>
              </div>
            </div>
          </div>
          <DrawerMenu
            showDrawer={showDrawer}
            onClose={onClose}
            open={open}
            className="float-end"
            width={300}
            title={
              <>
                <div className="flex lg:hidden mt-5 underline gap-2 items-center cursor-pointer">
                  <IoFunnelOutline size={20} />
                  Filters{" "}
                </div>
              </>
            }
            content={
              <div className="space-y-2">
                <div className="p-2 bg-white">
                  <Collapse title="All Categories">
                    <ul className="px-1 pt-2 space-y-1">
                      {loading ? <div className="flex justify-center items-center"><Loader /></div> : category && category?.map((item, index) => (
                        <li className='flex flex-col w-full' key={index} onClick={onClose}>
                          <div className={activeLink?.name === item.name ? "bg-black px-2 text-white rounded-md w-full h-8 flex items-center cursor-pointer font-poppins-light font-light" : "hover:bg-secondary px-2 hover:text-white hover:rounded-md w-full h-8 flex items-center cursor-pointer font-poppins-light"} onClick={() => handleCategoryClick(item)}>{item.name}</div>
                        </li>
                      ))}
                    </ul>
                  </Collapse>
                </div>
                <div className="p-2 bg-white">
                  <Collapse title="Availability">
                    <Radio.Group onChange={onChange} value={value}>
                      <Space direction="vertical">
                        <Radio checked={inStockOnly} onChange={handleInStockChange} value={1}>In Stock</Radio>
                        <Radio checked={outOfStockOnly} onChange={handleOutOfStockChange} value={2}>Out Of Stock</Radio>
                      </Space>
                    </Radio.Group>
                  </Collapse>
                </div>
                <div className="p-2 bg-white">
                  <Collapse title="Filter Price">
                    <div className='flex gap-2'>
                      <Input
                        className='h-10'
                        placeholder='From'
                        type='number'
                        value={priceRange.from}
                        onChange={(e: any) => handlePriceChange('from', e.target.value)}
                      />
                      <Input
                        className='h-10'
                        placeholder='To'
                        type='number'
                        value={priceRange.to}
                        onChange={(e: any) => handlePriceChange('to', e.target.value)}
                      />
                    </div>
                    <div className='text-end pt-2 underline cursor-pointer' onClick={resetPriceFilter}>Reset Price</div>
                  </Collapse>
                </div>
              </div>
            }
          />
          <div className="w-full lg:w-9/12">
            {error ? (
              <div className="text-red flex justify-center items-center">{error}</div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2">

                  {loading ? (

                    Array.from({ length: 9 }).map((_, index) => (
                      <div key={index} className='gap-10 flex flex-col mt-3'>
                        <SkeletonLoading
                          avatar={{ shape: 'square', size: 150, className: "w-full flex flex-col" }}
                          title={false}
                          style={{ flexDirection: 'column' }}
                          paragraph={{ rows: 3 }}
                          className='gap-10 flex'
                          active={true}
                        />
                      </div>
                    ))
                  ) : (
                    <Card ProductCard={sortedProducts} />
                  )}
                </div>
              </>
            )}
            {/* {productsToShow < sortedProducts.length && (
              <button
                className='px-5 py-2 bg-primary text-white rounded-md flex items-center mx-auto'
                onClick={loadMoreProducts}
              >
                Load More
              </button>
            )} */}
          </div>
        </div>
      </Container>

</>

  );
};

export default ProductPage;
