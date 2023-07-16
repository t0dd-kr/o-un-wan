import { Config } from 'tailwindcss'
export default <Config>(<any>{
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        'o-un-wan': {
          primary: '#00FFB2',
          'primary-content': '#000',
          secondary: '#00FFF0',
          'secondary-content': '#000',
          accent: '#FF4255',
          'accent-content': '#fff',
          neutral: '#000',
          'neutral-content': '#fff',
          'base-100': '#0D0D0D',
          'base-200': '#1a1a1a',
          'base-300': '#2A2B2E',
          'base-content': '#fff',
        },
      },
      'dark',
      'light',
    ],
  },
})
