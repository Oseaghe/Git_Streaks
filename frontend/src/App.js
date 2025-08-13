import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiTrendingUp, FiCalendar, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import StreakForm from './components/StreakForm';
import StreakList from './components/StreakList';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import './styles/App.css';

const API_URL = '/api/streaks';

function App() {
  const [streaks, setStreaks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Check API health on component mount
  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      const response = await fetch(`${API_URL}/health`);
      if (response.ok) {
        setIsConnected(true);
      }
    } catch (err) {
      setIsConnected(false);
    }
  };

  const fetchStreaks = async (usernames) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernames }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch streak data');
      }

      const data = await response.json();
      setStreaks(data);
    } catch (err) {
      setError(err.message);
      setStreaks([]);
    } finally {
      setLoading(false);
    }
  };

  const clearStreaks = () => {
    setStreaks([]);
    setError(null);
  };

  return (
    <AppContainer>
      <Header isConnected={isConnected} />
      
      <MainContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>
            <FiGithub />
            GitHub Streak Tracker
          </Title>
          <Subtitle>
            Track your GitHub contribution streaks and stay motivated
          </Subtitle>
        </motion.div>

        <StreakForm onFetchStreaks={fetchStreaks} onClear={clearStreaks} />

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ErrorMessage>
                <FiXCircle />
                {error}
              </ErrorMessage>
            </motion.div>
          )}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingContainer>
                <LoadingSpinner />
                <LoadingText>Fetching streak data...</LoadingText>
              </LoadingContainer>
            </motion.div>
          )}

          {!loading && streaks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <StreakList streaks={streaks} />
            </motion.div>
          )}

          {!loading && !error && streaks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <EmptyState>
                <FiTrendingUp size={48} />
                <h3>No streaks to display</h3>
                <p>Enter GitHub usernames above to start tracking streaks</p>
              </EmptyState>
            </motion.div>
          )}
        </AnimatePresence>
      </MainContent>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: white;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  svg {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    svg {
      font-size: 1.8rem;
    }
  }
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  padding: 1rem;
  border-radius: 12px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
`;

const LoadingText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  font-weight: 500;
`;

const EmptyState = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  padding: 4rem 2rem;
  
  svg {
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    opacity: 0.8;
  }
`;

export default App; 