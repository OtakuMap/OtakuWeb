import styled from 'styled-components';

const IPHONE_15_BREAKPOINT = '430px';

export const PageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    flex-direction: column;
    position: relative;
  }
`;

export const MapWrapper = styled.div`
  flex: 1;
  height: 100vh;
  position: relative;
  margin: 0;
  padding: 0;

  @media (max-width: ${IPHONE_15_BREAKPOINT}) {
    width: 100%;
    height: 100vh;
  }
`;
