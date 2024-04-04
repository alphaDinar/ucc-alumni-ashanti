'use client'
import Image from 'next/image';
import styles from '../register/register.module.css';
import { FcGoogle } from 'react-icons/fc';
import { MdArrowBack } from 'react-icons/md';
import Link from 'next/link';
import { signInWithPopup } from 'firebase/auth';
import { fireAuth, fireStoreDB, googleProvider } from '@/Firebase/base';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { checkUser } from '@/External/phoneBook';
import { countryList, logo } from '@/External/lists';
// import Loading from '../components/Loading/Loading';
import { useAuthTarget } from '../contexts/authTargetContext';
import { checkContact } from '@/External/auth';

const Login = () => {
  const place = "https://res.cloudinary.com/dvnemzw0z/image/upload/v1711128925/ucc%20alumni/ucc3_xpdjh2.jpg";
  const router = useRouter();

  const { authTarget } = useAuthTarget();

  const [formLoading, setFormLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [phoneCode, setPhoneCode] = useState('233');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');


  const googleRegister = () => {
    signInWithPopup(fireAuth, googleProvider)
      .then(async (user) => {
        const username = user.user.displayName || 'Dashboard';
        const customer = await getDoc(doc(fireStoreDB, 'Customers/' + user.user.uid))
        if (customer !== undefined && customer.data() !== undefined) {
          router.push(authTarget)
        } else {
          setDoc(doc(fireStoreDB, 'Customers/' + user.user.uid), {
            email: user.user.email,
            contact: '',
            username: username,
            points: 0,
            balance: 0
          })
            .then(() => router.push(authTarget))
            .catch((error) => console.log(error));
        }
      })
  }

  const loginUser = async () => {
    // if (checkContact('+' + phoneCode + contact) && contact && password) {
    //   setErrorMessage(false);
    //   setFormLoading(true);
    //   const isCorrect = await checkUser(phoneCode + contact, password);
    //   console.log(isCorrect);
    //   if (isCorrect) {
    //     router.push(authTarget);
    //   } else {
    //     setFormLoading(false);
    //     setErrorMessage(true);
    //   }
    // } else {
    //   setFormLoading(false);
    //   // setErrorMessage(true);
    // }
  }

  return (
    <section className={styles.formBox}>
      <section className={styles.left}>
        <Image alt='' src={place} fill sizes='auto' />
        {errorMessage &&
          <div className={styles.statBox}>
            <p>
              <span>Wrong Username or Password</span>
              <sub style={{ background: 'tomato' }}></sub>
            </p>
          </div>
        }
      </section>
      <section className={styles.right}>
        <form onSubmit={(e) => e.preventDefault()}>
          <header>
            <Link href={'/'}>
              <MdArrowBack />
            </Link>
            <Image alt='' className='contain' src={logo} height={40} width={100} />
          </header>
          <section>
            <div>
              <span>Phone</span>
              <article className={styles.contactRow}>
                <select value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)}>
                  {countryList.map((item, i) => (
                    <option value={item.phoneCode} key={i}>
                      + {item.phoneCode}
                    </option>
                  ))}
                </select>
                <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
              </article>
            </div>
            <div>
              <span>Password</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button onClick={loginUser}>
              {!formLoading ?
                <span>Login</span>
                :
                <legend className='miniLoader'>
                  <sub></sub>
                  <sub></sub>
                  <sub></sub>
                </legend>
              }
            </button>
          </section>
          <footer>
            <FcGoogle onClick={googleRegister} />
          </footer>
          <Link href={'/register'}>
            <small>Don&apos;t have an account yet? Register here</small>
          </Link>
        </form>
      </section>
    </section>
  );
}

export default Login;