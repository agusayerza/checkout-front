/* eslint-disable prettier/prettier */

  export interface CartState {
    items : Items[],
    total: number
  }

  export interface Items {
    id: number,
    title: string,
    desc: string,
    price: number
  }