// root
export interface Response<T> {
  success: number;
  data: T;
}

// Ticker
export interface TickerResponse {
  sell: string | null;
  buy: string | null;
  high: string | null;
  low: string | null;
  last: string | null;
  vol: string;
  timestamp: number;
}

// Depth
export interface DepthResponse {
  asks: [string, string][];
  bids: [string, string][];
}

// Transactions
export interface TransactionsResponse {
  transactions: TransactionResponse[];
}

export interface TransactionResponse {
  transaction_id: number;
  side: string;
  price: string;
  amount: string;
  executed_at: number;
}

// Candlestick
export interface CandlestickResponse {
  candlestick: CandleWithTypeResponse[];
  timestamp: number;
}

export interface CandleWithTypeResponse {
  type: string;
  ohlcv: string[];
}

// Assets
export interface AssetsResponse {
  assets: AssetResponse[];
}

export interface AssetResponse {
  asset: string;
  amount_precision: number;
  onhand_amount: string;
  locked_amount: string;
  free_amount: string;
  stop_deposit: boolean;
  stop_withdrawal: boolean;
  withdrawal_fee: any;
}

// Order
export interface OrderResponse {
  order_id: number;
  pair: string;
  side: string;
  type: string;
  start_amount: string;
  remaining_amount: string;
  executed_amount: string;
  price?: string;
  post_only?: boolean;
  average_price: string;
  ordered_at: number;
  expire_at: number | null;
  status: string;
}

// Cancel Order
export interface CancelOrderResponse extends OrderResponse {
  canceled_at: number;
}

export interface OrdersResponse {
  orders: (OrderResponse | CancelOrderResponse)[];
}

export interface CancelOrdersResponse {
  orders: CancelOrderResponse[];
}

export interface ActiveOrdersResponse {
  orders: OrderResponse[];
}

// Trade
export interface TradeHistoryResponse {
  trades: TradeResponse[];
}

export interface TradeResponse {
  trade_id: number;
  pair: string;
  order_id: number;
  side: string;
  type: string;
  amount: string;
  price: string;
  maker_taker: string;
  fee_amount_base: string;
  fee_amount_quote: string;
  executed_at: number;
}

// Withdraw
export interface WithdrawalAccountResponse {
  accounts: Array<{
    uuid: string;
    label: string;
    address: string;
  }>;
}

export interface WithdrawalResponse {
  uuid: string;
  asset: string;
  amount: number;
  account_uuid: string;
  fee: string;
  status: string;
  label: string;
  txid: string;
  address: string;
}
