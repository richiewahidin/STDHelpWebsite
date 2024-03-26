import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CountiesCard from '../src/pages/ModelOne/CountiesCard';

describe('CountiesCard', () => {
  const mockItem = {
    name: 'Mock County',
    img: 'mock_image_url',
    population: 100000,
    ccases: 50,
    gcases: 20,
    scases: 10
  };

  it('renders county name correctly', () => {
    render(<CountiesCard item={mockItem} />);
    expect(screen.getByText('Mock County')).toBeInTheDocument();
  });

  it('renders population correctly', () => {
    render(<CountiesCard item={mockItem} />);
    expect(screen.getByText('Population: 100000')).toBeInTheDocument();
  });

  it('renders ccases correctly', () => {
    render(<CountiesCard item={mockItem} />);
    expect(screen.getByText(/Chlamydia: 50/)).toBeInTheDocument();
  });
});
