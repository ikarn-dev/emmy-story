'use client';

const foundersGrotesk = {
  fontFamily: 'Founders Grotesk',
  src: `url('/fonts/FoundersGrotesk-Regular.woff2') format('woff2'),
        url('/fonts/FoundersGrotesk-Regular.woff') format('woff')`,
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontDisplay: 'swap',
};

const plusJakartaSans = {
  fontFamily: 'Plus Jakarta Sans',
  src: `url('/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Regular.ttf') format('truetype'),
        url('/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Medium.ttf') format('truetype'),
        url('/fonts/Plus_Jakarta_Sans/static/PlusJakartaSans-Bold.ttf') format('truetype')`,
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontDisplay: 'swap',
};

const baskerville = {
  fontFamily: 'Baskerville',
  src: `url('/fonts/Baskerville/Baskerville.ttf') format('truetype')`,
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontDisplay: 'swap',
};

export default function FontLoader() {
  return (
    <style jsx global>{`
      @font-face {
        font-family: 'Founders Grotesk';
        src: ${foundersGrotesk.src};
        font-weight: ${foundersGrotesk.fontWeight};
        font-style: ${foundersGrotesk.fontStyle};
        font-display: ${foundersGrotesk.fontDisplay};
      }

      @font-face {
        font-family: 'Plus Jakarta Sans';
        src: ${plusJakartaSans.src};
        font-weight: ${plusJakartaSans.fontWeight};
        font-style: ${plusJakartaSans.fontStyle};
        font-display: ${plusJakartaSans.fontDisplay};
      }

      @font-face {
        font-family: 'Baskerville';
        src: ${baskerville.src};
        font-weight: ${baskerville.fontWeight};
        font-style: ${baskerville.fontStyle};
        font-display: ${baskerville.fontDisplay};
      }

      h1, h2, h3, h4, h5, h6, .title {
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      p, .paragraph {
        font-family: 'Baskerville', serif;
      }
    `}</style>
  );
} 