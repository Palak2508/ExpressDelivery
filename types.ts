
export enum BookingStep {
  DETAILS = 0,
  PACKAGE = 1,
  SUMMARY = 2,
  CHECKOUT = 3,
  CONFIRMATION = 4,
  TRACKING = 5
}

export interface AddressInfo {
  pickup: string;
  drop: string;
  instructions: string;
}

export interface PackageInfo {
  type: 'Small' | 'Medium' | 'Large';
  weight: number;
  isExpress: boolean;
}

export interface UserInfo {
  name: string;
  phone: string;
}

export interface BookingState {
  address: AddressInfo;
  package: PackageInfo;
  user: UserInfo;
  pricing: {
    base: number;
    distance: number;
    expressSurcharge: number;
    total: number;
  };
  bookingId?: string;
}
