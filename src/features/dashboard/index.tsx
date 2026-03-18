import { MoonStar, Search } from "lucide-react";

const DashboardComponent = () => {
  return (
    <section className="bg-gray-100 min-h-screen">
      <nav className="bg-white h-14 w-full shadow-sm flex justify-between items-center px-4 ">
        <p className="font-extrabold">Where in the world?</p>
        <div className="flex gap-2 items-center">
          <MoonStar className="size-4" />
          <span className="text-xs md:text-sm">Dark Mode</span>
        </div>
      </nav>
      <section id="search-bar" className="">
        <div className="w-full px-2 relative rounded-md">
          <Search className="absolute top-7 left-5 size-4 text-gray-400" />
          <input
            placeholder="Search for a country ... "
            className="bg-white h-10 pl-10 mt-4 w-full rounded-md shadow-md inset-shadow-2xs focus:outline-0 text-sm"
          />
        </div>
      </section>
      <section id="filter"></section>
    </section>
  );
};

export default DashboardComponent;
