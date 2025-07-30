import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex gap-6 text-lg">
      <Link to="/translate" className="hover:text-blue-500">Translator</Link>
      <Link to="/random-string" className="hover:text-blue-500">Random String</Link>
    </nav>
  );
};

export default Navbar;
