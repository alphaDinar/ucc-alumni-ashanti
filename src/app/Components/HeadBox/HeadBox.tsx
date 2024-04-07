'use client'
import Image from 'next/image';
import styles from './headBox.module.css';
import cover from '../../../../public/cover.jpg';
import Link from 'next/link';
import { logo } from '@/External/lists';
import { useMember } from '@/app/contexts/memberContext';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { fireAuth, fireStoreDB } from '@/Firebase/base';
import { MdMenu } from 'react-icons/md';
import { verifyPayment } from '@/External/paystack';
import { doc, updateDoc } from 'firebase/firestore';

interface defType extends Record<string, any> { };
const HeadBox = ({ searchParams }: { searchParams: { trxref: string, reference: string } }) => {
  const trxref = searchParams.trxref;
  const payRef = searchParams.reference;

  const { member } = useMember();
  const [menuToggled, setMenuToggled] = useState(false);

  const toggleMenu = () => {
    menuToggled ? setMenuToggled(false) : setMenuToggled(true);
  }

  useEffect(() => {
    const checkPayStatus = async () => {
      if (payRef !== undefined && typeof payRef !== undefined) {
        const res = await verifyPayment(payRef);
        if (res === 200) {
          await updateDoc(doc(fireStoreDB, 'Payments/' + payRef), {
            payStatus: 1,
          })
        }
      }
    }
    checkPayStatus();
  }, [payRef])

  const logout = () => {
    signOut(fireAuth)
      .then(() => window.location.reload());
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
            {Object.keys(member).length > 0 ?
              <>
                <Link href={'/login'}>My Donations</Link>
                {/* <Link href={''}>Donations</Link> */}
                <Link href={{ pathname: '/donate', query: { donation: 'General' } }}>Donate +</Link>
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
        </section>

        <section className={styles.conBox}>
          <div className={styles.con}>
            <p>
              <strong>
                Welcome To the UCC Alumni - Ashanti Chapter
                <sub></sub>
              </strong>
              <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus voluptatem quas est eius amet molestiae odit repudiandae possimus accusamus, repellendus explicabo</span>
              {Object.keys(member).length > 0 ?
                <Link href={'/dashboard'}>Welcome back, {member.firstName}</Link>
                :
                <Link href={'/register'}>Get Started</Link>
              }
            </p>
          </div>
        </section>
      </section>
    </section>
  );
}

export default HeadBox;