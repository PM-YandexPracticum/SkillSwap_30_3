import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('App', () => {
    test('renders project text', () => {
        render(<App />);
        expect(screen.getByText('Проект')).toBeInTheDocument();
    });

    test('renders Header component', () => {
        render(<App />);
        expect(screen.getByRole('banner')).toBeInTheDocument(); 
    });
});
