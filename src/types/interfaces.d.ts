import {FormEventHandler } from "react";

React.FormEvent<HTMLFormElement>
export interface USRPROPS {
    handleSubmit: FormEventHandler<HTMLFormElement>,
    error:string | null | undefined
    loading: boolean | null | undefined
    inputFields:any
    buttonTitle:string
    title?: string,
    descrition? : string  
    InstructionText? :string,
    routingText? : string
    navigationLink?:string
    navigationTxt?:string
  
  }


  export interface PRODUCTCARDPROPS {
    ImgUrl: string,
    title: string,
    strikThroughPrice: string,
    price: string
  }
  
  
  
  export interface Product {
    name: string;
    description: string;
    price: string;
    category: string;
    colors: { colorName: string }[];
    modelDetails: { name: string; detail: string }[]; 
    spacification: { specsDetails: string }[];
    discountPrice: string;
    category: string
  }
  
  export interface Category {
    name: string;
  
  }
  
  
  interface CloudinaryImage {
    public_id: string | undefined;
    imageUrl: string | undefined; 
    _id: string | undefined;
  }
  interface Images {
    posterImageUrl: string | undefined,
    hoverImageUrl:string | undefined, 
    imageUrl:CloudinaryImage []
  
  }
  
  interface ProductWithImages extends Product, Images {}