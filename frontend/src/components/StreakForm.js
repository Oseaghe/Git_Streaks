import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSearch, FiX, FiUser, FiPlus } from 'react-icons/fi';

const StreakForm = ({ onFetchStreaks, onClear }) => {
  const [usernames, setUsernames] = useState(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUsernameChange = (index, value) => {
    const newUsernames = [...usernames];
    newUsernames[index] = value;
    setUsernames(newUsernames);
  };

  const addUsernameField = () => {
    setUsernames([...usernames, '']);
  };

  const removeUsernameField = (index) => {
    if (usernames.length > 1) {
      const newUsernames = usernames.filter((_, i) => i !== index);
      setUsernames(newUsernames);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validUsernames = usernames.filter(username => username.trim() !== '');
    
    if (validUsernames.length === 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onFetchStreaks(validUsernames);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setUsernames(['']);
    onClear();
  };

  return (
    <FormContainer>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FormTitle>
          <FiUser />
          Enter GitHub Usernames
        </FormTitle>
        
        <FormDescription>
          Add one or more GitHub usernames to track their contribution streaks
        </FormDescription>

        <UsernameFields>
          {usernames.map((username, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <UsernameField>
                <InputWrapper>
                  <FiUser />
                  <Input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={(e) => handleUsernameChange(index, e.target.value)}
                    disabled={isSubmitting}
                  />
                </InputWrapper>
                {usernames.length > 1 && (
                  <RemoveButton
                    type="button"
                    onClick={() => removeUsernameField(index)}
                    disabled={isSubmitting}
                  >
                    <FiX />
                  </RemoveButton>
                )}
              </UsernameField>
            </motion.div>
          ))}
        </UsernameFields>

        <AddButton
          type="button"
          onClick={addUsernameField}
          disabled={isSubmitting}
        >
          <FiPlus />
          Add Another Username
        </AddButton>

        <ButtonGroup>
          <SubmitButton
            type="submit"
            disabled={isSubmitting || usernames.every(u => u.trim() === '')}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner />
                Fetching Streaks...
              </>
            ) : (
              <>
                <FiSearch />
                Get Streaks
              </>
            )}
          </SubmitButton>

          <ClearButton
            type="button"
            onClick={handleClear}
            disabled={isSubmitting}
          >
            Clear
          </ClearButton>
        </ButtonGroup>
      </motion.form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    font-size: 1.3rem;
  }
`;

const FormDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const UsernameFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const UsernameField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.1rem;
    z-index: 1;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled.button`
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.3);
    border-color: rgba(239, 68, 68, 0.5);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  svg {
    font-size: 1.1rem;
  }
`;

const AddButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  svg {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: none;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 200px;
  justify-content: center;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  svg {
    font-size: 1.1rem;
  }
`;

const ClearButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default StreakForm; 