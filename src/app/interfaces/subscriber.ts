export interface SubscriberResponse{
  Count: number;
  Data: Subscriber[]
}

export interface Subscriber {
  SystemId?: any;
  Area: string;
  PublicId: number;
  CountryCode?: any;
  CountryName: string;
  Name: string;
  EndpointsCount: number;
  Email: string;
  JobTitle: string;
  PhoneNumber: string;
  PhoneCode: string;
  PhoneCodeAndNumber: string;
  LastActivityUtc?: any;
  LastActivity?: any;
  LastActivityString?: any;
  SubscriptionDate?: any;
  SubscriptionMethod: number;
  SubscriptionState: number;
  SubscriptionStateDescription: string;
  Topics: any[];
  ValidEmail: boolean;
  Activity: string;
  ConnectionState: number;
  Id: number;
}
