import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 340px;
  height: 129px;
  padding: 0px;
`;

export const InputArea = styled.div`
  position: relative;
  margin-top: 10px;
  width: 340px;
  z-index: 1; // z-index 추가
`;

export const TextArea = styled.textarea`
  width: 340px;
  height: 126px;
  //   min-height: 84px; // 두 줄 높이
  //   max-height: 126px; // 세 줄 높이
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 45px; // 줄 높이를 점선 간격과 맞춤
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
  width: 340px;
  left: 0px;
  top: ${(props) => props.top}px;
  z-index: 2;
  height: 2px; // 선의 두께
  background-image: linear-gradient(
    to right,
    #d1c1ff 0%,
    #d1c1ff 50%,
    transparent 50%,
    transparent 100%
  );
  background-size: 15px 2px; // 점선의 간격 조절 (전체 길이, 두께)
`;

export const EditButton = styled.button`
  position: absolute;
  right: -15px;
  top: 100px;
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: #ffffff;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 3; // 가장 위에 위치
`;
