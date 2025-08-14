import { ComponentRef } from "@angular/core";
import { SaffronMessageComponent } from "../saffron-message.component";

export type SaffronSuccessMessageType = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';


export interface SaffronMessageModel {
  background: string;
  textColor: string;
  icon?: string;
  title: string;
  message: string;
  messgeType: SaffronSuccessMessageType;
  positionType?: 'absolute' | 'unset',
  time?: number,
  componentRef?: ComponentRef<any>
}

export const SaffronSuccessMessage: SaffronMessageModel = {
  background: '#e4f8f0b3',
  textColor: '#1ea97c',
  icon: 'check',
  title: 'موفقیت',
  message: 'متن پیغام',
  messgeType: "success"
}

export const SaffronInfoMessage: SaffronMessageModel = {
  background: '#dbeafeb3',
  textColor: '#3b82f6',
  icon: 'info',
  title: 'اطلاعات',
  message: 'متن پیغام',
  messgeType: "info"
}

export const SaffronWarnMessage: SaffronMessageModel = {
  background: '#e4f8f0b3',
  textColor: '#1ea97c',
  icon: 'warning',
  title: 'هشدار',
  message: 'متن پیغام',
  messgeType: "warn"
}

export const SaffronErrorMessage: SaffronMessageModel = {
  background: '#e4f8f0b3',
  textColor: '#1ea97c',
  icon: 'report',
  title: 'خطا',
  message: 'متن پیغام',
  messgeType: "error"
}

export const SaffronSecondaryMessage: SaffronMessageModel = {
  background: '#e4f8f0b3',
  textColor: '#1ea97c',
  icon: undefined,
  title: 'ثانویه',
  message: 'متن پیغام',
  messgeType: "secondary"
}

export const SaffronContrastMessage: SaffronMessageModel = {
  background: '#e4f8f0b3',
  textColor: '#1ea97c',
  icon: undefined,
  title: 'تضاد',
  message: 'متن پیغام',
  messgeType: "contrast"
}
