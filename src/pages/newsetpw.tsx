// newsetpw
import styled from "styled-components";
import Backgroundimg from '../assets/logorepeat.png';

const NewSetPWPage: React.FC = () => {
  return (
    <Container>
      <NewsetpwBox>
          <Text>새로운 비밀번호 설정</Text>
          <Form>
            <FormGroup>
              <Label>새로운 비밀번호 입력</Label>
              <Input type="text" />
            </FormGroup>
            <FormGroup>
              <Label>비밀번호 확인</Label>
              <Input type="password" />
            </FormGroup>
          </Form>
        <DetailText>
          영문, 숫자, 특수문자 중 2종류 이상으로
          최소 10자리 이상 또는 3종류 이상을 조합하하여 최소 8자리 이상의 길이로 구현하여야 합니다.
        </DetailText>
        <Divider />
        <Actions>
          <ActionLink>설정하기</ActionLink>
        </Actions>
      </NewsetpwBox>
    </Container>
  );
};

export default NewSetPWPage;

const Container = styled.div`
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

const NewsetpwBox = styled.div`
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

const Text = styled.label`
  font-family: 'Gothic A1';
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #ffffff;
`;

const DetailText = styled.label`
  font-family: 'Gothic A1';
  font-weight: 500;
  font-size: 16px;
  line-height:20px;
  color: #999797;
  width:577px;
  margin-bottom:20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:35px;
  margin-bottom:40px;
`;


const FormGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  width: 448px;
  hight :60px;
  background-color: #101148;
  border-radius: 20px;
  border: 2px solid #d1c1ff;
  box-sizing: border-box;
`;

const Label = styled.label`
  position:relative;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
  line-height:25px;
  color: #999797;
  margin-left: 20px;
  flex-shrink: 0;
`;

const Input = styled.input`
  font-size: 20px;
  background-color: #101148;
  color: #ffffff;
  border: none;
  outline: none;
  height: 56px;
  flex-shrink: 0;
  width:45%;
  margin-left:10px;
  &:focus {
    background-color: #101148;
    color: #ffffff;
  }

  &:-webkit-autofill {
    background-color: #101148 !important;
    -webkit-text-fill-color: #ffffff !important;  /* 자동 완성된 텍스트 색상 */
    -webkit-box-shadow: 0 0 0px 1000px #101148 inset !important;
    color: #ffffff !important;
  }
`;

const Divider = styled.hr`
  border: 1px solid #ffffff;
  width: 600px;
  margin-bottom:20px;
`;

const Actions = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ActionLink = styled.label`
  font-family: 'Gothic A1';
  font-size: 24px;
  color: #ffffff;
  cursor: pointer;
`;
