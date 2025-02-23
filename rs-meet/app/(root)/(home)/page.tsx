'use client';
import { useState, useEffect } from 'react';
import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString('en-Bn', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      );

      setDate(
        new Intl.DateTimeFormat('en-Bn', { dateStyle: 'full' }).format(now),
      );
    };

    updateDateTime(); // Initial call to set the values immediately

    const interval = setInterval(updateDateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup when the component unmounts
  }, []);

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            Schedule your meeting & enjoy 💖
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
      <div id="container-4acfee4fec061346e24c489b7a6f5dba"></div>
    </section>
  );
};

export default Home;
