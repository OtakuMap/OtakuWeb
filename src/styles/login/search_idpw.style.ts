import styled from "styled-components";
import Backgroundimg from '../../assets/logorepeat.png';
import '../font.css';

export const Container = styled.div`
  display: flex;
  flex-direction: center;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  background-image: url(${Backgroundimg});
  background-size: cover;
  background-position: center;
`;

export const SearchIdPwBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items: center;
  position: relative;
  width: 661px;
  height: auto;
  max-height:90%;
  background: #101148;
  border-radius: 20px;
  overflow-y: auto; 
  scrollbar-width: none; 
`;

export const Section = styled.div`
  width: 600px;
  margin-bottom: 34px;
  display:flex;
  flex-direction: column;
  align-items:center;
`;

export const Title = styled.div`
  font-family: 'Gothic A1', serif;
  text-align: center;
  color: #ffffff;
  margin-bottom: 35px;
  margin-top: 30px;
  font-size: 24px;
  font-weight: 600;
  line-height:30px;
`;

export const FormGroup = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Name = styled.label`
  position: relative;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  color: #ffffff;
  margin-left: 25px;
  width: 153.73px;
  flex-shrink: 0;
`;

export const Input = styled.input`
  width: 395.25px;
  height: 60px;
  padding: 20px 20px;
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

export const InputShort = styled.input`
  width: 303px;
  height: 60px;
  padding: 20px 20px;
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

export const ActionButton = styled.button`
  background-color: #b8effd;
  color: #101148;
  border-radius: 30px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  width: 174px;
  height: 60px;
  margin-top: 35px;
  padding: 0px;
`;

export const ActionButtonShort = styled.button`
  background-color: #bdaee5;
  color: #101148;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  padding: 0px;
  width: 84px;
  height: 60px;
  margin-left:7px;
`;

export const Divider = styled.hr`
  border: 1px solid #ffffff;
  width: 600px;
  position: relative;
  z-index: 1; 
`;
export const DetailText = styled.div`
  font-family: 'Gothic A1';
  font-weight: 500;
  font-size: 18px;
  line-height:22.5px;
  text-align: center;
  color: #ffffff;
  margin-top: 20px;
  margin-bottom: 27px;
`;
