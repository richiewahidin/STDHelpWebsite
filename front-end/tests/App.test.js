import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders learn react link', () => {
  render(<App />);
  const linkElements = screen.getAllByText(/STDHelp/i); // This will get all elements with "STDHelp"
  expect(linkElements.length).toBeGreaterThan(0); // This checks that there's at least one element
});

