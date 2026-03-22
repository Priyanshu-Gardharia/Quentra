import React from 'react';
import QueueCard from './QueueCard';
import iconGroup4 from '../assets/react.svg'; 
import iconGroup5 from '../assets/react.svg';

const ActiveQueues = () => {
  const groupIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2364748b'%3E%3Cpath d='M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'%3E%3C/path%3E%3C/svg%3E";

  const queues = [
    {
      title: "General Medicine",
      room: "Room 101- Dr. Mehta",
      nowServing: "GM-104",
      nextToken: "GM-105",
      avgWait: "12 mins",
      icon: groupIcon,
      avgWaitColor: "#f1ad7d"
    },
    {
      title: "Orthopedics",
      room: "Room 102- Dr. shah",
      nowServing: "OR-012",
      nextToken: "OR-013",
      avgWait: "8 mins",
      icon: groupIcon,
      avgWaitColor: "#16beab"
    },
    {
      title: "Pediatrics",
      room: "Room 103- Dr. sarah",
      nowServing: "PD-045",
      nextToken: "PD-046",
      avgWait: "25 mins",
      icon: groupIcon,
      avgWaitColor: "#EF4444"
    }
  ];

  return (
    <section className="leftSection" aria-label="Active queues">
      <div className="sectionHeader">
        <h1 className="sectionTitle">Active Queues</h1>
        <div className="opdPill">
          <span className="opdText">OPD</span>
        </div>
      </div>

      <div className="queueGrid">
        {queues.map((queue, index) => (
          <QueueCard key={index} {...queue} />
        ))}
      </div>
    </section>
  );
};

export default ActiveQueues;
