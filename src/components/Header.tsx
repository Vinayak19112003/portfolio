import React from 'react';
import { Navbar } from './Navbar';

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <Navbar />
        </header>
    );
}
