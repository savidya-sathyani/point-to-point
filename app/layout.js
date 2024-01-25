import '@/styles/global.scss';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Point to Point',
  description:
    'An application that measures distance and time between given number of points.',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className="app">
        <Header />
        <main className="content">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
