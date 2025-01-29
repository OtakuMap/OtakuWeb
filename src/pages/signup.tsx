import {useState} from 'react';
import { Container, SignupBox, Title, InputBox,
  FormGroup, Name,Input, InputShort, VerifyButton, VerifyButtonShort,
  FormGroup2, FormGroup3, FormGroup4, DetailText, CheckboxGroup, CheckboxItem, Checkbox, 
  CheckboxLabel, Divider, ActionLink, Openbutton
 } from '../styles/login/signup.style';
import {authAPI} from '../api/login/authAPI';

const SignupPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value); 
  };

  const handleUserIdCheck = async () => {
    try {
      const response = await authAPI.checkIdDuplication(userId);
      setIsUserIdAvailable(response.isSuccess);
      alert(response.message); 
    } catch (error) {
      console.error('아이디 중복 확인 실패:', error);
    }
  };

  const handleEmailCheck = async () => {
    try {
      const response = await authAPI.checkEmailDuplication(email);
      setIsEmailAvailable(response.isSuccess);
      alert(response.message); 
    } catch (error) {
      console.error('이메일 중복 확인 실패:', error);
    }
  };

  const handleEmailVerification = async () => {
    const userData = {
      code: verificationCode,
      email,
    };
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    try {
      const response = await authAPI.EmailVerifyCode(userData); 
      alert(response.message); 
    } catch (error) {
      console.error('이메일 인증 실패:', error);
    }
  };

  const handleSignup = async () => {
    if (!isUserIdAvailable || !isEmailAvailable) {
      alert('아이디나 이메일 중복 확인을 먼저 해주세요.');
      return;
    }

    if (password !== passwordCheck) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      const userData = {
        name: '사용자 이름', 
        userId,
        email,
        password,
        passwordCheck,
      };
      const response = await authAPI.register(userData);
      if (response.isSuccess) {
        alert('회원가입 성공!');
      } else {
        alert(response.message); 
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <Container>
      <SignupBox>
        <Title>회원가입</Title>
        <InputBox>
          <FormGroup>
            <Name>이름</Name>
            <Input type="text" placeholder="이름을 입력해주세요" />
          </FormGroup>

          <FormGroup>
            <Name>ID</Name>
            <InputShort type="text" value={userId} onChange={handleUserIdChange} placeholder="ID를 입력해주세요" />
            <VerifyButton onClick={handleUserIdCheck}>중복 확인</VerifyButton>
          </FormGroup>

          <DetailText>• 6자 이상의 영문 혹은 영문과 숫자를 조합</DetailText>

          <FormGroup2>
            <Name>E-mail</Name>
            <InputShort type="text" value={email} onChange={handleEmailChange} placeholder="otaku@gmail.com" />
            <VerifyButtonShort onClick={handleEmailCheck}>인증번호 받기</VerifyButtonShort>
          </FormGroup2>

          <FormGroup2>
            <Name>인증번호</Name>
            <InputShort type="text" value={verificationCode} onChange={handleVerificationCodeChange} placeholder="인증번호 6자리를 입력해주세요" />
            <VerifyButton onClick={handleEmailVerification}>인증하기</VerifyButton>
          </FormGroup2>

          <FormGroup3>
            <Name>비밀번호</Name>
            <Input type="password" value={password} onChange={handlePasswordChange} placeholder="비밀번호를 입력해주세요" />
          </FormGroup3>

          <DetailText>• 10자 이상 입력</DetailText>
          <DetailText>• 영문/숫자/특수문자(공백제외)만 허용하며, 2개이상</DetailText>
          <DetailText>조합</DetailText>
          <DetailText>• 동일한 숫자 3개 이상 연속 사용 불가</DetailText>

          <FormGroup4>
            <Name>비밀번호 확인</Name>
            <Input type="password" value={passwordCheck} onChange={handlePasswordCheckChange} placeholder="비밀번호를 입력해주세요" />
          </FormGroup4>
        </InputBox>

        <CheckboxGroup>
          <CheckboxItem>
            <Checkbox id="check1" />
            <CheckboxLabel>이용 약관 동의</CheckboxLabel>
            <Openbutton>펼치기</Openbutton>
          </CheckboxItem>
          <CheckboxItem>
            <Checkbox id="check2" />
            <CheckboxLabel>개인정보 수집 이용 동의</CheckboxLabel>
            <Openbutton>펼치기</Openbutton>
          </CheckboxItem>
          <CheckboxItem>
            <Checkbox id="check3" />
            <CheckboxLabel>만 14세 이상입니다</CheckboxLabel>
          </CheckboxItem>
        </CheckboxGroup>

        <Divider />
        <ActionLink onClick={handleSignup}>가입하기</ActionLink>
      </SignupBox>
    </Container>
  );
};

export default SignupPage;