import React from 'react';

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyright">Copyright &copy; {date}</p>
    </footer>
  );
};

export default Footer;
