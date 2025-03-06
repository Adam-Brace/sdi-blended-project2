import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Search from './Search';
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme();

describe('Search Component', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </ThemeProvider>
    );
  });

  it('displays "Pokemon Not found" initially', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Search />
        </MemoryRouter>
      </ThemeProvider>
    );
    expect(getByText('Pokemon Not found')).toBeTruthy();
  });
});
