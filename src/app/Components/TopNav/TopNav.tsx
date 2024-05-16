'use client'
import styles from './topNav.module.css';
import { logo } from '@/External/lists';
import Link from 'next/link';
import Image from 'next/image';
import { MdMenu } from 'react-icons/md';
import { useState } from 'react';
import { useMember } from '@/app/contexts/memberContext';
import { signOut } from 'firebase/auth';
import { fireAuth } from '@/Firebase/base';
import cover from '../../../../public/cover.jpg';
import { useRouter } from 'next/navigation';

const TopNav = () => {
  const router = useRouter();
  const [menuToggled, setMenuToggled] = useState(false);
  const { member } = useMember();

  const toggleMenu = () => {
    menuToggled ? setMenuToggled(false) : setMenuToggled(true);
  }

  const logout = () => {
    signOut(fireAuth)
      .then(() => window.location.reload());
  }

  return (
    <section className={styles.topNav} id='box'>
      <Image alt='' src={cover} fill sizes='auto' className={styles.cover} />
      <Image alt='logo' onClick={() => router.push('/')} className='contain' style={{ zIndex: 100, cursor: 'pointer' }} src={logo} height={80} width={60} />
      <nav className={menuToggled ? styles.change : styles.none}>
        {Object.keys(member).length > 0 ?
          <>
            <Link href={'/login'}>My Donations</Link>
            <Link href={''}>Donations</Link>
            {/* <Link href={'/register'}>Events</Link> */}
            <Link href={''} id='border'>Hi <strong>{member.firstName}</strong></Link>
            <a id='border' onClick={logout} style={{ border: '1px solid tomato', cursor: 'pointer' }}>Logout</a>
          </>
          :
          <>
            <a href="">Donations</a>
            <a href="">Events</a>
            <Link href={'/login'}>Login</Link>
            <Link href={'/register'}>Register</Link>
          </>
        }
        <MdMenu className={styles.menuTag} onClick={toggleMenu} />
      </nav>

      <section className={styles.panel}></section>
    </section>
  );
}

export default TopNav;