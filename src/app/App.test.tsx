import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
    test('renders project text', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        expect(screen.getByText('Проект')).toBeInTheDocument();
    });

    test('renders Header component', () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
        expect(screen.getByRole('banner')).toBeInTheDocument(); 
    });
});