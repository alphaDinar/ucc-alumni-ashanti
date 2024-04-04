'use client'
import Image from 'next/image';
import styles from './headBox.module.css';
import { logo } from '@/External/lists';
import cover from '../../../../public/cover.jpg';
import Link from 'next/link';
import { MdMenu } from 'react-icons/md';
import { useState } from 'react';


const HeadBox = () => {
  const [menuToggled, setMenuToggled] = useState(false);

  const toggleMenu = () => {
    menuToggled ? setMenuToggled(false) : setMenuToggled(true);
  }

  return (
    <section className={styles.headBox}>
      <section className={styles.cover}>
        <Image alt='cover' src={cover} fill sizes='auto' />
      </section>
      <section className={styles.sheet} id='box'>
        <section className={styles.topNav}>
          <Image alt='logo' className='contain' src={logo} height={80} width={60} />
          <nav className={menuToggled ? styles.change : styles.none}>
            <a href="">Donations</a>
            <a href="">Events</a>
            <Link href={'/login'}>Login</Link>
            <Link href={'/register'}>Register</Link>
            <MdMenu className={styles.menuTag} onClick={toggleMenu} />
          </nav>
        </section>

        <section className={styles.conBox}>
          <div className={styles.con}>
            <p>
              <strong>
                Welcome To the UCC Alumni - Ashanti Chapter
                <sub></sub>
              </strong>
              <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus voluptatem quas est eius amet molestiae odit repudiandae possimus accusamus, repellendus explicabo</span>
              <Link href={'/register'}>Get Started</Link>
            </p>
          </div>
        </section>
      </section>
    </section>
  );
}

export default HeadBox;