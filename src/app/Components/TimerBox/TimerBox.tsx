'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';


interface defType extends Record<string, any> { };
const TimerBox = () => {
  const logo = 'https://res.cloudinary.com/dvnemzw0z/image/upload/v1712195349/projects/yotabyt_logo_trans_main_ue6hsh.png'
  const [timeLeft, setTimeLeft] = useState<defType>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date('2024-05-04') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
        minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0'),
        seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, '0'),
      };
    }

    return timeLeft;
  }

  return (
    <div className='timerBox'>
      <legend>
        <span>{timeLeft.days}</span>
        <span>:</span>
        <span>{timeLeft.hours}</span>
        <span>:</span>
        <span>{timeLeft.minutes}</span>
        <span>:</span>
        <span>{timeLeft.seconds}</span>
      </legend>


    </div>
  );
};

export default TimerBox;
