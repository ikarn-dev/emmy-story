import gsap from 'gsap';

export const animateText = (element: HTMLElement | null, options = {}) => {
  if (!element) return;

  const words = element.querySelectorAll('.word-span, .subtitle-span');
  
  gsap.fromTo(words,
    { 
      opacity: 0, 
      y: 30,
      rotationX: 90,
      transformOrigin: 'center bottom'
    },
    {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.8,
      stagger: {
        amount: 0.6,
        ease: "power2.out"
      },
      ease: "back.out(1.7)",
      ...options
    }
  );
};

export const animateParagraph = (element: HTMLElement | null, options = {}) => {
  if (!element) return;

  const words = element.querySelectorAll('.word, .subtitle-span');
  
  gsap.fromTo(words,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
      ...options
    }
  );
}; 