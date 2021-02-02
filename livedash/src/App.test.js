import { render, screen } from '@testing-library/react';
import App from './App';

test('renders some link', () => {
  render(<App />);
  const linkElement = screen.getByText(/some link/i);
  expect(linkElement).toBeInTheDocument();
});
