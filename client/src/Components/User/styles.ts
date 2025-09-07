import styled from 'styled-components';


export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin: 20px auto;
    max-width: 900px;


    @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
        max-width: 700px;
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        max-width: 90%;
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 15px;
        margin: 10px;
    }
    
`;

export const Avatar = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 12px;


    @media (max-width: 480px) {
        width: 60px;
        height: 60px;
    }
`;

export const UserName = styled.h3`
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: #333;
`;

export const PublicRepoBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: mediumpurple;
  color: white;
  font-size: 12px;
  font-weight: bold;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.a`
  display: block;
  text-decoration: none;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  color: inherit;
  cursor: pointer;
  position: relative;  

  &:hover {
    transform: translateY(-4px);
  }
`;
