/* eslint-disable @next/next/no-sync-scripts */
import '@/styles/global.scss';
import Home from './page';

export const metadata = {
  title: 'Point to Point',
  description:
    'An application that measures distance and time between given number of points.',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Home />
        <script src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
      </body>
    </html>
  );
};

export default RootLayout;
