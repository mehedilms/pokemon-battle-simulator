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
					bg: '#f8f9fa', // Light background
					panel: '#ffffff', // White panel
					hp: {
						bg: '#e9ecef',
						fill: '#4263eb'
					},
					exp: {
						bg: '#e9ecef',
						fill: '#5c7cfa'
					},
					menu: '#ffffff',
					menuBorder: '#e9ecef',
					text: '#212529',
					yellow: '#1EAEDB', // Changed to blue!
					blue: '#4263eb',
					fire: '#ff6b6b',
					water: '#4dabf7',
					grass: '#51cf66',
					electric: '#fcc419',
				},
				pixels: {
					primary: '#4263eb',       // Main purple/blue
					secondary: '#5c7cfa',     // Secondary purple/blue
					dark: '#212529',          // Text/dark elements
					light: '#f8f9fa',         // Light background
					accent: '#ff6b6b',        // Red accent
					background: '#ffffff',    // White background
					panel: '#f8f9fa',         // Panel color
					border: '#e9ecef',        // Border color
					text: '#212529',          // Text color
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
				'ping-fast': {
					'0%': {
						transform: 'scale(0.8)',
						opacity: '1'
					},
					'75%, 100%': {
						transform: 'scale(2)',
						opacity: '0'
					}
				},
				'bounce-in': {
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
				'ping-fast': 'ping-fast 2s cubic-bezier(0, 0, 0.2, 1) infinite',
				'bounce-in': 'bounce-in 0.5s ease-in-out infinite',
				'platform-bounce': 'platform-bounce 2s ease-in-out infinite',
				'attack-shadow': 'attack-shadow 1s ease-in-out',
				'pixel-transition': 'pixel-transition 0.4s step-end'
			},
			fontFamily: {
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'mono': ['SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
				'pixel': ['Kemco Pixel', 'monospace'],
				'kemco': ['Kemco Pixel', 'monospace'],
				'depixel': ['Depixelklein', 'monospace']
			},
			boxShadow: {
				'pixels': '0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.03)',
				'pixels-hover': '0 10px 25px rgba(0, 0, 0, 0.07), 0 20px 48px rgba(0, 0, 0, 0.04)',
				'pixels-inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.05)'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
