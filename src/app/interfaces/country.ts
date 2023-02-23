export interface CountryResponse{
  Count: number;
  Data: Country[];
}

export interface Country{
  Code: string;
  Name: string;
  PhoneCode: string;
}
