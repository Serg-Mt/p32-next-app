import Link from 'next/link';
import classes from './nav.module.css';

const
  pages = [
    { href: '/', title: 'Home' },
    { href: '/todo', title: 'To Do List' },
   
  ];

export function Nav() {
  return <nav className={classes.nav}>
    <ul>
      {pages.map(({ href, title }) =>
        <li>
          <Link href={href}>{title}</Link>
        </li>)}
    </ul>
  </nav>
}