export interface LoginResponse {
  Status: number;
  Token: string;
  Message?: any;
  TwoFactorType?: any;
  AllowedTwoFactorTypes?: any;
  Permissions: Permission[];
  Features: Feature[];
  Locations: any[];
  LastLocationId: number;
  Preferences: any[];
  UserType: string;
  Email: string;
  FirstName: string;
  LastName: string;
  CompanyName: string;
  TimeZoneInfo?: any;
  RefreshToken: string;
}

export interface Permission {
  M: string;
  D: string;
}

export interface Feature {
  M: string;
  F: string;
}
