import { useMemo } from "react";
import { CurrencyWithSymbol } from "../store/store";  // Импортируй типы, если они находятся в отдельном файле

type SortType = "symbol" | "rate";

export const useFilteredRates = (
  rates: CurrencyWithSymbol[],
  searchQuery: string,
  sortType: SortType
) => {
  return useMemo(() => {
    let filteredRates = rates;

    if (searchQuery.trim()) {
      filteredRates = filteredRates.filter((item) =>
        item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const sortedRates = filteredRates.slice().sort((a, b) => {
      if (sortType === "symbol") {
        return a.symbol.localeCompare(b.symbol);
      }
      return Number(b.rate) - Number(a.rate);
    });

    return sortedRates;
  }, [rates, searchQuery, sortType]);
};