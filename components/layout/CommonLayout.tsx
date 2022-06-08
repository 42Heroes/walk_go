import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Nav from './Nav';

interface Props {
  children: React.ReactElement;
  headerText: string;
}

export default function CommonLayout({ children, headerText }: Props) {
  return (
    <Container>
      <EmptyBox />
      <Header headerText={headerText} />
      <Nav />
      <Main>{children}</Main>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 6rem 1fr;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
  width: 100vw;
`;

const Main = styled.main`
  min-width: 100%;
  min-height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const EmptyBox = styled.div`
  position: relative;
  ::before {
    content: '';
    position: absolute;
    height: 0.1rem;
    width: 50%;
    background-color: ${({ theme }) => theme.grayColor};
    bottom: 0;
    transform: translate(50%, -50%);
  }
  ::after {
    content: '';
    position: absolute;
    right: 0;
    height: 50%;
    width: 0.1rem;
    background-color: ${({ theme }) => theme.grayColor};
    transform: translate(50%, 50%);
  }
`;
