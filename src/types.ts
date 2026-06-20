export interface MaterialProduct {
  id: string;
  category: string;
  nameFA: string;
  nameEN: string;
  descriptionFA: string;
  descriptionEN: string;
  unitFA: string;
  unitEN: string;
  pricePerUnitTomans: number; // In Tomans (Iranian currency metric)
  densityKGperM3?: number;   // Used for physical dimensional calculations
  packWeightKG?: number;     // e.g. 50kg cement bag
  coverageM2PerUnit?: number; // visual coverage helper
  imageUrl: string;
  featured?: boolean;
  specifications: {
    labelFA: string;
    labelEN: string;
    valueFA: string;
    valueEN: string;
  }[];
}

export interface ProjectCalculatorType {
  id: string;
  icon: string;
  nameFA: string;
  nameEN: string;
  descriptionFA: string;
  descriptionEN: string;
  formulaDescriptionFA: string;
  formulaDescriptionEN: string;
  // inputs needed for dimensions
  inputs: {
    id: string;
    labelFA: string;
    labelEN: string;
    unitFA: string;
    unitEN: string;
    defaultValue: number;
    placeholder: string;
  }[];
}

export interface QuoteItem {
  productId: string;
  quantity: number;
  customNotes?: string;
}

export interface QuoteInquiry {
  fullName: string;
  phoneNumber: string;
  deliveryLocation: string;
  urgency: 'routine' | 'urgent' | 'future';
  selectedItems: QuoteItem[];
}
