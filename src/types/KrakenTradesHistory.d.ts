interface KrakenTrade {
  ordertxid: string;  // Order responsible for execution of trade
  postxid: string;   // Position (if applicable) responsible for execution of trade
  pair: string;      // Asset pair
  time: number;      // Unix timestamp of trade
  type: string;      // Type of order (buy/sell)
  ordertype: string; // Order type
  price: string;     // Average price order was executed at (quote currency)
  cost: string;      // Total cost of order (quote currency)
  fee: string;       // Total fee (quote currency)
  vol: string;       // Volume (base currency)
  margin: string;    // Initial margin (quote currency)
  leverage: string;  // Leverage level
  misc: string;      // Closing order info (if any)
  trade_id: number;  // Trade ID
  posstatus: string; // Position status (if applicable)
  cprice: null;      // Average close price (quote currency, null if not applicable to trade)
  ccost: null;       // Total cost of close (quote currency, null if not applicable to trade)
  cfee: null;        // Total fee of close (quote currency, null if not applicable to trade)
  cvol: null;        // Total volume of close (quote currency, null if not applicable to trade)
  cmargin: null;     // Total margin freed in close (quote currency, null if not applicable to trade)
  net: null;         // Net profit/loss of trade (quote currency, null if not applicable to trade)
  trades: string[];  // Array of trade IDs (if any) that were combined to make this trade
}

interface KrakenTrades {
  [txid: string]: KrakenTrade;
}

export interface KrakenTradesHistory {
  count: number;
  trades: KrakenTrades;
}