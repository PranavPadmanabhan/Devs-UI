module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'portrait':'url(/Assets/images/mesh-mobile.png)',
        'landscape':'url(/Assets/images/mesh.png)',
        'footer-mesh':'url(/Assets/images/mesh-footer.png)',
        'discord':'url(/Assets/images/discord.png)'
      },
      screens: {
        'sm': '640px',  
        'md': '768px',  
        'lg': '1024px',  
        'xl': '1280px',  
        '2xl': '1536px',
        'lh': {'raw': '(min-height: 800px)'},
      },
      boxShadow: {
        'task': 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}