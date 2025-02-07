import styled from "styled-components";
import Backgroundimg from '../../assets/logorepeat.png';
import '../font.css';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  background-image: url(${Backgroundimg});
  background-size: cover; // 화면 크기에 맞게 이미지 크기 조정
  background-position: center;  // 이미지 중앙 정렬
`;

export const NewsetpwBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 661px;
  height: 454px;
  background: #101148;
  border-radius: 20px;
`;

export const Title = styled.label`
  font-family: 'Gothic A1';
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #ffffff;
  margin-top: 27px;
  margin-bottom: 37px;
`;

export const Name = styled.label`
  position: relative;
  text-align: center;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  color: #ffffff;
  width: 124px;
  margin-right: 22px;
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  box-sizing: border-box;
  margin-bottom:10px;
  width: 492px;
`;

export const Input = styled.input`
  width: 346px;
  height: 60px;
  padding: 17px 17px;
  font-size: 18px;
  background-color: #101148;
  color: #ffffff;
  border: 2px solid #d1c1ff;
  border-radius: 20px;
  &::placeholder {
    color: #999797;
    font-size: 18px;
  }
  &:-webkit-autofill {
    background-color: #101148 !important;
    -webkit-text-fill-color: #ffffff !important;
    -webkit-box-shadow: 0 0 0px 1000px #101148 inset !important;
    color: #ffffff !important;
  }
`;

export const DetailText = styled.label`
  text-align: flex-start;
  font-family: 'Gothic A1';
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #999797;
  width: 419px;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  margin-top: 24px;
`;

export const Divider = styled.hr`
  border: 1px solid #ffffff;
  width: 600px;
  margin-top: 29px;
`;

export const ActionLink = styled.label`
  font-family: 'Gothic A1';
  font-size: 24px;
  color: #ffffff;
  line-height: 30px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 23px;
  margin-bottom: 31px;
  `;
