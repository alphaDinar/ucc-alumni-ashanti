'use client'

import { useState } from "react";
import TopNav from "../Components/TopNav/TopNav";
import styles from '../register/register.module.css';

import { checkUser } from "@/External/phoneBook";
import { useRouter } from "next/navigation";
import { checkContact } from "@/External/auth";

const Register = () => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);

  const [contact, setContact] = useState('');
  const [phoneCode, setPhoneCode] = useState('233');

  const [password, setPassword] = useState('');


  const loginUser = async () => {
    if (checkContact(phoneCode, contact) && contact && password) {
      setFormLoading(true);
      const isCorrect = await checkUser(phoneCode + contact, password);
      if (isCorrect) {
        router.push('/');
      } else {
        setFormLoading(false);
        alert('Invalid contact or password')
      }
    } else {
      setFormLoading(false);
      alert('Invalid contact')
    }
  }


  return (
    <section className={styles.registerBox}>
      <TopNav />

      <section className={styles.formBox} id="box">
        <h1>Login <sub></sub></h1>

        <form onSubmit={(e) => { e.preventDefault(); loginUser() }}>
          <p className={styles.single}>
            <span>Contact *</span>
            <legend>
              <select value={phoneCode} onChange={(e) => setPhoneCode(e.target.value)}>
                <option value="233">+233</option>
              </select>
              <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
            </legend>
          </p>

          <div className={styles.single}>
            <p>
              <span>Password *</span>
              <input type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required />
            </p>
          </div>


          <button>
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
        </form>
      </section>
    </section>
  );
}

export default Register;