
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				pokemon: {
					bg: '#FFFFFF', // White background
					panel: '#F5F5F5', // Light grey panel
					hp: {
						bg: '#EEEEEE',
						fill: '#58c858'
					},
					exp: {
						bg: '#EEEEEE',
						fill: '#7098d8'
					},
					menu: '#FFFFFF',
					menuBorder: '#333333',
					text: '#333333',
					yellow: '#e8d068',
					blue: '#7080e8',
					fire: '#e86830',
					water: '#5888f0',
					grass: '#78c060',
					electric: '#f8d030',
				},
				gba: {
					primary: '#5469d4',      // Primary blue
					secondary: '#333333',    // Dark grey
					dark: '#333333',         // Almost black
					light: '#FFFFFF',        // White
					accent: '#e05050',       // Red accent
					background: '#FFFFFF',   // White background
					panel: '#F5F5F5',        // Light grey panel
					border: '#DEDEDE',       // Light border
					text: '#333333',         // Dark text
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(0)'
					}
				},
				'slide-in-right': {
					'0%': {
						transform: 'translateX(100%)'
					},
					'100%': {
						transform: 'translateX(0)'
					}
				},
				'bounce-light': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-5px)'
					}
				},
				'hp-decrease': {
					'0%': {
						width: 'var(--prev-width)'
					},
					'100%': {
						width: 'var(--new-width)'
					}
				},
				'battle-shake': {
					'0%, 100%': {
						transform: 'translateX(0)'
					},
					'25%': {
						transform: 'translateX(-5px)'
					},
					'75%': {
						transform: 'translateX(5px)'
					}
				},
				'rotate-fade': {
					'0%': {
						transform: 'rotate(0deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'rotate(720deg)',
						opacity: '0'
					}
				},
				'flash': {
					'0%, 50%, 100%': {
						opacity: '1'
					},
					'25%, 75%': {
						opacity: '0.5'
					}
				},
				'ping-slow': {
					'0%': {
						transform: 'scale(0.8)',
						opacity: '1'
					},
					'75%, 100%': {
						transform: 'scale(2)',
						opacity: '0'
					}
				},
				'bounce-fast': {
					'0%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					},
					'100%': {
						transform: 'translateY(0)'
					}
				},
				'platform-bounce': {
					'0%, 100%': {
						transform: 'translateY(0) scale(1)'
					},
					'50%': {
						transform: 'translateY(-5px) scale(1.05)'
					}
				},
				'attack-shadow': {
					'0%': {
						transform: 'translateY(0) scaleX(1)',
						opacity: '0.7'
					},
					'50%': {
						transform: 'translateY(-30px) scaleX(0.5)',
						opacity: '0.3'
					},
					'100%': {
						transform: 'translateY(0) scaleX(1)',
						opacity: '0.7'
					}
				},
				'pixel-transition': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'50%': {
						transform: 'scale(1.02)',
						opacity: '0.5'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out',
				'slide-in': 'slide-in 0.4s ease-out',
				'slide-in-right': 'slide-in-right 0.4s ease-out',
				'bounce-light': 'bounce-light 2s ease-in-out infinite',
				'hp-decrease': 'hp-decrease 1s ease-in-out forwards',
				'battle-shake': 'battle-shake 0.3s ease-in-out',
				'rotate-fade': 'rotate-fade 0.8s ease-in-out forwards',
				'flash': 'flash 0.5s ease-in-out',
				'ping-slow': 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
				'bounce-fast': 'bounce-fast 0.5s ease-in-out infinite',
				'platform-bounce': 'platform-bounce 2s ease-in-out infinite',
				'attack-shadow': 'attack-shadow 1s ease-in-out',
				'pixel-transition': 'pixel-transition 0.4s step-end'
			},
			fontFamily: {
				'gba': ['"Inter"', 'system-ui', 'sans-serif'],
				'pixel': ['"Inter"', 'sans-serif']
			},
			boxShadow: {
				'gba': '0px 4px 6px rgba(0, 0, 0, 0.1)',
				'gba-inner': 'inset 0px 2px 4px rgba(0, 0, 0, 0.05)',
				'pixel': '0px 4px 6px rgba(0, 0, 0, 0.1)',
				'pixel-light': '0px 2px 4px rgba(0, 0, 0, 0.05)',
				'pixel-inset': 'inset 0px 2px 4px rgba(0, 0, 0, 0.05)'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
