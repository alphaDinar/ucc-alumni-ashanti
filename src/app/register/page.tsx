'use client'
import { sendOTP, verifyOTP } from '@/External/arkesel';
import { makePassword } from '@/External/phoneBook';
import { fireAuth, fireStoreDB, googleProvider } from '@/Firebase/base';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoMdDoneAll } from 'react-icons/io';
import { MdArrowBack } from 'react-icons/md';
import logo from '../../../public/logo.webp';
import styles from './register.module.css';
import { countryList } from '@/External/lists';
import { useAuthTarget } from '../contexts/authTargetContext';
import { checkContact, checkPassLength, checkPassLower, checkPassSpecial, checkPassUpper } from '@/External/auth';

const Register = () => {
  const place = "https://res.cloudinary.com/dvnemzw0z/image/upload/v1711128925/ucc%20alumni/ucc3_xpdjh2.jpg";
  const router = useRouter();
  const { authTarget } = useAuthTarget();

  const [formLoading, setFormLoading] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [year, setYear] = useState('');
  const [program, setProgram] = useState('');
  const [location, setLocation] = useState('');

  const [contact, setContact] = useState('');
  const [phoneCode, setPhoneCode] = useState('233');
  const [contactTemp, setContactTemp] = useState('');



  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');


  const [blacklist, setBlacklist] = useState<string[]>([]);
  const [contactExists, setContactExists] = useState(false);
  const [contactCorrect, setContactCorrect] = useState(false);
  const [contactVerified, setContactVerified] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passMatch, setPassMatch] = useState(false);
  const [passSpecial, setPassSpecial] = useState(false);
  const [passLower, setPassLower] = useState(false);
  const [passUpper, setPassUpper] = useState(false);


  //full Name first + mid + last

  useEffect(() => {
    const blacklistRef = collection(fireStoreDB, 'Blacklist/');
    const blacklistStream = onSnapshot(blacklistRef, (snapshot) => {
      setBlacklist(snapshot.docs.map((con) => con.id));
    });
    return () => blacklistStream();
  }, [])

  // const googleRegister = () => {
  //   signInWithPopup(fireAuth, googleProvider)
  //     .then(async (user) => {
  //       const username = user.user.displayName || 'Dashboard';
  //       const customer = await getDoc(doc(fireStoreDB, 'Customers/' + user.user.uid))
  //       if (customer !== undefined && customer.data() !== undefined) {
  //         router.push(authTarget);
  //       } else {
  //         const keywords = JSON.parse(sessionStorage.getItem('maqKeywords') || '[]');
  //         setDoc(doc(fireStoreDB, 'Customers/' + user.user.uid), {
  //           email: user.user.email,
  //           contact: '',
  //           keywords: keywords,
  //           username: username,
  //           points: 0,
  //           balance: 0
  //         })
  //           .then(() => router.push(authTarget))
  //           .catch((error) => console.log(error));
  //       }
  //     })
  // }

  const handleContact = (val: string) => {
    setContact(val);
    setContactTemp(phoneCode + val);
    setContactCorrect(checkContact(phoneCode, val));
    if (blacklist.includes(phoneCode + val)) {
      setContactExists(true);
    } else {
      setContactExists(false);
      setContactVerified(false);
    }
  }

  const handlePassword = (pass1: string, pass2: string) => {
    setPassword(pass1);
    setConPassword(pass2);

    setPassLength(checkPassLength(pass1));
    setPassSpecial(checkPassSpecial(pass1));
    setPassUpper(checkPassUpper(pass1));
    setPassLower(checkPassLower(pass1));

    if (pass1 === pass2) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  }


  const runOTP = async () => {
    if (checkContact(phoneCode, contact)) {
      const res = await sendOTP(contactTemp);
      if (res.status === 200) {
        alert(`OTP sent to  +${contactTemp}`);
      } else {
        alert('Please try again');
      }
    } else {
      console.log('z')
    }
  }

  const checkOTP = async () => {
    if (otp.length === 6) {
      const res = await verifyOTP(contactTemp, otp);
      if (res.status === 200) {
        setContactVerified(true);
      } else {
        alert('wrong');
      }
    } else {
      console.log('zzz');
    }
  }

  const createCustomer = async () => {
    if (contactVerified && passLength && passMatch && passUpper && passLower && passSpecial && !contactExists) {
      setFormLoading(true);
      const passKey = await makePassword(password);
      const email = contactTemp + '@gmail.com';
      createUserWithEmailAndPassword(fireAuth, email, passKey)
        .then((user) => {
          const updatedContact = contactTemp;
          const fullName = firstName + ' ' + middleName + ' ' + surname;
          setDoc(doc(fireStoreDB, 'Members/' + user.user.uid), {
            fullName: fullName,
            firstName: firstName,
            middleName: middleName,
            surname: surname,
            email: email,
            year: year,
            location: location,
            program: program,
            profession: profession,
            contact: updatedContact,
            balance: 0
          })
            .then(() => {
              setDoc(doc(fireStoreDB, 'Blacklist/' + contactTemp), {})
                .then(() => addToPhoneAuth(passKey))
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        })
    } else {
      setFormLoading(false);
    }
  }

  const addToPhoneAuth = async (passKey: string) => {
    setDoc(doc(fireStoreDB, 'PhoneBook/' + contactTemp), {
      contactKey: contactTemp,
      passKey: passKey,
      contact: contactTemp,
      password: passKey
    })
      .then(() => router.push(authTarget))
      .catch((error) => console.log(error));
  }

  return (
    <section className={styles.formBox}>
      <section className={styles.left}>
        <Image alt='' src={place} fill sizes='auto' />
        <div className={styles.statBox}>
          <p>
            {contactExists ?
              <span>Contact Already Exists</span>
              :
              <span>Contact Check</span>
            }
            <sub style={contactExists || !contactCorrect || !contactVerified ? { background: 'tomato' } : { background: 'springgreen' }}></sub>
          </p>
          <p>
            <span>At Least 8 Characters</span>
            <sub style={passLength ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
          </p>

          <p>
            <span>At Least 1 Special symbol</span>
            <sub style={passSpecial ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
          </p>
          <p>
            <span>At Least 1 Upper Case</span>
            <sub style={passUpper ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
          </p>
          <p>
            <span>At Least 1 Lower Case</span>
            <sub style={passLower ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
          </p>
          <p>
            <span>Password Match</span>
            <sub style={passMatch ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
          </p>
        </div>
      </section>
      <section className={styles.right}>
        <form onSubmit={(e) => { e.preventDefault(); createCustomer() }}>
          <header>
            <Link href={'/'}>
              <MdArrowBack />
            </Link>
            <Image alt='' className='contain' src={logo} height={40} width={100} />
          </header>
          <section>
            <div>
              <span>First Name</span>
              <input type="text" className='cash' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div>
              <span>Middle Name</span>
              <input type="text" className='cash' value={middleName} onChange={(e) => setMiddleName(e.target.value)} required />
            </div>
            <div>
              <span>Surname</span>
              <input type="text" className='cash' value={surname} onChange={(e) => setSurname(e.target.value)} required />
            </div>
            <div>
              <span>E-Mail</span>
              <input type="email" className='cash' value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <span>Program</span>
              <input type="text" className='cash' value={program} onChange={(e) => setProgram(e.target.value)} required />
            </div>
            <div>
              <span>Year of Completion</span>
              <input type="text" className='cash' value={year} onChange={(e) => setYear(e.target.value)} required />
            </div>
            <div>
              <span>Profession</span>
              <input type="text" className='cash' value={profession} onChange={(e) => setProfession(e.target.value)} required />
            </div>
            <div>
              <span>Place of Residence</span>
              <input type="text" className='cash' value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>
            <div></div>
            <div>
              <span>Phone</span>
              <article className={styles.contactRow}>
                <select value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)}>
                  {countryList.map((item, i) => (
                    <option key={i} value={item.phoneCode}>
                      + {item.phoneCode}
                    </option>
                  ))}
                </select>
                <input type="text" value={contact} readOnly={contactVerified} onChange={(e) => handleContact(e.target.value)} required />
              </article>
            </div>

            {!contactVerified ?
              <p>
                <legend onClick={runOTP}>Send OTP</legend>
              </p>
              :
              <p>
                <legend style={{ background: 'var(--pass)' }}>OTP Checked</legend>
              </p>
            }
            <p>
              {!contactVerified &&
                <input type="text" placeholder='OTP' style={{ width: 100, letterSpacing: '2px' }} value={otp} onChange={(e) => e.target.value.length < 7 && setOTP(e.target.value)} />
              }
              <sub onClick={checkOTP} style={contactVerified ? { background: 'var(--pass)' } : { background: 'tomato' }}>
                {contactVerified ?
                  <IoMdDoneAll />
                  :
                  <span>check</span>
                }
              </sub>
            </p>
            <div>
              <span>Password</span>
              <input type="password" className='cash' value={password} onChange={(e) => handlePassword(e.target.value, conPassword)} required />
            </div>
            <div>
              <span>Confirm Password</span>
              <input type="password" className='cash' value={conPassword} onChange={(e) => handlePassword(password, e.target.value)} required />
            </div>
            <div></div>
            <button style={!contactExists && contactVerified && contactCorrect && passLength && passSpecial && passUpper && passLower && passMatch ? { opacity: 1 } : { opacity: 0.3, pointerEvents: 'none' }}>
              {!formLoading ?
                <span>Register</span>
                :
                <legend className='miniLoader'>
                  <sub></sub>
                  <sub></sub>
                  <sub></sub>
                </legend>
              }
            </button>
          </section>
          {/* <footer>
            <FcGoogle onClick={googleRegister} />
          </footer> */}

          <article style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.1rem' }}>
            <Link href={'/login'}>
              <small>Do you already have an account? login here</small>
            </Link>

            <Link href={'/forgotPassword'}>
              <small style={{ color: 'tomato', fontWeight: 600 }}>Forgot Password? Reset here</small>
            </Link>
          </article>
        </form>
      </section>
    </section>
  );
}

export default Register;