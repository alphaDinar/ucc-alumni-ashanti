import Image from 'next/image';
import styles from './home.module.css';
import { goalList } from '@/External/lists';
import Link from 'next/link';
import { MdOutlineFavoriteBorder, MdOutlineSchedule } from 'react-icons/md';
import Events from './Components/Events/Events';
import Donations from './Components/Donations/Donations';
import PayBox from './Components/PayBox/PayBox';
import Footer from './Components/Footer/Footer';
import HeadBox from './Components/HeadBox/HeadBox';


const Home = ({ searchParams }: { searchParams: { trxref: string, reference: string } }) => {
  return (
    <main className={styles.home}>
      <HeadBox searchParams={searchParams} />

      <section className={styles.goalBox} id='box'>
        <h3 className='headTag'>Our Goals</h3>
        <section className={styles.goals}>
          {goalList.map((goal, i) => (
            <article key={i}>
              <legend>
                {goal.iconEl}
              </legend>
              <p>
                <strong>{goal.tag}</strong>
                <span>{goal.text}</span>
              </p>
            </article>
          ))}
        </section>
      </section>

      <section className={styles.donateBox} style={{ background: 'black' }}>
        <section className={styles.left} >
          <div className={styles.imgBox}>
            <Image alt='' className='cover' src={'https://res.cloudinary.com/dvnemzw0z/image/upload/v1711120263/ucc%20alumni/CSR_Icons_1920x1080_donation-request_zhcxlo.png'} fill sizes='auto' />
          </div>
          <p>
            <strong>Featured Event</strong>
            <span className='cash'>2000 <MdOutlineFavoriteBorder /></span>
          </p>
        </section>
        <section className={styles.right}>
          <strong>School Homecoming</strong>
          <small className='cash'><MdOutlineSchedule /> 3 weeks left</small>
          <Link href={'/'}>View</Link>
        </section>
      </section>

      <section className={styles.eventBox} id='box'>
        <h3 className='headTag'>Events</h3>
        <Events />
      </section>

      <section className={styles.donateBox}>
        <section className={styles.left}>
          <div className={styles.imgBox}>
            <Image alt='' className='cover' src={'https://res.cloudinary.com/dvnemzw0z/image/upload/v1711120263/ucc%20alumni/CSR_Icons_1920x1080_donation-request_zhcxlo.png'} fill sizes='auto' />
          </div>
          <p>
            <strong>Featured Donation</strong>
            <span className='cash'>2000 <MdOutlineFavoriteBorder /></span>
          </p>
        </section>
        <section className={styles.right}>
          <strong>School Park Renovation</strong>
          <small className='cash'><MdOutlineSchedule /> 3 weeks ago</small>
          <Link href={'/'}>Donate</Link>
        </section>
      </section>

      <section className={styles.eventBox} id='box'>
        <h3 className='headTag'>Donations</h3>
        <Donations />
      </section>

      <PayBox />

      <Footer />
    </main>
  );
}

export default Home;