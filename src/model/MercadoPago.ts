export interface SecurityCode {
  mode: string;
  card_location: string;
  length: number;
}

export interface CardNumber {
  length: number;
  validation: string;
}

export interface Bin {
  pattern: string;
  installments_pattern: string;
  exclusion_pattern?: any;
}

export interface Setting {
  security_code: SecurityCode;
  card_number: CardNumber;
  bin: Bin;
}

export interface MPMethodIdResponse {
  id: string;
  name: string;
  payment_type_id: string;
  status: string;
  secure_thumbnail: string;
  thumbnail: string;
  deferred_capture: string;
  settings: Setting[];
  additional_info_needed: string[];
  min_allowed_amount: number;
  max_allowed_amount: number;
  accreditation_time: number;
  financial_institutions: any[];
  processing_modes: string[];
}

export interface Issuer {
  id: string;
  name: string;
  secure_thumbnail: string;
  thumbnail: string;
}

export interface PayerCost {
  installments: number;
  installment_rate: number;
  discount_rate: number;
  reimbursement_rate?: any;
  labels: string[];
  installment_rate_collector: string[];
  min_allowed_amount: number;
  max_allowed_amount: number;
  recommended_message: string;
  installment_amount: number;
  total_amount: number;
  payment_method_option_id: string;
}

export interface MPInstallmentsResponse {
  id: string;
  payment_method_id: string;
  payment_type_id: string;
  issuer: Issuer;
  processing_mode: string;
  merchant_account_id?: any;
  payer_costs: PayerCost[];
  agreements?: any;
}