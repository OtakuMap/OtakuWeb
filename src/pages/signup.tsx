import styled from "styled-components";
import logoIcon from '../assets/logo.png';

const SignupPage: React.FC = () => {
  return (
    <Container>
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <Row key={rowIndex} rowIndex={rowIndex}>
          {Array.from({ length: 10 }).map((_, colIndex) => (
            <LogoTile
              key={`${rowIndex}-${colIndex}`}
              src={logoIcon}
              rowIndex={rowIndex}
              colIndex={colIndex}
            />
          ))}
        </Row>
      ))}
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
            <FormGroup>
              <Label>닉네임</Label>
              <Input type="text" />
              <VerifyButton>인증하기</VerifyButton>
            </FormGroup>
            <FormGroup>
              <Label>ID</Label>
              <Input type="text" />
              <VerifyButton>인증하기</VerifyButton>
            </FormGroup>
            <FormGroup>
              <Label>E - mail</Label>
              <Input type="text" />
            </FormGroup>
            <FormGroup>
              <Label>인증 번호</Label>
              <Input type="text" />
              <VerifyButton>인증하기</VerifyButton>
            </FormGroup>
            <FormGroup>
              <Label>비밀번호</Label>
              <Input type="password" />
            </FormGroup>
            <FormGroup>
                <Label>비밀번호 확인</Label>
                <Input type="password" />
            </FormGroup>
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
          </Form>
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
  background: #101148;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const Row = styled.div<{ rowIndex: number }>`
  position: absolute;
  top: ${({ rowIndex }) => `${10 + rowIndex * 147}px`};
  width: 100%;
  display: flex;
  justify-content: ${({ rowIndex }) =>
    rowIndex % 2 === 0 ? "flex-start" : "flex-end"};
`;

const LogoTile = styled.img<{ rowIndex: number; colIndex: number }>`
  width: 948px;
  height: 147px;
  margin: 10px;
  opacity: ${({ rowIndex, colIndex }) =>
    0.8 - rowIndex * 0.1 - colIndex * 0.01};
`;

const SignupBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width:528px;
  height: 570px;
  background: #101148;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
`;

const Title = styled.div`
  text-align: center;
  color: #ffffff;
  margin-bottom: 5px;
`;

const SignupText = styled.h1`
  font-family: font-family: "Gothic A1", serif;
  font-weight: 600;
  font-size: 24px;
  line-height:30px;
  margin-bottom: 10px;

`;

const InputBox = styled.div`
  width: 100%;
  background-color: #101148;
  border-radius: 20px;
  margin-bottom: 5px;
  display: flex; /* flexbox를 사용 */
  flex-direction: column; /* 자식 요소들이 수직으로 쌓이도록 */
  align-items: center; /* 자식 요소들이 수평으로 중앙 정렬되도록 */
  `;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  width: 448px;
  hight :60px;
  background-color: #101148;
  border-radius: 20px;
  border: 2px solid #d1c1ff;
`;

const Label = styled.label`
  font-family: 'Gothic A1';
  font-size: 16px;
  font-weight: 600;
  color: #999797;
  margin-left: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  background-color: #101148;
  color: #ffffff;
  border: none;
  outline: none;
  width: 130px;

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
  background-color: #bdaee5;
  color: #101148;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0; /* 버튼 크기 고정 */
  border : 2px solid #fff5d5;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  height: 1px;
  background-color: #ffffff;
  width: 100%;
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

`;


