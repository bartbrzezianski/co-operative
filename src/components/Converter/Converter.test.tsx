import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Converter from './Converter';

describe('<Converter />', () => {
  test('it should mount', () => {
    render(<Converter />);
    
    const converter = screen.getByTestId('Converter');

    expect(converter).toBeInTheDocument();
  });
});