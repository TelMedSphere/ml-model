/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("./colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/index.html"],
  darkMode: ["class", "class"],
  theme: {
  	extend: {
  		colors: {
  			black: 'colors.black',
  			blue: 'colors.blue',
  			yellow: 'colors.yellow',
  			orange: 'colors.orange',
  			grey: 'colors.grey',
  			white: 'colors.white',
  			teal: 'colors.teal',
  			green: 'colors.green',
  			purple: 'colors.purple',
  			social: 'colors.social',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'curvy-shape': "url('/curvy-shape-img.png')",
  			'landing-bg': 'linear-gradient(white 20%, #d4ddf1 40%, #b0bbd8 60%, #6575a5 80%, #4a4cb2 100%)'
  		},
  		textShadow: {
  			'landing-highlight': '2px 2px 4px rgba(0, 0, 0, 0.3)'
  		},
  		fontFamily: {
  			sans: [
  				'Montserrat',
                    ...defaultTheme.fontFamily.sans
                ]
  		},
  		screens: {
  			'3xl': '1536px',
  			'2xl': '1400px',
  			xl: '1400px',
  			lg: '1024px',
  			md: '768px',
  			sm: '640px',
  			xs: '480px',
  			xxs: '400px'
  		},
  		animation: {
  			spark: 'spark 1.5s linear infinite',
  			'pulse-custom': 'pulse 2s infinite',
  			fadeIn: 'fadeIn 1.5s ease-in-out',
  			fadeInLeft: 'fadeInLeft 1.5s ease-in-out forwards',
  			maintain: 'maintain 2s linear infinite',
  			rotate: 'rotate 2s linear infinite'
  		},
  		keyframes: {
  			spark: {
  				'0%': {
  					maxWidth: '0%'
  				},
  				'100%': {
  					maxWidth: '100%'
  				}
  			},
  			pulse: {
  				'0%, 100%': {
  					transform: 'scale(1)'
  				},
  				'50%': {
  					transform: 'scale(1.1)',
  					opacity: '1'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			fadeInLeft: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(-20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			maintain: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			},
  			rotate: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(-360deg)'
  				}
  			}
  		},
  		zIndex: {
  			'50': '50',
  			'1000': '1000',
  			'1050': '1050',
  			'9999': '9999',
  			'-1': '-1'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-textshadow"), require("tailwindcss-animate")],
};
