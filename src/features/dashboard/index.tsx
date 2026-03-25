import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  MoonStar,
  Search,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import type { ICountryProps } from "../../types/country";
import { useTheme } from "../../wrapper/themeProvider";
import DetailsDialog from "./components/DetailsDialog";

const DashboardComponent = () => {
  // const navigate = useNavigate();
  const [countries, setCountries] = useState<ICountryProps[]>([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { setTheme, theme } = useTheme();

  // const handleLogout = async () => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:8000/api/logout",
  //       {},
  //       { withCredentials: true },
  //     );
  //     console.log(res.data);
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          " https://restcountries.com/v3.1/all?fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags",
        );
        setCountries(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
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

  // pagination
  const itemsPerPage = 8;
  const totalData = filteredCountries.length;
  const totalPage = Math.ceil(totalData / itemsPerPage);
  const currentItems = filteredCountries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchCountry, selectedRegion]);

  useEffect(() => {
    if (currentPage > totalPage) {
      setCurrentPage(1);
    }
  }, [totalPage]);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors">
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md h-14 w-full shadow-sm flex justify-between items-center px-6 sticky top-0 z-20 border-b border-gray-200 dark:border-gray-700">
        <p className="font-bold text-lg tracking-tight text-gray-900 dark:text-gray-100">
          Where in the world?
        </p>

        <div className="flex gap-3 md:gap-4 items-center">
          {theme === "dark" ? (
            <button
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
              onClick={() => setTheme("light")}
            >
              <Sun className="size-4" />
              <span className="hidden md:block text-sm">Light Mode</span>
            </button>
          ) : (
            <button
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
              onClick={() => setTheme("dark")}
            >
              <MoonStar className="size-4" />
              <span className="hidden md:block text-sm">Dark Mode</span>
            </button>
          )}

          {/* <button
            className="text-red-500 text-sm hover:text-red-600 transition cursor-pointer font-semibold"
            onClick={handleLogout}
          >
            <span className="max-sm:hidden">Logout</span>
            <div className="bg-red-400 p-1 rounded-full sm:hidden">
              <LogOut className="size-3 text-white" />
            </div>
          </button> */}
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
                className="bg-white dark:bg-gray-800 h-11 pl-11 pr-4 w-full rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 focus:outline-none text-sm transition text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                value={searchCountry}
                onChange={(e) => setSearchCountry(e.target.value)}
              />
            </div>
          </div>
          <div id="filter">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-11 px-5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex items-center gap-2 rounded-lg cursor-pointer">
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
                className="w-44 p-2 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <DropdownMenuGroup className="space-y-1">
                  {uniqueRegion.map((region) => (
                    <DropdownMenuCheckboxItem
                      key={region}
                      className="rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
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
          {!isLoading ? (
            currentItems.length > 0 ? (
              currentItems.map((e, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 w-full max-w-72 rounded-xl overflow-hidden mx-auto shadow-sm border border-transparent dark:border-gray-700"
                >
                  {/* Flag */}
                  <div className="h-36 sm:h-40 overflow-hidden relative">
                    <img
                      src={e.flags.svg}
                      className="w-full h-full object-cover brightness-95"
                    />
                    {/* <button className="z-10 absolute top-2 right-3    bg-red-400 rounded-xl p-2 flex items-center gap-1 text-white cursor-pointer shadow-md inset-shadow-2xs">
                      <Heart className="size-4" />
                      <span className="text-sm font-semibold">
                        Add to Wishlist
                      </span>
                    </button> */}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col justify-between h-37">
                    {/* Title */}
                    <div className="min-h-12">
                      <p className="font-extrabold text-[15px] leading-snug line-clamp-2 text-gray-900 dark:text-gray-100">
                        {e.name.official}
                      </p>
                    </div>

                    {/* Info */}
                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <p>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Population:
                        </span>{" "}
                        {e.population.toLocaleString()}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Region:
                        </span>{" "}
                        {e.region}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          Capital:
                        </span>{" "}
                        {e.capital}
                      </p>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="p-4 pt-0">
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
            )
          ) : (
            [...Array(8)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white w-full max-w-72 rounded-xl overflow-hidden mx-auto shadow-sm animate-pulse"
              >
                <div className="h-36 sm:h-40 bg-gray-200" />

                <div className="p-4 flex flex-col gap-3">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>

                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-5/6" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>

                <div className="h-9 bg-gray-200  mt-2" />
              </div>
            ))
          )}
        </section>

        <section className="flex flex-col items-center gap-3 mt-6">
          <div className="flex items-center gap-4 bg-white dark:bg-gray-800 px-5 py-2 rounded-full border dark:border-gray-700">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="disabled:text-gray-400"
            >
              <ArrowLeft />
            </button>

            <span className="text-sm text-gray-700 dark:text-gray-200">
              {currentPage} / {totalPage}
            </span>

            <button
              disabled={currentPage === totalPage}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="disabled:text-gray-400"
            >
              <ArrowRight />
            </button>
          </div>
        </section>
      </main>
    </section>
  );
};

export default DashboardComponent;
