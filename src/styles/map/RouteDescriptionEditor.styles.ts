import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 272px; // 340 * 0.8
  height: 103px; // 129 * 0.8
  padding: 0px;
`;

export const InputArea = styled.div`
  position: relative;
  margin-top: 8px; // 10 * 0.8
  width: 272px; // 340 * 0.8
  z-index: 1;
`;

export const TextArea = styled.textarea`
  width: 272px; // 340 * 0.8
  height: 101px; // 126 * 0.8
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 24px; // 30 * 0.8
  line-height: 36px; // 45 * 0.8
  color: #999797;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  padding: 0;
  position: relative;
  z-index: 1;

  /* 스크롤바 완전히 숨기기 */
  overflow: hidden;

  /* 크로스 브라우저 지원을 위한 추가 속성들 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::placeholder {
    color: #999797;
  }
`;

export const DashedLine = styled.div<{ top: number }>`
  position: absolute;
  width: 272px; // 340 * 0.8
  left: 0px;
  top: ${(props) => props.top * 0.8}px; // top 값도 80%로 축소
  z-index: 2;
  height: 2px;
  background-image: linear-gradient(
    to right,
    #d1c1ff 0%,
    #d1c1ff 50%,
    transparent 50%,
    transparent 100%
  );
  background-size: 12px 2px; // 15 * 0.8, 점선의 간격도 축소
`;

export const EditButton = styled.button`
  position: absolute;
  right: -12px; // -15 * 0.8
  top: 80px; // 100 * 0.8
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 12px; // 15 * 0.8
  line-height: 15px; // 19 * 0.8
  color: #ffffff;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 3;
`;

export const CharCount = styled.span`
  position: absolute;
  right: 0;
  top: -20px;
  font-family: 'Gothic A1';
  font-size: 12px;
  color: #999797;
  z-index: 1;
`;
