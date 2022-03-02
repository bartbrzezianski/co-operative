import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrencyDropdownItem from './CurrencyDropdownItem';

describe('<CurrencyDropdownItem />', () => {
  test('it should mount', () => {
    render(<CurrencyDropdownItem currencyName="British Pound" currencyCode="GBP" onClick={() => {}}/>);
    
    const currencyDropdownItem = screen.getByTestId('CurrencyDropdownItem');

    expect(currencyDropdownItem).toBeInTheDocument();
  });
});