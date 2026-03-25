import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { ScrollArea } from "../../../components/ui/scroll-area";
import type { ICountryProps } from "../../../types/country";

export interface IBorderCountries {
  name: {
    common: string;
    official: string;
  };
}

const DetailsDialog = ({ country }: { country: ICountryProps }) => {
  const [open, setOpen] = useState(false);
  const [bordersCode, setBordersCode] = useState<string[]>([]);
  const [bordersCountry, setBordersCountry] = useState<IBorderCountries[]>([]);
  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (val) {
      setBordersCode(country.borders);
    }
  };

  useEffect(() => {
    if (!open) return;
    if (bordersCode.length === 0 || !bordersCode) return;
    const findBorders = async () => {
      try {
        const res = await axios.get(
          `https://restcountries.com/v3.1/alpha?codes=${bordersCode.join(",")}`,
        );

        setBordersCountry(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    findBorders();
  }, [bordersCode, open]);

  const bordersCountryList = bordersCountry.map((e) => e.name.common);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full rounded-lg bg-gray-900 dark:bg-gray-200 hover:bg-black dark:hover:bg-gray-300 text-white dark:text-black text-sm transition">
          <Search className="mr-2 size-4" />
          Show Detail
        </Button>
      </DialogTrigger>

      <DialogContent className="min-h-[90vh] min-w-fit p-0 overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {/* Flag */}
        <div className="w-full h-48 bg-gray-100 dark:bg-gray-800">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Scroll */}
        <ScrollArea className="h-[calc(90vh-12rem)]">
          <div className="p-6 space-y-5">
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {country.name.official}
            </h2>

            {/* Info utama */}
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Native Name:
                </span>{" "}
                {country.name.official}
              </p>

              <p>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Population:
                </span>{" "}
                {country.population.toLocaleString()}
              </p>

              <p>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Region:
                </span>{" "}
                {country.region}
              </p>

              <p>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Sub Region:
                </span>{" "}
                {country.subregion}
              </p>

              <p>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Capital:
                </span>{" "}
                {country.capital}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Top Level Domain:
                </span>{" "}
                {country.tld?.join(", ") || "-"}
              </p>

              <p>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Currencies:
                </span>{" "}
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((c) => c.name)
                      .join(", ")
                  : "-"}
              </p>

              <p>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Languages:
                </span>{" "}
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "-"}
              </p>

              {bordersCountryList.length > 0 && (
                <div className="flex items-center gap-2 text-wrap">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Borders:{" "}
                  </span>
                  <div className="flex items-center gap-2">
                    {bordersCountryList.map((e) => (
                      <div className="flex gap-2">
                        <p className="bg-gray-300 dark:text-black rounded-md px-2 py-1 mx-">
                          {e}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
