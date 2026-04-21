import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            boxShadow: {
                'my-purple': '0px 20px 60px rgba(106, 55, 212, 0.08)',
            },
            colors: {
                "primary": "#6a37d4",
                "primary-container": "#ae8dff",
                "secondary-container": "#65e1ff",
                "on-surface": "#2c2f31",
                "on-surface-variant": "#595c5e",
                "surface-container-low": "#eef1f3",
                "surface-container-high": "#dfe3e6",
                "on-primary": "#f8f0ff",
                "outline": "#747779",
            },
            fontFamily: {
                headline: ["Montserrat", "sans-serif"],
                body: ["Inter", "sans-serif"],
                label: ["Inter", "sans-serif"],
            }
        },
    },

    plugins: [forms],
};