'use client'

import { useState } from "react";
import TopNav from "../Components/TopNav/TopNav";
import styles from '../register/register.module.css';
import { useRouter } from "next/navigation";
import { createPayLink } from "@/External/paystack";
import { useMember } from "../contexts/memberContext";

const Register = ({ searchParams }: { searchParams: { donation: string } }) => {
  const router = useRouter();
  const [formLoading, setFormLoading] = useState(false);

  const { member } = useMember();
  const title = searchParams.donation;

  const [donation, setDonation] = useState(title);
  const [fee, setFee] = useState(10);

  const donate = async () => {
    setFormLoading(true);
    if (fee > 0) {
      const total = fee * 100;
      const payObj = await createPayLink(total, member.email, donation);
      router.push(payObj.link);
    } else {
      setFormLoading(false);
      alert('Enter a valid amount');
    }
  }

  return (
    <section className={styles.registerBox}>
      <TopNav />

      <section className={styles.formBox} id="box">
        <h1>Donate <sub></sub></h1>

        <form onSubmit={(e) => { e.preventDefault(); donate() }}>
          <p>
            <span>Donation *</span>
            <input type="text" value={donation} readOnly onChange={(e) => setDonation(e.target.value)} required />
          </p>


          <legend className={styles.feeBox}>
            <span className="cash">Donate | GHS</span>
            <input className="cash" type="number" min={10} value={fee} onChange={(e) => setFee(parseInt(e.target.value))} />
          </legend>

          {/* <p>
            <span>Extra notes</span>
            <textarea className={styles.extraBox} placeholder="Is there anything you would want us to know about this donation.">
            </textarea>
          </p> */}

          <button>
            {!formLoading ?
              <span>Donate</span>
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