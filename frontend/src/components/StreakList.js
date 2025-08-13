import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiCalendar, FiCheckCircle, FiXCircle, FiUser, FiZap } from 'react-icons/fi';

const StreakList = ({ streaks }) => {
  const formatDate = (dateString) => {
    if (!dateString || dateString === 'Error fetching data' || dateString === 'GitHub API error') {
      return 'N/A';
    }
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const getStreakColor = (streak) => {
    if (streak >= 30) return '#10b981'; // Green for 30+ days
    if (streak >= 7) return '#f59e0b'; // Orange for 7+ days
    if (streak >= 1) return '#3b82f6'; // Blue for 1+ days
    return '#6b7280'; // Gray for 0 days
  };

  const getStreakMessage = (streak) => {
    if (streak >= 30) return '🔥 Amazing streak!';
    if (streak >= 7) return '🚀 Great momentum!';
    if (streak >= 1) return '💪 Keep it up!';
    return '📅 Start your streak today!';
  };

  return (
    <Container>
      <Title>
        <FiTrendingUp />
        Streak Results
      </Title>
      
      <Grid>
        {streaks.map((streak, index) => (
          <motion.div
            key={streak.username}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader>
                <UserInfo>
                  <UserIcon>
                    <FiUser />
                  </UserIcon>
                  <Username>{streak.username}</Username>
                </UserInfo>
                <StatusIndicator committedToday={streak.commitedToday}>
                  {streak.commitedToday ? (
                    <FiCheckCircle />
                  ) : (
                    <FiXCircle />
                  )}
                </StatusIndicator>
              </CardHeader>

              <StreakDisplay>
                <StreakNumber color={getStreakColor(streak.currentstreak)}>
                  {streak.currentstreak}
                </StreakNumber>
                <StreakLabel>Day{streak.currentstreak !== 1 ? 's' : ''} Streak</StreakLabel>
                <StreakMessage>{getStreakMessage(streak.currentstreak)}</StreakMessage>
              </StreakDisplay>

              <CardDetails>
                <DetailItem>
                  <FiCalendar />
                  <DetailLabel>Last Commit:</DetailLabel>
                  <DetailValue>{formatDate(streak.lastCommitDate)}</DetailValue>
                </DetailItem>
                
                <DetailItem>
                  <FiZap />
                  <DetailLabel>Today:</DetailLabel>
                  <DetailValue>
                    {streak.commitedToday ? (
                      <span style={{ color: '#10b981' }}>Committed ✓</span>
                    ) : (
                      <span style={{ color: '#ef4444' }}>No commits</span>
                    )}
                  </DetailValue>
                </DetailItem>
              </CardDetails>

              {streak.currentstreak > 0 && (
                <ProgressBar>
                  <ProgressFill 
                    streak={streak.currentstreak}
                    color={getStreakColor(streak.currentstreak)}
                  />
                </ProgressBar>
              )}
            </Card>
          </motion.div>
        ))}
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h2`
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    font-size: 1.8rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  
  svg {
    font-size: 1.2rem;
  }
`;

const Username = styled.h3`
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
`;

const StatusIndicator = styled.div`
  color: ${props => props.committedToday ? '#10b981' : '#ef4444'};
  font-size: 1.5rem;
`;

const StreakDisplay = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const StreakNumber = styled.div`
  font-size: 4rem;
  font-weight: 700;
  color: ${props => props.color};
  line-height: 1;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const StreakLabel = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const StreakMessage = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 400;
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  
  svg {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.6);
    min-width: 16px;
  }
`;

const DetailLabel = styled.span`
  font-weight: 500;
  min-width: 80px;
`;

const DetailValue = styled.span`
  font-weight: 400;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.color};
  border-radius: 3px;
  width: ${props => Math.min(props.streak * 2, 100)}%;
  transition: width 0.8s ease;
`;

export default StreakList; 