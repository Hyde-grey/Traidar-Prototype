/**
 * Represents a cryptocurrency asset with price information
 */
export interface Asset {
  symbol: string;
  name: string;
  exchange: string;
  iconUrl: string;
  price: number;
  priceChangePercent: number;
}
