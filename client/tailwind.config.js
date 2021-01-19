module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter'],
				code: ['Menlo', 'Monaco'],
			},
			maxWidth: {
				'8xl': '90rem',
			},
		},
		animation: {
			float: 'float 3s infinite',
			pulse: 'pulse 1.5s infinite',
		},
		keyframes: {
			float: {
				'0%': {
					transform: 'translateY(0px)',
					animationTimingFunction: 'ease-in-out',
				},
				'50%': {
					transform: 'translateY(-20px)',
					animationTimingFunction: 'ease-in-out',
				},
				'100%': {
					transform: 'translateY(0px)',
					animationTimingFunction: 'ease-in-out',
				},
			},
			pulse: {
				'0%, 100%': {
					opacity: 0.8,
				},
				'50%': {
					opacity: 0.5,
				},
			},
		},
	},
	variants: {
		extend: {
			fontWeight: ['hover', 'group-hover'],
			letterSpacing: ['hover', 'group-hover'],
			cursor: ['hover'],
			ringOpacity: ['hover', 'active'],
		},
	},
	plugins: [],
};
