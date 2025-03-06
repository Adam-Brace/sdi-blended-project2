import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderWithRouter = (route) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
};

describe('App Component Routing', () => {


  it('renders Wishlist component for /wishlist route', async () => {
    renderWithRouter('/wishlist');
    expect(await screen.findByRole('heading', { name: /wishlist/i })).toBeInTheDocument();
  });

  it('renders Collection component for /collection route', async () => {
    renderWithRouter('/collection');
    expect(await screen.findByRole('heading', { name: /collection/i })).toBeInTheDocument();
  });




});
