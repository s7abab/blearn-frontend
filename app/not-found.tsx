import Link from 'next/link';
import React from 'react';
import { styles } from './styles/style';

const NotFound = () => {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href={"/"} className={styles.primary}>Go to home page</Link>
    </div>
  );
};

export default NotFound;
