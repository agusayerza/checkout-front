
  
  export interface Id {
    id: number;
  }

  export interface Address {
      id: number;
      height: number;
      streetName: string;
      cityName: string;
      province: string;
      postalCode: number;
  }

  export interface User {
      id: number;
      name: string;
      surname: string;
      addresses: Address[];
  }

  export interface ProductDto {
    id: number;
    productName: string;
    addressDto: Address;
    userDto: User;
}
  
  export interface Product {
    id: number;
    value: number;
    productDto: ProductDto;
    dateTime: Date;
  }

  export interface Item {
    id: number;
    desc: string,
    name: string
  }

  export interface Delivery {
    id: number;
    deliveryCost: number;
    toDto: Address;
    fromDto: Address;
    productDto: ProductDto;
  }
  
  export interface Checkout {
    id: number;
    productDeliveryDtoList: Delivery[];
    valuedProductDtosList: Product[];
  }

  export type Payment = {
    userId: number,
    checkoutId: number,
    issuerId?: string,
    transaction_amount?: number,
    token?: string,
    description?: string,
    installments?: number,
    payment_method_id?: string,
    payer?: {
      email?: string
    }
  }

  export type SaleDto = {
    success: boolean,
    message: string
  }

  export interface Order {
    id: number;
    userId: number;
    checkOutId: number;
    localDateTime: Date;
    success: boolean;
    message: string;
}

export interface ToDto {
  id: number;
  height: number;
  streetName: string;
  cityName: string;
  province: string;
  postalCode: number;
}

export interface FromDto {
  id: number;
  height: number;
  streetName: string;
  cityName: string;
  province: string;
  postalCode: number;
}

export interface AddressDto {
  id: number;
  height: number;
  streetName: string;
  cityName: string;
  province: string;
  postalCode: number;
}

export interface ProductDeliveryDtoList {
  id: number;
  deliveryCost: number;
  toDto: ToDto;
  fromDto: FromDto;
  productDto: ProductDto;
}

export interface ValuedProductDtosList {
  id: number;
  value: number;
  productDto: ProductDto;
  dateTime: Date;
}

export interface FullCheckout {
  id: number;
  productDeliveryDtoList: ProductDeliveryDtoList[];
  valuedProductDtosList: ValuedProductDtosList[];
}


