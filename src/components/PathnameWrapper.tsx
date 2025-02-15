'use client';

import { usePathname } from 'next/navigation';
import Header from 'components/Layout/Header/Header';
import Footer from './Layout/Footer/Footer';
import Authhook from 'hooks/AuthHook'


const PathnameWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const withoutHeaderPages = [
    "/login",
    '/register',
    "/superAdminlogin",
    "/forgot-password",
    "/dashboard",
    "/"

  ]


  return (
    <>
      {
      withoutHeaderPages.includes(pathname)  || pathname.split('/').includes('dashboard') ? null : 
      <Header />
      }
      {children}
      {pathname !=="/" && (withoutHeaderPages.includes(pathname) || pathname.split('/').includes('dashboard')) ? null  : 
      <Footer /> 
      }
    </>
  );
};

export default Authhook(PathnameWrapper)
