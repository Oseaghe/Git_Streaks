import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiWifi, FiWifiOff, FiGithub } from 'react-icons/fi';

const Header = ({ isConnected }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <FiGithub />
          <span>GitStreak</span>
        </Logo>
        
        <ConnectionStatus>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {isConnected ? (
              <ConnectedIndicator>
                <FiWifi />
                <span>Connected</span>
              </ConnectedIndicator>
            ) : (
              <DisconnectedIndicator>
                <FiWifiOff />
                <span>Disconnected</span>
              </DisconnectedIndicator>
            )}
          </motion.div>
        </ConnectionStatus>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  
  svg {
    font-size: 1.8rem;
  }
`;

const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
`;

const ConnectedIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #10b981;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 20px;
  
  svg {
    font-size: 1rem;
  }
`;

const DisconnectedIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ef4444;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 20px;
  
  svg {
    font-size: 1rem;
  }
`;

export default Header; 