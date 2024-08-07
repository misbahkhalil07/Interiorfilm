'use client'
import React from 'react';
import Overlay from 'components/widgets/Overlay/Overlay';
import Link from 'next/link';
import { return__refund } from 'data/Data';

const ReturnRefund: React.FC = () => {
  return (
    <>
      <Overlay title='Return & Refund'/>
      <div className='px-2 sm:px-4 md:px-8 max-w-screen-xl mx-auto space-y-3 py-20'>
        <h1 className='text-2xl font-bold'>Return & Refund</h1>
        {return__refund.map((item, index) => (
          <div key={index} className='space-y-3'>
            <h2 className='text-xl font-bold'>{item.title}</h2>
            <div>
            {item.text.includes('cs@interiorfilm.ae') ? (
                      <>
                        {item.text.split('cs@interiorfilm.ae')[0]}
                        <Link href='mailto:cs@interiorfilm.ae' className='text-primary hover:text-primary'>
                          cs@interiorfilm.ae
                        </Link>
                        {item.text.split('cs@interiorfilm.ae')[1]}
                      </>
                    ) : (
                      item.text
                    )}
            </div>
            {item.listItems && (
              <ul className='px-4 space-y-1'>
                {item.listItems.map((listItem, listItemIndex) => (
                  <li key={listItemIndex} className='list-decimal'>
                    {listItem.includes('cs@interiorfilm.ae') ? (
                      <>
                        {listItem.split('cs@interiorfilm.ae')[0]}
                        <Link href='mailto:cs@interiorfilm.ae' className='text-primary hover:text-primary'>
                          cs@interiorfilm.ae
                        </Link>
                        {listItem.split('cs@interiorfilm.ae')[1]}
                      </>
                    ) : (
                      listItem
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
        
      </div>
    </>
  );
};

export default ReturnRefund;
