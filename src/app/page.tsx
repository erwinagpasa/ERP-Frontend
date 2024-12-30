'use client';
import { MainNavbar } from "./components/navbar";
import { Overview } from "./widgets/overview";
import { ActiveOrders } from "./widgets/active-orders";
import data from "./data/profile.json";
import { UserList } from "./widgets/user-list";
import { Address } from "./widgets/address";
import { ContactForm } from "./widgets/contact-form";
import DashboardChart from "./widgets/DashboardChart";
import Sidebar from "./components/sidebar";


export default function Home() {


  return (
    <div className="bg-slate-100 min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased">
      <MainNavbar />

      <Sidebar selectedMainmenu="Dashboard" selectedSubmenu="" />
      <div className="h-full ml-14 mt-20 mb-10 md:ml-64">
        <Overview />
        <div className="p-4">
          <div className="flex flex-row">
            <div className="flex-initial  w-2/5 pr-2 hidden md:block">
              <ActiveOrders />
            </div>
            <div className="flex-initial max-sm:w-full w-3/5 pl-3 ">
              <DashboardChart />
            </div>
          </div>
        </div>
        <UserList data={data} />
        <div className="mt-8 mx-4">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <Address />
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}