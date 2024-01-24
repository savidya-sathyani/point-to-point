'use client';

import Image from 'next/image';

const Header = () => {
  return (
    <header className="header-container">
      <Image
        priority={true}
        src={'/assets/icons/logo.jpg'}
        alt="ACE Solutions"
        width={0}
        height={0}
        sizes="100vw"
        className="logo"
      />
    </header>
  );
};

export default Header;
