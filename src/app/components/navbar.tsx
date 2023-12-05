import React from 'react';
import Link from 'next/link';

const Navbar = (): JSX.Element => {
  return (
    <main>
      <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/tasks-axios">Tasks Axios</Link>
      </li>
    </ul>
    </main>
  )
}

export default Navbar;
