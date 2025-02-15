import { Rate } from 'antd';
import Container from 'components/Layout/Container/Container'
import React from 'react'
import { SlDiamond } from 'react-icons/sl'

// Define the Offer type
interface Offer {
    title: string;
    detail: string;
    icon?: React.ReactNode; // Changed from 'any' to 'React.ReactNode' for better type safety
  }
  
  // Define the props type for the component
  interface OffersProps {
    Offers?: Offer[];
  }
  
  const Offer: React.FC<OffersProps> = ({ Offers = [] }) => {
  return (
    <Container className='mt-20'>
        <h1 className=' font-semibold text-lg lg:text-5xl text-center capitalize'>What does interior Film offer you!</h1>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-2 md:gap-4'>
            {
                Offers.map((array,index)=>(
                    <div className='group ' key={index}>
                    <div className='custom-shadow p-1 md:p-2  group-hover:shadow-lg flex flex-col justify-center items-center space-y-3 md:pt-10 md:pb-10 px-1 md:px-4   h-50 md:h-72 transition duration-500 ease-in-out' >
                    <div className='w-10 h-10 md:w-16 md:h-16 rounded-full bg-white group-hover:bg-primary transition duration-500 ease-in-out flex justify-center items-center'>
                        {array.icon}
                    </div>
                    <h1 className='font-medium text-12 sm:text-14 text-center text-heading'>{array.title}</h1>
                    <p className='text-center text-[10px] md:text-base text-para'>{array.detail}</p>
                 </div>
                 </div>
                 
                ))
            }
        </div>
        
    </Container>
  )
}

export default Offer