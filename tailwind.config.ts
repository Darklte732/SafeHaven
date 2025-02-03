import type { Config } from "tailwindcss";

const config: Config = {
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: '#1E40AF',
  				dark: '#1E3A8A',
  				darker: '#1E3A7B',
  				light: '#3B82F6',
  				lighter: '#60A5FA',
  			},
  			secondary: {
  				DEFAULT: '#475569',
  				dark: '#334155',
  				light: '#64748B',
  			},
  		}
  	},
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '1rem',
  			sm: '2rem',
  			lg: '4rem',
  			xl: '5rem',
  			'2xl': '6rem',
  		}
  	}
  },
  plugins: [
  	require('@tailwindcss/forms'),
  ],
};
export default config;
