import Image from 'next/image';
import Logo from '../../public/babbel_logo.png';

const Header = () => {
  return (
    <header className="flex flex-row mx-28 h-16 px-4 items-center">
      <div className="flex flex-col justify-end">
        <Image src={Logo} width={94} height={32} alt="Babbel logo" />
        <span className="text-xs text-orange-600">Enterprise Contacts</span>
      </div>
      <nav className="ml-8">
        <ul className="flex flex-row items-center gap-6">
          <li className="text-orange-600 cursor-pointer">Home</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
