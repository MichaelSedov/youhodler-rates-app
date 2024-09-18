export interface CurrencyData {
  rate: number;
  ask: number;
  bid: number;
  diff24h: number;
}

export interface CurrencyWithSymbol extends CurrencyData {
  symbol: string;
}

export interface CryptoRates {
  [key: string]: {
    [key: string]: CurrencyData;
  };
}

export enum SortType {
  SYMBOL = "symbol",
  RATE = "rate",
}