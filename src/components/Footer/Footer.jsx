import React from 'react';
// Styled Components
import styled from 'styled-components';

const FooterMain = styled.div`
  font-family: 'bebas';
  font-weight: normal;
  padding: 20px 0;
  background-color: #333;
  color: #fefefe;
  font-size: 10px;
  display: flex;
  justify-content: center;
`;

const Github = styled.a`
  text-decoration: none;
  color: inherit;
  :hover {
    color: #9e9e9e;
  }
`;

function Footer() {
  return (
    <FooterMain>
      <span>
        Created by Daniel Ochoa -{' '}
        <Github href="https://github.com/LordDoH">@LordDoH</Github>
      </span>
    </FooterMain>
  );
}

export default Footer;
