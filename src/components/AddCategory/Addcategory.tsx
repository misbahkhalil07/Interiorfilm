"use client";
import React, { SetStateAction, useState } from "react";
import Imageupload from "components/ImageUpload/Imageupload";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { ImageRemoveHandler } from "utils/helperFunctions";

import Toaster from "components/Toaster/Toaster";
import axios from "axios";
import { Formik, Form } from "formik";
import { Category } from "types/interfaces";
import { IoMdArrowRoundBack } from "react-icons/io";

import { categoryInitialValues, categoryValidationSchema } from "data/Data";
import ProtectedRoute from "hooks/AuthHookAdmin";
import Loader from "components/Loader/Loader";

interface editCategoryNameType {
  name: string;
  description: string
}

interface editCategoryProps {
  seteditCategory: any;
  editCategory: any;
  setMenuType: React.Dispatch<SetStateAction<string>>;
}

const FormLayout = ({ seteditCategory, editCategory, setMenuType }: editCategoryProps) => {
  let CategoryName = editCategory && editCategory.name ? { name: editCategory.name, description: editCategory.description } : null;
  let CategorImageUrl = editCategory && editCategory.posterImageUrl;
  const [posterimageUrl, setposterimageUrl] = useState<any[] | null | undefined>(CategorImageUrl ? [CategorImageUrl] : null);
  const [loading, setloading] = useState<boolean>(false);
  const [editCategoryName, setEditCategoryName] = useState<editCategoryNameType | null | undefined>(CategoryName);

  const onSubmit = async (values: Category, { resetForm }: any) => {
    try {
      setloading(true);
      let posterImageUrl = posterimageUrl && posterimageUrl[0];
      if (!posterImageUrl) throw new Error("Please select relevant Images");
      let newValue = { ...values, posterImageUrl };

      let updateFlag = editCategoryName ? true : false;
      let addProductUrl = updateFlag
        ? `/api/updateCategory/${editCategory._id} `
        : null;
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}${updateFlag ? addProductUrl : "/api/AddCategory"
        }`;

      const response = await axios.post(url, newValue);
      console.log(response, "response");
      setloading(false);
      Toaster(
        "success",
        updateFlag
          ? "Category has been sucessufully updated !"
          : "Category has been sucessufully Created !"
      );
      updateFlag ? seteditCategory(null) : null;
      setposterimageUrl(null);

      resetForm();
      setMenuType("Categories")
    } catch (err) {
      console.log("error occurred", err);
      setloading(false);
    }
  };




  return (
    <>
      <p
        className="text-lg font-black mb-4 flex items-center justify-center gap-2 hover:bg-gray-200 w-fit p-2 cursor-pointer text-black dark:text-white"
        onClick={() => {
          setMenuType("Categories");
        }}
      >
        <IoMdArrowRoundBack /> Back
      </p>

      <Formik
        initialValues={editCategoryName ? editCategoryName : categoryInitialValues}
        validationSchema={categoryValidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <div className="flex justify-center ">
                <div className="flex flex-col gap-9 w-2/5 dark:border-strokedark dark:bg-boxdark">
                  <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                    <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
                      <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                          Add Category Images
                        </h3>
                      </div>
                      {posterimageUrl && posterimageUrl.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                          {posterimageUrl.map((item: any, index) => {
                            return (
                              <div
                                className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                                key={index}
                              >
                                <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full">
                                  <RxCross2
                                    className="cursor-pointer text-red-500 hover:text-red-700"
                                    size={17}
                                    onClick={() => {
                                      ImageRemoveHandler(
                                        item.public_id,
                                        setposterimageUrl
                                      );
                                    }}
                                  />
                                </div>
                                <Image
                                  key={index}
                                  className="object-cover w-full h-full"
                                  width={300}
                                  height={200}
                                  src={item.imageUrl}
                                  alt={`productImage-${index}`}
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <Imageupload setposterimageUrl={setposterimageUrl} />
                      )}
                    </div>

                    <div className="flex flex-col gap-5.5 p-6.5">
                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Category Title
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          placeholder="Title"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name
                            ? "border-red-500"
                            : ""
                            }`}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="text-red-500 text-sm">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </div>


                      <div>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Category Description
                        </label>
                        <textarea

                          name="description"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          placeholder="Description"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name
                            ? "border-red-500"
                            : ""
                            }`}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="text-red-500 text-sm">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mt-4 px-8 py-2 bg-black text-white rounded"
                >
                  {loading ? <Loader color="white" /> : "Submit"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default ProtectedRoute(FormLayout);
