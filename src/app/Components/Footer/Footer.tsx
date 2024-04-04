import Image from 'next/image';
import styles from './footer.module.css';
import { logo } from '@/External/lists';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { MdSend } from 'react-icons/md';

const Footer = () => {
  return (
    <section className={styles.footerBox} id='box'>
      <Image alt='' src={logo} width={100} className='contain' height={120} />

      <section className={styles.con}>

        <article>
          <strong>Quick Links</strong>
          <p>
            <Link href={''}>Donations</Link>
            <Link href={''}>Events</Link>
            <Link href={''}>Register</Link>
          </p>
        </article>

        <legend>
          <Link href={''}><FaFacebookF /></Link>
          <Link href={''}><FaXTwitter /></Link>
          <Link href={''}><FaInstagram /></Link>
        </legend>


        <form>
          <div>
            <input type="text" placeholder='E-mail' />
          </div>
          <div>
            <textarea name="" placeholder='Message'></textarea>
          </div>
          <button><MdSend /></button>
        </form>
      </section>

      <hr />

      <span style={{ color: 'wheat' }}>Powered By Yotabyt</span>
    </section>
  );
}

export default Footer;