'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from './timerBox.module.css';
import { MdTimer } from 'react-icons/md';


interface defType extends Record<string, any> { };
const TimerBox = () => {
  const logo = 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1712195349/projects/yotabyt_logo_trans_main_ue6hsh.png'
  const [timeLeft, setTimeLeft] = useState<defType>(calculateTimeLeft());
  const [mark, setMark] = useState<number>(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft().timeLeft);
      setMark(calculateTimeLeft().difference);
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date('2024-05-20') - +new Date();
    // console.log(mark);

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
        minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0'),
        seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, '0'),
      };
    }

    return { timeLeft, difference };
  }

  return (
    <div className='timerBox'>
      {mark > 0 ?
        <legend>
          <span>{timeLeft.days}</span>
          <span>:</span>
          <span>{timeLeft.hours}</span>
          <span>:</span>
          <span>{timeLeft.minutes}</span>
          <span>:</span>
          <span>{timeLeft.seconds}</span>
        </legend>
        :
        <section className={styles.blockBox}>
          <div>
            <MdTimer />
            <strong>
              oop, Your free Yotabyt hosting trial is over..
            </strong>
          </div>
        </section>
      }

    </div>
  );
};

export default TimerBox;
