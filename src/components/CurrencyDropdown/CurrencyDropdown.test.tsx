import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrencyDropdown from './CurrencyDropdown';

describe('<CurrencyDropdown />', () => {
  test('it should mount', () => {
    render(<CurrencyDropdown id="test" onChange={() => {}}  availableCurrencies={ {
      "GBP": "United Kingdom Pound",
      "PLN": "Polish Zloty"
    }} selectedCurrencyCode={"PLN"} />);
    
    const currencyDropdown = screen.getByTestId('CurrencyDropdown');

    expect(currencyDropdown).toBeInTheDocument();
  });
});