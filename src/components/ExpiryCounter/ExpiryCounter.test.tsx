import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExpiryCounter from './ExpiryCounter';

describe('<ExpiryCounter />', () => {
  test('it should mount', () => {
    render(<ExpiryCounter timerExpired={() => {}}/>);
    
    const expiryCounter = screen.getByTestId('ExpiryCounter');

    expect(expiryCounter).toBeInTheDocument();
  });
});