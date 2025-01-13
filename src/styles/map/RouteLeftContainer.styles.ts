import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 400px;
  height: 100vh;
  background: #101148;
  padding: 20px;
`;

export const Title = styled.h1`
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22.5px;
  color: #ffffff;
  margin-top: 30px;
`;

export const Description = styled.div`
  position: relative;
  margin-top: 10px;

  p {
    font-family: 'Gothic A1';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 37.5px;
    color: #ffffff;
    padding-right: 30px;
  }
`;

export const EditButton = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const Divider = styled.hr`
  position: absolute;
  width: 340px;
  height: 0px;
  left: 31px;
  top: 227px;
  border: 2px solid #d1c1ff;
  margin: 0;
`;

export const RouteList = styled.div`
  position: absolute;
  left: 31px;
  top: 250px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 337px;
`;

export const RouteItem = styled.div`
  position: relative;
  width: 337px;
  height: 48px;
`;

export const NumberBox = styled.div`
  position: absolute;
  width: 38px;
  height: 38px;
  left: 0px;
  top: 5px;
  background: #d1c1ff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Gothic A1';
  font-weight: 800;
  font-size: 23px;
  color: #252660;
`;

export const LocationBox = styled.div`
  position: absolute;
  width: 280px;
  height: 48px;
  left: 57px;
  top: 0;
  background: #ffffff;
  border-radius: 15px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-family: 'Gothic A1';
  font-weight: 600;
  font-size: 23px;
  color: #000000;
`;

export const RadioButton = styled.input`
  position: absolute;
  width: 28px;
  height: 28px;
  right: 9px;
  top: 10px;
  appearance: none;
  border-radius: 50%;
  background: #101148;
  cursor: pointer;
  border: 2px solid #ffffff;

  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    background: #ffffff;
    border-radius: 50%;
  }
`;

export const SaveButton = styled.button`
  position: absolute;
  width: 323px;
  height: 64px;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  background: #fff5d5;
  border-radius: 30px;
  font-family: 'Gothic A1';
  font-weight: 600;
  font-size: 24px;
  color: #101148;
  border: none;
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  position: absolute;
  width: 96px;
  height: 19px;
  left: 267px;
  bottom: 120px;
  font-family: 'Gothic A1';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 19px;
  color: #ffffff;
  background: none;
  border: none;
  cursor: pointer;
`;
