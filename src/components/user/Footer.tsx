const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-full py-6">
      <div className="container mx-auto px-4">
        <div className="text-center">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
