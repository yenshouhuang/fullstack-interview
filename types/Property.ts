// types/Property.ts
export interface Property {
    id: number;
    propertyId: string;
    propertyName: string;
    marketingName: string;
    address: {
      fullAddress: string;
      city: string;
      stateCode: string;
      postalCode: string;
      latitude: number;
      longitude: number;
    };
    images: { url: string; tag: string }[];
    pricing: {
      monthlyPricing: { name: string; months: number; amount: number }[];
      minimumPrice: number;
      maximumPrice: number;
    };
    availableDate: string;
  }
  
