import { validISOCountryCodes } from "./validISOCountryCodes";
import { validISOCurrencyCodes } from "./validISOCurrencyCodes";

type ValidatorFunction<T> = (value: T) => boolean;

interface Validators {
  source_amount: ValidatorFunction<number>[];
  source_currency: ValidatorFunction<string>[];
  source_country: ValidatorFunction<string>[];
  target_amount: ValidatorFunction<number>[];
  target_currency: ValidatorFunction<string>[];
  target_country: ValidatorFunction<string>[];
  concept: ValidatorFunction<string>[];
  sender_full_name: ValidatorFunction<string>[];
  receiver_full_name: ValidatorFunction<string>[];
}

export const isNonEmptyTrimmed = (value: string): boolean =>
  value.trim() !== "";

export const isValidISOCurrencyCode = (code: string): boolean => {
  return validISOCurrencyCodes.includes(code);
};

export const isvalidISOCountryCode = (code: string): boolean => {
  return validISOCountryCodes.includes(code);
};

export const isSourceDifferentFromTarget = (sourceCountry: string, targetCountry: string): boolean => {
  return sourceCountry !== targetCountry;
};

export const validators: Validators = {
  source_amount: [(value) => value !== null],
  source_currency: [
    (value) => isNonEmptyTrimmed(value),
    isValidISOCurrencyCode,
  ],
  source_country: [(value) => isNonEmptyTrimmed(value), isvalidISOCountryCode],
  target_amount: [(value) => value !== null],
  target_currency: [
    (value) => isNonEmptyTrimmed(value),
    isValidISOCurrencyCode,
  ],
  target_country: [(value) => isNonEmptyTrimmed(value), isvalidISOCountryCode],
  concept: [(value) => isNonEmptyTrimmed(value)],
  sender_full_name: [(value) => isNonEmptyTrimmed(value)],
  receiver_full_name: [(value) => isNonEmptyTrimmed(value)],
};

export const validateField = <T>(
  value: T,
  validators: ValidatorFunction<T>[]
): boolean => {
  return validators.every((validator) => validator(value));
};
