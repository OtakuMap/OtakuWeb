import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import "../styles/font.css";
import kakaoIcon from '../assets/img/kakao-icon.png';
import naverIcon from '../assets/img/naver-icon.png';
import googleIcon from '../assets/img/google-icon.png';
import logoIcon from '../assets/logo.png';

const NewSetPWPage: React.FC = () => {
  const navigate = useNavigate(); 
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
      <LoginBox>
        <Title>
          <WelcomeText>WELCOME!</WelcomeText>
          <Logo src={logoIcon} />
        </Title>
        <InputBox>
          <Form>
            <FormGroup>
              <Label>ID</Label>
              <Input type="text" />
            </FormGroup>
            <Divider />
            <FormGroup>
              <Label>PW</Label>
              <Input type="password" />
            </FormGroup>
          </Form>
        </InputBox>
        <Actions>
          <ActionLink>아이디/비밀번호 찾기</ActionLink>
          <ActionLink onClick={() => navigate('/signup')}>회원가입</ActionLink>
        </Actions>
        <ActionLink2>간편 회원가입/로그인</ActionLink2>
        <SocialLogin>
          <SocialIcon src={kakaoIcon} alt="Kakao Login" />
          <SocialIcon src={naverIcon} alt="Naver Login" />
          <SocialIcon src={googleIcon} alt="Google Login" />
        </SocialLogin>
      </LoginBox>
    </Container>
  );
};

export default NewSetPWPage;

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

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 724px;
  background: #101148;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
`;

const Title = styled.div`
  text-align: center;
  color: #ffffff;
  margin-bottom: 20px;
`;

const WelcomeText = styled.h1`
  font-family: 'Pixelify Sans', sans-serif;
  font-weight: 600;
  font-size: 40px;
  margin-bottom: 10px;
`;

const Logo = styled.img`
  width: 286px;
  height: 44px;
`;

const InputBox = styled.div`
  width: 100%;
  background-color: #101148;
  border-radius: 20px;
  border: 2px solid #d1c1ff;
  padding: 20px;
  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-family: 'Pixelify Sans', sans-serif;
  font-size: 24px;
  font-weight: 600;
  text-align:left;
  color: #ffffff;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  background-color: #101148;
  color: #ffffff;
  border: none;
  outline: none;
  width: 80%;

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
  border: 0;
  height: 1px;
  background-color: #999797;
  width: 100%;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin-bottom: 20px;
`;

const ActionLink = styled.a`
  font-family: 'Gothic A1';
  font-size: 12px;
  color: #cccccc;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ActionLink2 = styled.a`
  font-family: 'Gothic A1';
  font-weight: 600;
  font-size: 15px;
  color: #cccccc;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialLogin = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const SocialIcon = styled.img`
  width: 68px;
  height: 68px;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s;
  }
`;
