import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 py-4 text-center z-50">
      <div className="text-white/60 text-sm">
        <span className="title">Made with ❤️ by </span>
        <a 
          href="https://x.com/iKK6600" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white hover:text-white/80 transition-colors duration-300 title inline-flex items-center gap-1"
        >
          Karan <FaXTwitter className="inline-block w-3 h-3" />
        </a>
        <span className="title"> • © {new Date().getFullYear()} All rights reserved</span>
      </div>
    </footer>
  );
};

export default Footer; 