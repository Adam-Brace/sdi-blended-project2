import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Search from './Search';

// Mock fetch
global.fetch = vi.fn();

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
};

// Mock PokemonCard component
vi.mock('../Card/PokemonCard', () => ({
  __esModule: true,
  default: ({ props }) => <div>{props.name}</div>,
}));

describe('Search Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/search/undefined']}>
        <Routes>
          <Route path="/search/:query" element={<Search />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('shows loading spinner while fetching Pokémon', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockPokemon),
    });

    render(
      <MemoryRouter initialEntries={['/search/undefined']}>
        <Routes>
          <Route path="/search/:query" element={<Search />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });


  it('displays message when no Pokémon is found', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.reject('Error fetching Pokémon'),
    });

    render(
      <MemoryRouter initialEntries={['/search/notapokemon']}>
        <Routes>
          <Route path="/search/:query" element={<Search />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('pokemon not found')).toBeInTheDocument();
    });
  });
});
