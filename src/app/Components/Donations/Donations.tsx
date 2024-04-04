import Image from 'next/image';
import styles from './donations.module.css'
import { MdOutlineSchedule } from 'react-icons/md';
import Link from 'next/link';

const Donations = () => {
  const place = 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1711121407/ucc%20alumni/Jebel-Ali_i66uqk.jpg';

  return (
    <section className={styles.donations}>
      {Array(3).fill('a').map((el,i) => (
        <Link href={'/'} className={styles.donation} key={i}>
          <div className={styles.imgBox}>
            <Image alt='event' src={place} fill sizes='auto' className='cover' />
          </div>

          <article>
            <span className='cut2'>Lorem ipsum dolor sit amet consectetur adipisicing elit consectetur adipisicing elit.</span>
            <small className='cash'><MdOutlineSchedule /> 3 weeks ago</small>
            <button>Donate</button>
          </article>
        </Link>
      ))}
    </section>
  );
}

export default Donations;