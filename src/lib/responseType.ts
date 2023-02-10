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
  open: string | null;
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
  expire_at: number;
  triggered_at?: number;
  trigger_price?: string;
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

// Deposit
export interface DepositResponse {
  uuid: string;
  asset: string;
  amount: string;

  txid?: string | null;  // only for cryptocurrencies.

  found_at: number;
  confirmed_at?: number;  // only when confirmed.
  status: string;
}

export interface DepositHistoryResponse {
  deposits: DepositResponse[];
}

// Withdraw
export interface WithdrawalAccountResponse {
  accounts: {
    uuid: string;
    label: string;
    address: string;
  }[];
}

export interface WithdrawalResponse {
  uuid: string;
  asset: string;
  account_uuid: string;
  amount: string;
  fee: string;

  // they are only for fiat.
  bank_name?: string;
  branch_name?: string;
  account_type?: string;
  account_number?: string;
  account_owner?: string;

  // they are only for cryptocurrencies.
  label?: string;
  address?: string;
  txid?: string | null;
  destination_tag?: number | string; // only for some cryptocurrencies.

  status: string;
  requested_at: number;
}

export interface WithdrawalHistoryResponse {
  withdrawals: WithdrawalResponse[];
}
