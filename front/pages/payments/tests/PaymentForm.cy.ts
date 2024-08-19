// cypress/component/PaymentForm.cy.ts
import { mount } from '@cypress/vue';
import PaymentForm from '../PaymentForm.vue';
import i18n from '../../../i18n.config';

// TODO::: These tests are not working for the moment, we need to check further configuration in cypress. Too time consuming for now.

describe('Payment Form Component', () => {
  beforeEach(() => {
    mount(PaymentForm, {
      global: {
        plugins: [i18n],
      },
    });
  });

  it('should display the form title based on mode', () => {
    mount(PaymentForm, {
      global: {
        plugins: [i18n],
      },
      props: {
        mode: 'add',
        initialPayment: {
          source_amount: null,
          source_currency: '',
          source_country: '',
          target_amount: null,
          target_currency: '',
          target_country: '',
          concept: '',
          sender_full_name: '',
          receiver_full_name: ''
        }
      }
    });
    cy.contains('Add Payment').should('be.visible');
  });

  it('should show validation errors for required fields', () => {
    mount(PaymentForm, {
      global: {
        plugins: [i18n],
      },
    });
    cy.get('button[type="submit"]').click();
    cy.get('.text-red-500').should('have.length', 9);
  });

  it('should validate source amount input', () => {
    mount(PaymentForm, {
      global: {
        plugins: [i18n],
      },
    });
    cy.get('#sourceAmount').type('100').should('have.value', '100');
    cy.get('#sourceAmount').clear().type('-10').should('have.value', '-10');
    cy.get('.text-red-500').should('contain.text', 'Amount must be positive.');
  });

  it('should validate ISO currency codes', () => {
    mount(PaymentForm, {
      global: {
        plugins: [i18n],
      },
    });
    cy.get('#sourceCurrency').select('USD').should('have.value', 'USD');
    cy.get('#sourceCurrency').select('INVALID').should('not.have.value', 'INVALID');
    cy.get('.text-red-500').should('contain.text', 'Please, insert a correct ISO currency code.');
  });

  it('should validate ISO country codes', () => {
    mount(PaymentForm, {
      global: {
        plugins: [i18n],
      },
    });
    cy.get('#sourceCountry').select('US').should('have.value', 'US');
    cy.get('#sourceCountry').select('INVALID').should('not.have.value', 'INVALID');
    cy.get('.text-red-500').should('contain.text', 'Please, insert a correct ISO country code.');
  });

  it('should show an error if source and target countries are the same', () => {
    mount(PaymentForm, {
      global: {
        plugins: [i18n],
      },
    });
    cy.get('#sourceCountry').select('US');
    cy.get('#targetCountry').select('US');
    cy.get('.text-red-500').should('contain.text', 'Source country must be different from target country.');
  });

  it('should enable the submit button when the form is valid', () => {
    mount(PaymentForm, {
      global: {
        plugins: [i18n],
      },
      props: {
        mode: 'add',
        initialPayment: {
          source_amount: 100,
          source_currency: 'USD',
          source_country: 'US',
          target_amount: 200,
          target_currency: 'EUR',
          target_country: 'FR',
          concept: 'Payment for services',
          sender_full_name: 'John Doe',
          receiver_full_name: 'Jane Doe'
        }
      }
    });
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('should show a spinner when form is being submitted', () => {
    mount(PaymentForm, {
      global: {
        plugins: [i18n],
      },
      props: {
        mode: 'add',
        initialPayment: {
          source_amount: 100,
          source_currency: 'USD',
          source_country: 'US',
          target_amount: 200,
          target_currency: 'EUR',
          target_country: 'FR',
          concept: 'Payment for services',
          sender_full_name: 'John Doe',
          receiver_full_name: 'Jane Doe'
        }
      }
    });
    cy.get('button[type="submit"]').click();
    cy.get('.spinner').should('exist');
  });
});
