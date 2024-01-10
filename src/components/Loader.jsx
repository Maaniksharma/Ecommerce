import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  animation: ${spin} 2s linear infinite;
`;

export default Loader;
