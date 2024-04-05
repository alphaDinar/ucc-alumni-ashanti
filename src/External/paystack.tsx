import axios from 'axios';
export const createPayLink = async (amount: number) => {
  const host = 'http://localhost:3000';
  // const host = 'https://www.maqete.com';
  const url = "https://api.paystack.co/transaction/initialize";

  const data = {
    email: "customer@email.com",
    amount: amount,
    callback_url: `${host}`,
    metadata: { cancel_action: `${host}/register` }
  };

  const response = await axios.post(url, data, {
    headers: {
      Authorization: `Bearer sk_test_265acb9b86de46afa9b166773bf933aa4edb8438`,
      // Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_API_KEY}`,
      'Cache-Control': 'no-cache'
    }
  })

  const payObj = {
    link: response.data.data.authorization_url,
    ref: response.data.data.reference
  }

  return payObj;
}

export const verifyPayment = async (payRef: string) => {
  const url = `https://api.paystack.co/transaction/verify/${payRef}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer sk_test_265acb9b86de46afa9b166773bf933aa4edb8438`,
      // Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_API_KEY}`,
      'Cache-Control': 'no-cache'
    }
  })

  return response.status;
}