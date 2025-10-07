import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    
  return (
    <div>
      <Header />
      <div className="flex flex-col mx-[140px] max-lg:mx-[90px] mt-10">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
