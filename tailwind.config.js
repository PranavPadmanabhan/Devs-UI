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
        'esm':{ 'min': '320px', 'max':'399px'},
        'asm':{ 'min': '400px', 'max':'479px'},
        'msm':{ 'min': '480px', 'max':'560px'},
        'sm': '640px',  
        'md': '768px',  
        'lg': '1024px',  
        'xl': '1280px',  
        '2xl': '1536px',
        'lh': {'raw': '(min-height: 800px)'},
      },
      boxShadow: {
        'task': 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
        'neumorphism':'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}