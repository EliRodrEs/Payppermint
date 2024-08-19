import {
    isNonEmptyTrimmed,
    isValidISOCurrencyCode,
    isvalidISOCountryCode,
    isSourceDifferentFromTarget,
    validators,
    validateField,
  } from '../validators';
  import { validISOCountryCodes } from '../validISOCountryCodes';
  import { validISOCurrencyCodes } from '../validISOCurrencyCodes';
  
  describe('Validators Module', () => {
    describe('isNonEmptyTrimmed', () => {
      it('should return true for a non-empty, trimmed string', () => {
        expect(isNonEmptyTrimmed('valid')).to.be.true;
      });
  
      it('should return false for an empty string', () => {
        expect(isNonEmptyTrimmed('')).to.be.false;
      });
  
      it('should return false for a string with only spaces', () => {
        expect(isNonEmptyTrimmed('   ')).to.be.false;
      });
    });
  
    describe('isValidISOCurrencyCode', () => {
      it('should return true for a valid ISO currency code', () => {
        const validCode = validISOCurrencyCodes[0];
        expect(isValidISOCurrencyCode(validCode)).to.be.true;
      });
  
      it('should return false for an invalid ISO currency code', () => {
        expect(isValidISOCurrencyCode('INVALID')).to.be.false;
      });
    });
  
    describe('isvalidISOCountryCode', () => {
      it('should return true for a valid ISO country code', () => {
        const validCode = validISOCountryCodes[0];
        expect(isvalidISOCountryCode(validCode)).to.be.true;
      });
  
      it('should return false for an invalid ISO country code', () => {
        expect(isvalidISOCountryCode('INVALID')).to.be.false;
      });
    });
  
    describe('isSourceDifferentFromTarget', () => {
      it('should return true if source and target countries are different', () => {
        expect(isSourceDifferentFromTarget('US', 'CA')).to.be.true;
      });
  
      it('should return false if source and target countries are the same', () => {
        expect(isSourceDifferentFromTarget('US', 'US')).to.be.false;
      });
    });
  
    describe('validateField', () => {
      it('should return true if all validators pass', () => {
        const result = validateField('USD', validators.source_currency);
        expect(result).to.be.true;
      });
  
      it('should return false if any validator fails', () => {
        const result = validateField('INVALID', validators.source_currency);
        expect(result).to.be.false;
      });
    });
  
    describe('Validators Object', () => {
      it('should validate source amount correctly', () => {
        const result = validateField(100, validators.source_amount);
        expect(result).to.be.true;
      });
  
      it('should invalidate source amount if null', () => {
        const value: number | null = null;
        const result = value !== null ? validateField(value, validators.source_amount) : false;
        expect(result).to.be.false;
      });
      
  
      it('should validate source currency correctly', () => {
        const validCurrency = validISOCurrencyCodes[0];
        const result = validateField(validCurrency, validators.source_currency);
        expect(result).to.be.true;
      });
  
      it('should invalidate source currency if invalid', () => {
        const result = validateField('INVALID', validators.source_currency);
        expect(result).to.be.false;
      });
  
      it('should validate source country correctly', () => {
        const validCountry = validISOCountryCodes[0];
        const result = validateField(validCountry, validators.source_country);
        expect(result).to.be.true;
      });
  
      it('should invalidate source country if invalid', () => {
        const result = validateField('INVALID', validators.source_country);
        expect(result).to.be.false;
      });
  
      it('should validate concept correctly', () => {
        const result = validateField('Payment for services', validators.concept);
        expect(result).to.be.true;
      });
  
      it('should invalidate concept if empty', () => {
        const result = validateField('', validators.concept);
        expect(result).to.be.false;
      });
  
      it('should validate sender full name correctly', () => {
        const result = validateField('John Doe', validators.sender_full_name);
        expect(result).to.be.true;
      });
  
      it('should invalidate sender full name if empty', () => {
        const result = validateField('', validators.sender_full_name);
        expect(result).to.be.false;
      });
  
      it('should validate receiver full name correctly', () => {
        const result = validateField('Jane Doe', validators.receiver_full_name);
        expect(result).to.be.true;
      });
  
      it('should invalidate receiver full name if empty', () => {
        const result = validateField('', validators.receiver_full_name);
        expect(result).to.be.false;
      });
    });
  });
  