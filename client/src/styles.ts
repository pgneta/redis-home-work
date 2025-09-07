import styled, { createGlobalStyle } from 'styled-components';

export const Styles = createGlobalStyle`

    body {
        font-family: 'Arial', sans-serif;
        background-color: #282c34;
        color: white;
        text-align: center;
        min-height: 100vh;
    }
    
    a {
        text-decoration: none;
        color: #61dafb;
    }

    input, button {
        font-family: inherit;
    }
`;

export const Header = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  padding: 2rem 1rem;
  text-align: center;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 0;
  }
  p {
    font-size: 1.1rem;
    margin-top: 0.5rem;
    opacity: 0.8;
  }
`;


export const LoadingMessage = styled.div`
  padding: 10px 15px;
  margin: 10px 0;
  font-style: italic;
  color: #555;
`;

export const TotalCountMessage = styled.div`
  color: mediumpurple;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 2rem;
  display: inline-flex;
  gap: 1.5rem;
  align-items: center;
`;

export const ErrorMessage = styled.div`
  background-color: #ffe0e0;
  color: #b00020;
  padding: 10px 15px;
  border-radius: 6px;
  margin: 10px 0;
  font-weight: bold;

    @media (max-width: 480px) {
        font-size: 0.9rem;
        padding: 8px 10px;
    }
`;
