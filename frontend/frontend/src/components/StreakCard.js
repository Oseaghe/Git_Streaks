// frontend/src/components/StreakCard.js

import React from 'react';
import './StreakCard.css';

const StreakCard = ({ user }) => {
    return (
        <div className="card">
            <h3>{user.username}</h3>
            <p>🔥 Streak: {user.currentStreak}</p>
            <p>🕒 Last Commit: {user.lastCommitDate}</p>
            <p>
                {user.committedToday ? (
                    <span className="fire">🔥 Committed Today!</span>
                ) : (
                    <span className="miss">❌ No commit today</span>
                )}
            </p>
        </div>
    );
};

export default StreakCard;
