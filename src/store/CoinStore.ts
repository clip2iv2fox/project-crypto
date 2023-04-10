import axios from "axios";
import { makeAutoObservable } from "mobx";

export interface Coins {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: string;
  price_change_24h: string;
  price_change_percentage_24h: string;
  market_cap: string;
  fully_diluted_valuation?: string;
  circulating_supply: string;
  total_supply?: string;
  max_supply?: string;
  description?: string;
}

class CoinStore {
  coins: Coins[] = [];
  loading: boolean = true;
  error: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchCoins() {
    try {
      const result = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
      this.coins = result.data.map((coin: Coins) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        image: coin.image,
        current_price: coin.current_price,
        price_change_percentage_24h: coin.price_change_percentage_24h,
      }));
      this.loading = false;
      this.error = false;
    } catch (error) {
      this.loading = false;
      this.error = true;
    }
  }
}

export default new CoinStore();
