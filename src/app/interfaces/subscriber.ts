import { SubscriberCreate } from "./subscriber-create";

export interface SubscriberResponse{
  Count: number;
  Data: Subscriber[]
}
export interface Subscriber extends SubscriberCreate{
  SystemId?: any;
  PublicId: number;
  CountryName: string;
  EndpointsCount: number;
  PhoneCode: string;
  PhoneCodeAndNumber: string;
  LastActivityUtc?: any;
  LastActivity?: any;
  LastActivityString?: any;
  SubscriptionDate?: any;
  SubscriptionMethod: number;
  SubscriptionState: number;
  SubscriptionStateDescription: string;
  ValidEmail: boolean;
  Activity: string;
  ConnectionState: number;
  Id: number;
}
