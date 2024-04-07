'use client'

import { useState, useEffect } from "react";
import TopNav from "../Components/TopNav/TopNav";
import styles from './register.module.css';
import { fireAuth, fireStoreDB, googleProvider } from '@/Firebase/base';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { collection, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { makePassword } from "@/External/phoneBook";
import { useRouter } from "next/navigation";
import { checkContact, checkPassLength } from "@/External/auth";
import { sendOTP, verifyOTP } from "@/External/arkesel";
import { IoMdDoneAll } from "react-icons/io";
import { createPayLink } from "@/External/paystack";
import { yearList } from "@/External/lists";

const Register = () => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [program, setProgram] = useState('');
  const [year, setYear] = useState('');
  const [profession, setProfession] = useState('');
  const [location, setLocation] = useState('');

  const [contact, setContact] = useState('');
  const [phoneCode, setPhoneCode] = useState('233');
  const [contactTemp, setContactTemp] = useState('');
  const [otp, setOTP] = useState('');

  const [blacklist, setBlacklist] = useState<string[]>([]);
  const [contactExists, setContactExists] = useState(false);
  const [contactCorrect, setContactCorrect] = useState(false);
  const [contactVerified, setContactVerified] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passMatch, setPassMatch] = useState(false);

  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');

  const [fee, setFee] = useState(0);

  useEffect(() => {
    const blacklistRef = collection(fireStoreDB, 'Blacklist/');
    const blacklistStream = onSnapshot(blacklistRef, (snapshot) => {
      setBlacklist(snapshot.docs.map((con) => con.id));
    });
    return () => blacklistStream();
  }, [])


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
    // setPassSpecial(checkPassSpecial(pass1));
    // setPassUpper(checkPassUpper(pass1));
    // setPassLower(checkPassLower(pass1));

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
    if (passMatch && !contactExists && checkContact(phoneCode, contact)) {
      setFormLoading(true);
      const passKey = await makePassword(password);
      const loginEmail = contactTemp + '@gmail.com';
      createUserWithEmailAndPassword(fireAuth, loginEmail, passKey)
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
      .then(async () => {
        if (fee > 0) {
          const total = fee * 100;
          const payObj = await createPayLink(total, email, 'General');
          router.push(payObj.link);
        } else {
          router.push('/');
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <section className={styles.registerBox}>
      <TopNav />

      <section className={styles.formBox} id="box">
        <h1>Register <sub></sub></h1>

        <form onSubmit={(e) => { e.preventDefault(); createCustomer() }}>
          <div className={styles.double}>
            <p>
              <span>First Name *</span>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </p>
            <p>
              <span>Middle Name</span>
              <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
            </p>
          </div>
          <div className={styles.double}>
            <p>
              <span>Surname *</span>
              <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
            </p>
            <p>
              <span>E-mail *</span>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </p>
          </div>
          <div className={styles.double}>
            <p>
              <span>Program read *</span>
              <input type="text" value={program} onChange={(e) => setProgram(e.target.value)} required />
            </p>
            <p>
              <span>Year *</span>
              <select value={year} className="cash" onChange={(e) => setYear(e.target.value)} required>
                <option hidden className="cash">Select Year</option>
                {yearList.map((el, i) => (
                  <option value={el} key={i} className="cash">{el}</option>
                ))}
              </select>
            </p>
          </div>
          <div className={styles.double}>
            <p>
              <span>Profession *</span>
              <input type="text" value={profession} onChange={(e) => setProfession(e.target.value)} required />
            </p>
            <p>
              <span>Place of Residence *</span>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </p>
          </div>
          <hr />
          <div className={styles.statBox}>
            <legend>
              {contactExists ?
                <span>Contact Already Exists</span>
                :
                <span>Contact Check</span>
              }
              <sub style={contactExists || !contactCorrect ? { background: 'tomato' } : { background: 'springgreen' }}></sub>
            </legend>
            <legend>
              <span>Password Length</span> <sub style={passLength ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
            </legend>
            <legend>
              <span>Password Match</span> <sub style={passMatch ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
            </legend>
          </div>
          <hr />
          <p className={styles.contactRow}>
            <span>Contact *</span>
            <legend>
              <select name="" id="">
                <option value="233">+233</option>
              </select>
              <input type="text" value={contact} readOnly={contactVerified} onChange={(e) => handleContact(e.target.value)} required />

              {/* <sub onClick={runOTP} style={contactVerified ? { pointerEvents: 'none' } : { pointerEvents: 'all' }}>
                {contactVerified ?
                  <IoMdDoneAll />
                  :
                  <span >Verify Contact</span>
                }
              </sub> */}
            </legend>
            <small className="cash" style={{ color: 'tomato' }}>Please use a valid contact (contact would be used for login.)</small>
          </p>

          {/* {!contactVerified &&
            <p className={styles.otpRow}>
              <span>Enter OTP</span>
              <legend>
                <input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} />
                <sub onClick={checkOTP}>Check OTP</sub>
              </legend>
            </p>
          } */}

          <div className={styles.double}>
            <p>
              <span>Password *</span>
              <input type="password" minLength={6} value={password} onChange={(e) => handlePassword(e.target.value, conPassword)} required />
            </p>
            <p>
              <span>Confirm Password *</span>
              <input type="password" minLength={6} value={conPassword} onChange={(e) => handlePassword(password, e.target.value)} required />
            </p>
          </div>

          <hr />

          <legend className={styles.feeBox}>
            <span className="cash">Donate | GHS</span>
            <input className="cash" type="number" value={fee} onChange={(e) => setFee(parseInt(e.target.value))} />
          </legend>

          <button>
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
        </form>
      </section>
    </section>
  );
}

export default Register;