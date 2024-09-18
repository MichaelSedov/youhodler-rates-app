import { makeAutoObservable, action } from "mobx";
import axios, { CancelTokenSource } from "axios";
import { CryptoRates, CurrencyWithSymbol } from "../types";

class AppStore {
  rates: CurrencyWithSymbol[] = [];
  loading: boolean = false;
  error: string = "";
  cancelTokenSource: CancelTokenSource | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchCryptoRates = action(async () => {
    this.loading = true;
    this.cancelTokenSource = axios.CancelToken.source();

    try {
      const response = await axios.get<CryptoRates>('https://app.youhodler.com/api/v3/rates/extended', { cancelToken: this.cancelTokenSource.token });
      const usdRates = Object.entries(response.data)
        .map(([cryptoSymbol, rates]) => {
          const usdRate = rates['usd'];
          if (usdRate) {
            return { symbol: cryptoSymbol, ...usdRate };
          }
          return null;
        })
        .filter(Boolean);

      this.rates = usdRates as CurrencyWithSymbol[];
      this.error = "";
    } catch (error) {
      this.error = "Failed to load data";
    } finally {
      this.loading = false;
    }
  });
    

  cancelRequest() {
    if (this.cancelTokenSource) {
      this.cancelTokenSource.cancel("Operation cancelled by the user.");
    }
  }
}

const appStore = new AppStore();
export default appStore;
