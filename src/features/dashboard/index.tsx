import axios from "axios";
import { ChevronDown, Heart, LogOut, MoonStar, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import DetailsDialog from "./components/DetailsDialog";
import type { ICountryProps } from "../../types/country";

const DashboardComponent = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<ICountryProps[]>([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  console.log(selectedRegion);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/logout",
        {},
        { withCredentials: true },
      );
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          " https://restcountries.com/v3.1/all?fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags",
        );

        setCountries(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const uniqueRegion = [...new Set(countries.map((c) => c.region))].sort();

  const filteredCountries = countries.filter((e) => {
    const matchSearch = e.name.official
      .trim()
      .toLowerCase()
      .includes(searchCountry.toLowerCase().trim());
    const matchRegion = selectedRegion ? e.region === selectedRegion : true;
    return matchSearch && matchRegion;
  });

  return (
    <section className="bg-gray-100 min-h-screen">
      <nav className="bg-white/80 backdrop-blur-md h-14 w-full shadow-sm flex justify-between items-center px-6 sticky top-0 z-20">
        <p className="font-bold text-lg tracking-tight">Where in the world?</p>

        <div className="flex gap-3 md:gap-4 items-center">
          <button className="flex items-center gap-2 text-gray-600 hover:text-black transition cursor-pointer">
            <MoonStar className="size-4" />
            <span className="hidden md:block text-sm">Dark Mode</span>
          </button>

          <button
            className="text-red-500 text-sm hover:text-red-600 transition cursor-pointer font-semibold"
            onClick={handleLogout}
          >
            <span className="max-sm:hidden">Logout</span>
            <div className="bg-red-400 p-1 rounded-full sm:hidden">
              <LogOut className="size-3 text-white" />
            </div>
          </button>
        </div>
      </nav>

      <main className="py-2 px-3 ">
        <section
          id="header"
          className="flex flex-col md:flex-row justify-between   gap-4"
        >
          <div id="search-bar">
            <div className="md:w-80 relative">
              <Search className="absolute top-1/2 -translate-y-1/2 left-4 size-4 text-gray-400" />
              <input
                placeholder="Search for a country..."
                className="bg-white h-11 pl-11 pr-4 w-full rounded-lg shadow-sm border border-gray-200 focus:ring-2 focus:ring-gray-200 focus:outline-none text-sm transition"
                value={searchCountry}
                onChange={(e) => setSearchCountry(e.target.value)}
              />
            </div>
          </div>
          <div id="filter">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-11 px-5 bg-white text-gray-700 border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 rounded-lg cursor-pointer">
                  {selectedRegion ? (
                    <span className="text-sm font-medium">
                      {selectedRegion}
                    </span>
                  ) : (
                    <span className="text-sm font-medium">
                      Filter by Region
                    </span>
                  )}

                  <ChevronDown className="size-4 opacity-60" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-44 p-2 rounded-xl shadow-lg border border-gray-100 bg-white"
              >
                <DropdownMenuGroup className="space-y-1">
                  {uniqueRegion.map((region) => (
                    <DropdownMenuCheckboxItem
                      key={region}
                      className="rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition cursor-pointer"
                      checked={selectedRegion === region}
                      onCheckedChange={() =>
                        setSelectedRegion(
                          selectedRegion === region ? null : region,
                        )
                      }
                    >
                      {region}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>
        <section
          id="content-card"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5 "
        >
          {filteredCountries.length > 0 ? (
            filteredCountries.map((e, idx) => (
              <div
                key={idx}
                className="bg-white w-full max-w-72 rounded-xl overflow-hidden mx-auto shadow-sm  "
              >
                {/* Flag */}
                <div className="h-36 sm:h-40 overflow-hidden relative">
                  <img
                    src={e.flags.svg}
                    className="w-full h-full object-cover brightness-95"
                  />
                  <button className="z-10 absolute top-2 right-3    bg-red-400 rounded-xl p-2 flex items-center gap-1 text-white cursor-pointer shadow-md inset-shadow-2xs">
                    <Heart className="size-4" />
                    <span className="text-sm font-semibold">
                      Add to Wishlist
                    </span>
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between h-37">
                  {/* Title */}
                  <div className="min-h-12">
                    <p className="font-extrabold text-[15px] leading-snug line-clamp-2 text-gray-900">
                      {e.name.official}
                    </p>
                  </div>

                  {/* Info */}
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-semibold text-gray-800">
                        Population:
                      </span>{" "}
                      {e.population.toLocaleString()}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800">
                        Region:
                      </span>{" "}
                      {e.region}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800">
                        Capital:
                      </span>{" "}
                      {e.capital}
                    </p>
                  </div>
                </div>

                {/* Button */}
                <div className="p-4 pt-0">
                  {/* <Button className="w-full rounded-lg bg-gray-600 hover:bg-gray-700  text-white text-sm transition cursor-pointer">
                    <Search /> Show Detail
                  </Button> */}
                  <DetailsDialog country={e} />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Search className="size-6 text-gray-400" />
              </div>

              <p className="text-lg font-semibold text-gray-700">
                No countries found
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Try adjusting your search or filter
              </p>
            </div>
          )}
        </section>
      </main>
    </section>
  );
};

export default DashboardComponent;
