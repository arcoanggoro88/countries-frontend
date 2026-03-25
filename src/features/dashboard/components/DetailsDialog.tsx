import { Search } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import type { ICountryProps } from "../../../types/country";
import { ScrollArea } from "../../../components/ui/scroll-area";

const DetailsDialog = ({ country }: { country: ICountryProps }) => {
  console.log(country);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full rounded-lg bg-gray-900 hover:bg-black text-white text-sm transition cursor-pointer">
          <Search className="mr-2 size-4" />
          Show Detail
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] rounded-xl p-0 overflow-hidden">
        {/* Flag */}
        <div className="w-full h-48 bg-gray-100">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="h-[calc(90vh-12rem)]">
          <div className="p-6 space-y-4">
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900">
              {country.name.common}
            </h2>

            {/* Info */}
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-800">
                  Native Name:
                </span>{" "}
                {country.name.official}
              </p>

              <p>
                <span className="font-semibold text-gray-800">Population:</span>{" "}
                {country.population.toLocaleString()}
              </p>

              <p>
                <span className="font-semibold text-gray-800">Region:</span>{" "}
                {country.region}
              </p>

              <p>
                <span className="font-semibold text-gray-800">Sub Region:</span>{" "}
                {country.subregion}
              </p>

              <p>
                <span className="font-semibold text-gray-800">Capital:</span>{" "}
                {country.capital}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-gray-800">
                  Top Level Domain:
                </span>{" "}
                {country.tld.join(", ")}
              </p>

              <p>
                <span className="font-semibold text-gray-800">Currencies:</span>{" "}
                {Object.values(country.currencies)
                  .map((c) => c.name)
                  .join(", ")}
              </p>

              <p>
                <span className="font-semibold text-gray-800">Languages:</span>{" "}
                {Object.values(country.languages).join(", ")}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Languages:</span>{" "}
                {Object.values(country.languages).join(", ")}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Languages:</span>{" "}
                {Object.values(country.languages).join(", ")}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Languages:</span>{" "}
                {Object.values(country.languages).join(", ")}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Languages:</span>{" "}
                {Object.values(country.languages).join(", ")}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Languages:</span>{" "}
                {Object.values(country.languages).join(", ")}
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
