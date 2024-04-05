'use client'
import styles from './topNav.module.css';
import { logo } from '@/External/lists';
import Link from 'next/link';
import { MdMenu } from 'react-icons/md';
import { useState } from 'react';
import Image from 'next/image';
import cover from '../../../../public/cover.jpg';

const TopNav = () => {
  const [menuToggled, setMenuToggled] = useState(false);

  const toggleMenu = () => {
    menuToggled ? setMenuToggled(false) : setMenuToggled(true);
  }


  return (
    <section className={styles.topNav} id='box'>
      {/* <Image alt='cover' className='cover' src={cover} fill sizes='auto' /> */}
      <Image alt='logo' className='contain' src={logo} height={80} width={60} />
      <nav className={menuToggled ? styles.change : styles.none}>
        <a href="">Donations</a>
        <a href="">Events</a>
        <Link href={'/login'}>Login</Link>
        <Link href={'/register'}>Register</Link>
        <MdMenu className={styles.menuTag} onClick={toggleMenu} />
      </nav>
    </section>
  );
}

export default TopNav;