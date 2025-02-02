import { useState, useCallback } from 'react';
import {
  Container,
  SignupBox,
  Title,
  InputBox,
  FormGroup,
  Name,
  Input,
  InputShort,
  VerifyButton,
  VerifyButtonShort,
  FormGroup2,
  FormGroup3,
  FormGroup4,
  CheckboxGroup,
  CheckboxItem,
  Checkbox,
  CheckboxLabel,
  Divider,
  ActionLink,
  Openbutton,
  CheckIcon1,
  CheckIcon2,
} from '../styles/login/signup.style';
import { debounce } from '@/utils/debounce';
import { authAPI } from '../api/login/authAPI';
import Eyeopen from '../assets/img/eye-open.png';
import Eyeclose from '../assets/img/eye-close.png';
import O from '../assets/img/O.png';
import X from '../assets/img/X.png';

const SignupPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const debouncedSetUserId = useCallback(
    debounce((value: string) => {
      setUserId(value);
    }, 500),
    [],
  );

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleEmailVerificationCodeRequest = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    try {
      const emailCheckResponse = await authAPI.checkEmailDuplication(email);
      setIsEmailAvailable(emailCheckResponse.isSuccess);
      if (!emailCheckResponse.isSuccess) {
        alert('이메일이 중복되었습니다. 다른 이메일을 입력해주세요.');
        return;
      }
      const verificationResponse = await authAPI.sendEmailVerifyCode({ email });
      if (verificationResponse.isSuccess) {
        alert('인증번호가 이메일로 전송되었습니다.');
      } else {
        alert(verificationResponse.message);
      }
    } catch (error) {
      console.error('이메일 인증 코드 전송 실패:', error);
    }
  };
  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
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
      const response = await authAPI.emailVerifyCode(userData);
      alert(response.message);
    } catch (error) {
      console.error('이메일 인증 실패:', error);
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
            <InputShort
              type="text"
              value={userId}
              onChange={(e) => debouncedSetUserId(e.target.value)} // 디바운스된 함수 사용
              placeholder="ID를 입력해주세요"
            />
            <VerifyButton
              onClick={async () => {
                const response = await authAPI.checkIdDuplication(userId);
                setIsUserIdAvailable(response.isSuccess);
                alert(response.message);
              }}
            >
              중복 확인
            </VerifyButton>
          </FormGroup>

          <FormGroup2>
            <Name>E-mail</Name>
            <InputShort
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="otaku@gmail.com"
            />
            <CheckIcon1
              src={isEmailAvailable ? X : O}
              alt={isEmailAvailable ? 'Available' : 'Unavailable'}
            />
            <VerifyButtonShort onClick={handleEmailVerificationCodeRequest}>
              인증번호 받기
            </VerifyButtonShort>
          </FormGroup2>
          <FormGroup2>
            <Name>인증번호</Name>
            <InputShort
              type="text"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
              placeholder="인증번호 6자리를 입력해주세요"
            />
            <VerifyButton onClick={handleEmailVerification}>인증하기</VerifyButton>
          </FormGroup2>
          <FormGroup3>
            <Name>비밀번호</Name>
            <div style={{ position: 'relative' }}>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
              />
              <CheckIcon2
                src={showPassword ? Eyeopen : Eyeclose}
                alt={showPassword ? 'Show Password' : 'Hide Password'}
                onClick={handleTogglePasswordVisibility}
                style={{ position: 'absolute', right: '10px', cursor: 'pointer' }}
              />
            </div>
          </FormGroup3>

          <FormGroup4>
            <Name>비밀번호 확인</Name>
            <Input
              type="password"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
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
        <ActionLink onClick={() => alert('가입하기 버튼 클릭됨')}>가입하기</ActionLink>
      </SignupBox>
    </Container>
  );
};

export default SignupPage;
