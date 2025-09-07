import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 20px 0;

    @media (max-width: 480px) {
        gap: 5px;
        flex-direction: column;
    }
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: ${(p) => (p.$active ? "#007bff" : "#fff")};
  color: ${(p) => (p.$active ? "#fff" : "#333")};
  cursor: pointer;
  transition: background 0.2s ease;

    @media (max-width: 480px) {
        padding: 5px 8px;
        font-size: 0.9rem;
    }
    
  &:hover {
    background: ${(p) => (p.$active ? "#0056b3" : "#f0f0f0")};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
