import { CurrencyWithSymbol } from "../../types";

export type RootStackParamList = {
  Home: undefined;
  Details: {
    symbol: string;
    data: CurrencyWithSymbol;
  };
};