import React from 'react';
import '../Home.css';
import Header from '../components/Header';
import ActiveQueues from '../components/ActiveQueues';
import TokenIssuing from '../components/TokenIssuing';

function Home() {
  return (
    <div className="page">
      <Header />
      <main className="mainContainer">
        <div className="contentWrapper">
          <ActiveQueues />
          <TokenIssuing />
        </div>
      </main>
    </div>
  );
}

export default Home;
