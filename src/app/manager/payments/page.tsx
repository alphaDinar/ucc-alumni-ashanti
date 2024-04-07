'use client'
import Image from "next/image";
import Panel from "../Panel/Panel";
import styles from './payments.module.css';
import { MdArrowForward } from "react-icons/md";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { fireStoreDB } from "@/Firebase/base";
import Link from "next/link";
import { sortByTime } from "@/External/sort";
import { fixContact } from "@/External/auth";
import { getTimeSince } from "@/External/time";

interface defType extends Record<string, any> { };
const Payments = () => {
  const person = 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1711721582/maqete/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV_ue71a2.jpg';

  const [allPayments, setAllPayments] = useState<defType[]>([]);
  const [payments, setPayments] = useState<defType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [amount, setAmount] = useState(0);
  const [profession, setProfession] = useState('');

  useEffect(() => {
    const paymentStream = onSnapshot(collection(fireStoreDB, 'Payments/'), (snapshot) => {
      setPayments(sortByTime(snapshot.docs.map((payment) => ({ id: payment.id, ...payment.data() }))));
      setAllPayments(sortByTime(snapshot.docs.map((payment) => ({ id: payment.id, ...payment.data() }))));
      setIsLoading(false);
    });

    return () => paymentStream();
  }, [])

  const searchPayments = (contact: string, profession: string, amount: number) => {
    const paymentsTemp = [...allPayments];
    const updatedPayments = paymentsTemp.filter((el) => el.contact.toLowerCase().includes(contact.toLowerCase())).filter((el) => el.profession.toLowerCase().includes(profession.toLowerCase())).filter((el) => el.amount === amount);
    setPayments(updatedPayments);
  }


  return (
    <Panel>
      <section id="frame" className={styles.paymentBox}>
        <header>
          <h3>Payments</h3>
          <div>
            {/* <input type="text" placeholder="search Name" value={name} onChange={(e) => { setName(e.target.value); searchPayments(contact, profession, amount) }} /> */}
            <input type="text" placeholder="search Contact" value={contact} onChange={(e) => { setContact(e.target.value); searchPayments(e.target.value, profession, amount) }} />
            <input type="number" placeholder="search Amount" value={amount} onChange={(e) => { setAmount(parseInt(e.target.value)); searchPayments(contact, profession, parseInt(e.target.value)) }} />
            <input type="text" placeholder="search Profession" value={profession} onChange={(e) => { setProfession(e.target.value); searchPayments(contact, e.target.value, amount) }} />
          </div>
        </header>

        <section className={styles.payments}>
          {payments.map((payment, i) => (
            <Link href={''} className={styles.payment} key={i}>
              <Image src={person} alt="" className="cover" width={50} height={50} />
              <p>
                <strong>{payment.fullName}</strong>
                <small>{payment.profession}</small>
              </p>
              <span className="cash">{fixContact(payment.contact)}</span>
              <strong className="cash" style={{ fontSize: '1rem' }}>GHS {payment.amount.toLocaleString()}</strong>
              <small className="cash" style={{ color: 'gray' }}>{getTimeSince(payment.timestamp)}</small>
              <sub className={styles.payBox} style={payment.payStatus ? { background: 'springgreen' } : { background: 'tomato' }}></sub>
            </Link>
          ))}
        </section>
      </section>
    </Panel>
  );
}

export default Payments;