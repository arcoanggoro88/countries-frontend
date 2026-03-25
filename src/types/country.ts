export interface ICountryProps {
  borders: string[];
  capital: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  name: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
  subregion: string;
  tld: string[];
  flags: {
    svg: string;
    png: string;
  };
}
