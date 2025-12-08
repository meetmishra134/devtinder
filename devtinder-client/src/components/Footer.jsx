const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content fixed bottom-0 p-4">
      <aside>
        <p>Copyright © {new Date().getFullYear()} - Made with ❤️ by Meet</p>
      </aside>
    </footer>
  );
};

export default Footer;
