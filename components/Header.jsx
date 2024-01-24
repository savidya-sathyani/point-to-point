'use client';

import Image from 'next/image';

const Header = () => {
  return (
    <header className="header-container">
      <Image
        src={'/assets/icons/logo.jpg'}
        alt="ACE Solutions"
        width={200}
        height={100}
      />
    </header>
  );
};

export default Header;
