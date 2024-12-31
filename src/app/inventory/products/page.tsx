'use client';

import { MainNavbar } from "@/app/components/navbar";
import Sidebar from "@/app/components/sidebar";
import { Overview } from "@/app/widgets/overview";
import { ProductList } from "@/app/widgets/ProductList";
import data from "@/app/data/productList.json";

export default function InventoryProducts() {


  return (
    <div className="bg-slate-100 min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased">
      <MainNavbar />

      <Sidebar selectedMainmenu="Inventory" selectedSubmenu="Products" />
      <div className="h-full ml-14 mt-20 mb-10 md:ml-64">
        <Overview />
        {/* <div className="p-4"> */}
        {/* <div className="flex flex-row"> */}
        {/* <div className="flex-initial  w-2/5 pr-2 hidden md:block"> */}
        {/* <ActiveOrders /> */}
        {/* </div> */}
        {/* <div className="flex-initial max-sm:w-full w-3/5 pl-3 "> */}
        {/* <DashboardChart /> */}
        {/* </div> */}
        {/* </div> */}
        {/* </div> */}
        <ProductList data={data} />
      </div>
    </div>
  );
}