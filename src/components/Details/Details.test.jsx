import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from './Details';

// Mock fetch
const mockPokemonData = {
    id: 1,
    name: 'bulbasaur',
    sprites: {
        front_default: 'https://example.com/bulbasaur.png',
        front_shiny: 'https://example.com/bulbasaur_shiny.png'
    },
    types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
    stats: [{ stat: { name: 'hp' }, base_stat: 45 }],
    moves: [{ move: { name: 'tackle' } }],
    height: 7,
    weight: 69
};

const mockSpeciesData = {
    flavor_text_entries: [
        { language: { name: 'en' }, flavor_text: 'A strange seed was planted on its back at birth.' }
    ]
};

vi.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url.includes('pokemon-species')) {
        return Promise.resolve({ json: () => Promise.resolve(mockSpeciesData) });
    }
    return Promise.resolve({ json: () => Promise.resolve(mockPokemonData) });
});

// Test Suite
describe('Details Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state initially', () => {
        render(
            <MemoryRouter initialEntries={['/details/1']}>
                <Routes>
                    <Route path="/details/:id" element={<Details />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('fetches and displays Pokémon details', async () => {
        render(
            <MemoryRouter initialEntries={['/details/1']}>
                <Routes>
                    <Route path="/details/:id" element={<Details />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
            expect(screen.getByText(/height: 7/i)).toBeInTheDocument();
            expect(screen.getByText(/weight: 69/i)).toBeInTheDocument();
            expect(screen.getByText(/tackle/i)).toBeInTheDocument();
            expect(screen.getByText(/A strange seed was planted on its back at birth./i)).toBeInTheDocument();
        });
    });
});