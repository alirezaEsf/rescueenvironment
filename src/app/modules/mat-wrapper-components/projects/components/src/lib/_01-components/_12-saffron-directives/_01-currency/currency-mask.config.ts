import {InjectionToken} from "@angular/core";

export interface CurrencyMaskConfig {
  align: string;
  allowNegative: boolean;
  allowZero: boolean;
  decimal: string;
  precision: number;
  prefix: string;
  suffix: string;
  thousands: string;
  nullable: boolean;
  min?: number;
  max?: number;
  inputMode? : CurrencyMaskInputMode;
}

export enum CurrencyMaskInputMode {
  FINANCIAL,
  NATURAL,
}

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  allowZero: true,
  decimal: '',
  precision: 0,
  prefix: '',
  suffix: '',
  thousands: ',',
  nullable: true,
  min: null!,
  max: null!,
  inputMode: CurrencyMaskInputMode.FINANCIAL,
};

export const CURRENCY_MASK_CONFIG = new InjectionToken<CurrencyMaskConfig>("currency.mask.config", {
  providedIn: 'root',
  factory: () => ({
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ".",
    precision: 0/* 2 */,
    prefix: ""/* "$ " */,
    suffix: "",
    thousands: ",",
    nullable: false,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  })
});
