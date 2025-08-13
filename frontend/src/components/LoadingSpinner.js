import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingSpinner = ({ size = 40, color = 'white' }) => {
  return (
    <SpinnerContainer size={size}>
      <Spinner size={size} color={color} />
    </SpinnerContainer>
  );
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

const Spinner = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid ${props => props.color};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default LoadingSpinner; 