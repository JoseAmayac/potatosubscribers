export interface SubscriberCreate{
  Name: string;
  Email?: string;
  CountryCode?: any;
  PhoneNumber?: string;
  JobTitle: string;
  Area: string;
  Topics: any[];
}

export interface SubscriberUpdate extends SubscriberCreate {
  Id: number;
}
