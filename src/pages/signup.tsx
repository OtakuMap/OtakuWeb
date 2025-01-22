import styled from "styled-components";
import Backgroundimg from '../assets/logorepeat.png';

const SignupPage: React.FC = () => {
  return (
    <Container>
      <SignupBox>
        <Title>
          <SignupText>회원가입</SignupText>
        </Title>
        <InputBox>
          <Form>
            <FormGroup>
              <Label>이름(실명)</Label>
              <Input type="text" />
            </FormGroup>
          </Form>
          <Form>
          <Form2>
            <FormGroupShort>
              <Label>닉네임</Label>
              <Input type="text" />
            </FormGroupShort>
              <VerifyButton>중복 확인</VerifyButton>
          </Form2>
          <Form2>
            <FormGroupShort>
              <Label>ID</Label>
              <Input type="text" />
            </FormGroupShort>
              <VerifyButton>중복 확인</VerifyButton>
          </Form2>
        </Form>
        <Form>
            <FormGroup>
              <Label>E - mail</Label>
              <Input type="text" />
            </FormGroup>
          <Form2>
            <FormGroupShort>
              <Label>인증 번호</Label>
              <Input type="text" />
            </FormGroupShort>
              <VerifyButton>인증 하기</VerifyButton>
          </Form2>
        </Form>
        <Form3>
            <FormGroup>
              <Label>비밀번호</Label>
              <Input type="password" />
            </FormGroup>
            <FormGroup>
                <Label>비밀번호 확인</Label>
                <Input type="password" />
            </FormGroup>
        </Form3>
            <CheckboxGroup>
                <CheckboxItem>
                    <Checkbox id="check1" />
                    <CheckboxLabel>이용 약관 동의</CheckboxLabel>
                    <ActionLink2>펼치기</ActionLink2>
                </CheckboxItem>
                <CheckboxItem>
                    <Checkbox id="check2" />
                    <CheckboxLabel>개인정보 수집 이용 동의</CheckboxLabel>
                    <ActionLink2>펼치기</ActionLink2>
                </CheckboxItem>
                <CheckboxItem>
                    <Checkbox id="check3" />
                    <CheckboxLabel>만 14세 이상입니다</CheckboxLabel>
                </CheckboxItem>
            </CheckboxGroup>
        </InputBox>
        <Divider/>
        <Actions>
          <ActionLink>가입하기</ActionLink>
        </Actions>
      </SignupBox>
    </Container>
  );
};

export default SignupPage;

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


const SignupBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 661px;
  height: auto;
  max-height: 90%;
  background: #101148;
  border-radius: 20px;

`;
const Title = styled.div`
  display: flex;
  justify-content:center;
  text-align: center;
  color: #ffffff;  
  margin-top: 30px; 
  margin-bottom:30px;
`;

const SignupText = styled.h1`
  font-family: font-family: "Gothic A1", serif;
  font-weight: 600;
  font-size: 24px;
  line-height:30px;
`;

const InputBox = styled.div`
  width: 460px;
  background-color: #101148;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  
  overflow-y: auto; 
  overflow-x: hidden;
  scrollbar-width: none; 
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom:35px;
`;

const Form2 = styled.div`
  display: flex;
  flex-direction: space-between;
`;

const Form3 = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom:30px;
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

const FormGroupShort = styled.div`
  display: flex;
  justify-content: flex-start;;
  align-items: center;
  margin-bottom: 10px;
  width: 336px;
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
  width:58%;
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

const VerifyButton = styled.button`
  width: 93px;
  height: 60px;
  padding:0px;
  background-color: #bdaee5;
  margin-left:20px;
  color: #101148;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  line-height:17.5px;
  cursor: pointer;
  flex-shrink: 0; /* 버튼 크기 고정 */
  border : 2px solid #fff5d5;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  width:448px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 30px;
  height: 30px;

  accent-color: #bdaee5; /* 체크박스 색상 */
  cursor: pointer;
  border : 2px solid #fff5d5;
  margin-bottom:10px;
`;

const CheckboxLabel = styled.label`
  font-family: 'Gothic A1';
  font-size: 18px; /* 작은 글씨 크기 */
  color: #ffffff;
  text-align: right;
  flex: 1;
  margin-left:100px;
`;

const Divider = styled.hr`
  margin-top:27px; 
  margin-bottom:22px;
  height: 1px;
  background-color: #ffffff;
  width: 516px;
`;

const Actions = styled.div`
  display: flex;
  justify-content:center;
  width: 60%;
  margin-bottom: 20px;
`;

const ActionLink = styled.a`
  font-family: 'Gothic A1';
  font-size: 24px;
  color: #cccccc;
  cursor: pointer;
`;

const ActionLink2 = styled.a`
  font-family: 'Gothic A1';
  font-size: 18px;
  color: #999797;
  cursor: pointer;
  line-height:22.5px;
`;


