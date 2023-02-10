// Ticker
export interface GetTickerRequest {
  pair: string;
}

// Depth
export interface GetDepthRequest {
  pair: string;
}

// Transactions
export interface GetTransactionsRequest {
  pair: string;
  yyyymmdd?: string;
}

// Candlestick
export interface GetCandleStickRequest {
  pair: string;
  candleType: string;
  yyyymmdd: string;
}

// Order
export interface GetOrderRequest {
  order_id: number;
  pair: string;
}

export interface OrderRequest {
  pair: string;
  amount: string;
  price?: number | string;
  side: string;
  type: string;
  post_only?: boolean;
  trigger_price?: number | string;
}

export interface CancelOrderRequest {
  order_id: number;
  pair: string;
}

export interface CancelOrdersRequest {
  order_ids: number[];
  pair: string;
}

export interface GetOrdersRequest {
  order_ids: number[];
  pair: string;
}

export interface ActiveOrderRequest {
  pair?: string;
  count?: number;
  from_id?: number;
  end_id?: number;
  since?: number;
  end?: number;
}

// Trade
export interface TradeHistoryRequest {
  pair?: string;
  count?: number;
  order_id?: number;
  since?: number;
  end?: number;
  order?: 'asc' | 'desc';
}

// Deposit
export interface DepositHistoryRequest {
  asset: string;
  count?: number;
  since?: number;
  end?: number;
  order?: 'asc' | 'desc';
}

// Withdraw
export interface WithdrawalHistoryRequest {
  asset: string;
  count?: number;
  since?: number;
  end?: number;
  order?: 'asc' | 'desc';
}

export interface WithdrawalAccountRequest {
  asset: string;
}

export interface WithdrawalRequest {
  asset: string;
  amount: string;
  uuid: string;
  otp_token?: string;
  sms_token?: string;
}
