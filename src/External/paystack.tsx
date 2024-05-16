import axios from 'axios';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { fireAuth, fireStoreDB } from '@/Firebase/base';


export const createPayLink = async (amount: number, email: string, donation: string) => {
  // const host = 'http://localhost:3000';
  const host = 'https://ucc-alumni-ashanti.vercel.app/';
  const url = "https://api.paystack.co/transaction/initialize";

  const data = {
    email: email,
    amount: amount,
    callback_url: `${host}`,
    metadata: { cancel_action: `${host}/register` }
  };

  const response = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer sk_live_2699e2da35431299f2842ea3219fda056e83f5e9`,
      // Authorization: `Bearer sk_test_265acb9b86de46afa9b166773bf933aa4edb8438`,
      // Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_API_KEY}`,
      'Cache-Control': 'no-cache'
    }
  })


  const ref = response.data.data.reference;
  const payObj = {
    link: response.data.data.authorization_url,
    ref: ref
  }

  onAuthStateChanged(fireAuth, async (user) => {
    if (user) {
      const uid = user.uid;
      const memberTemp = await getDoc(doc(fireStoreDB, 'Members/' + user.uid))
      if (memberTemp.exists()) {
        const member = memberTemp.data();
        const realAmount = amount / 100;
        const stamp = new Date().getTime();
        await setDoc(doc(fireStoreDB, 'Payments/' + ref), {
          uid: uid,
          amount: realAmount,
          email: email,
          contact: member.contact,
          donation: donation,
          fullName: member.fullName,
          profession: member.profession,
          year: member.year,
          payStatus: 0,
          timestamp: stamp
        })
      }
    }
  });

  return payObj;
}

export const verifyPayment = async (payRef: string) => {
  const url = `https://api.paystack.co/transaction/verify/${payRef}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer sk_live_2699e2da35431299f2842ea3219fda056e83f5e9`,
      // Authorization: `Bearer sk_test_265acb9b86de46afa9b166773bf933aa4edb8438`,
      // Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_API_KEY}`,
      'Cache-Control': 'no-cache'
    }
  })

  return response.status;
}