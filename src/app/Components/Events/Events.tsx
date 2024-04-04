import Image from 'next/image';
import styles from './events.module.css'
import { MdOutlineSchedule } from 'react-icons/md';

const Events = () => {
  const place = 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1711121797/ucc%20alumni/Corporate-Event-Company-Picnics-Carnival-Ride-Rentals-Amusement-Games-Entertainers-Burgess-Events-1567_zf6nwj.jpg';

  return (
    <section className={styles.events}>
      {Array(3).fill('a').map((el, i) => (
        <div className={styles.event} key={i}>
          <div className={styles.imgBox}>
            <Image alt='event' src={place} fill sizes='auto' className='cover' />
          </div>
          <article>
            <legend>
              <span className='big'>14</span>
              <small className='cash'>Dec</small>
            </legend>
            <p>
              <span className='cut2'>Lorem ipsum dolor sit amet consectetur adipisicing elit consectetur adipisicing elit.</span>
              <strong className='cash'><MdOutlineSchedule /> 8: 00 - 10 : 00</strong>
            </p>
          </article>
        </div>
      ))}
    </section>
  );
}

export default Events;