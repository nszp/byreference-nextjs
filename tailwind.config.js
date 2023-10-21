/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'lilith': '#A6344D',
                'blurple': '#5865F2',
                'lgray': {
                    700: '#2b2b2b',
                    750: '#222222',
                    800: '#1E1E1E',
                    900: '#171717'
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
}
