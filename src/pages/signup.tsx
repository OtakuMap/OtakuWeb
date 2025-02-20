import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
  TermsContent,
  Terms,
  Text,
  DetailText,
} from '../styles/login/signup.style';
/*import { debounce } from '@/utils/debounce';*/
import { authAPI } from '../api/login/authAPI';
import Eyeopen from '../assets/img/eye-open.png';
import Eyeclose from '../assets/img/eye-close.png';
import O from '../assets/img/O.png';
import X from '../assets/img/X.png';
import terms3 from '../assets/img/term3.png';
import terms4 from '../assets/img/term4.png';
import terms5 from '../assets/img/term5.png';
import terms6 from '../assets/img/terms6.png';
import terms7 from '../assets/img/terms7.png';
import terms8 from '../assets/img/terms8.png';
import terms9 from '../assets/img/terms9.png';
import terms10 from '../assets/img/terms10.png';
import terms11 from '../assets/img/terms11.png';
import terms12 from '../assets/img/terms12.png';
import terms13 from '../assets/img/terms13.png';
import terms14 from '../assets/img/terms14.png';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(false);
  const [isEmailAvailable, setIsEmailAvailable] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const isAllChecked = isChecked1 && isChecked2 && isChecked3;

  const [expandedTerms, setExpandedTerms] = useState({
    terms: false,
    privacy: false,
  });

  const toggleTerms = (key: 'terms' | 'privacy') => {
    setExpandedTerms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleEmailVerificationCodeRequest = async () => {
    setIsEmailChecked(true);
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    try {
      // 이메일 중복 체크
      const emailCheckResponse = await authAPI.checkEmailDuplication(email);

      if (emailCheckResponse.isSuccess) {
        alert('이메일이 사용 가능합니다. 인증번호를 전송합니다.');

        // 인증번호 요청 API 호출
        const verificationResponse = await authAPI.sendEmailVerifyCode({ email });
        if (verificationResponse.isSuccess) {
          alert('인증번호가 이메일로 전송되었습니다.');
          setIsEmailAvailable(true); // 이메일 인증 전송 성공 시
        } else {
          alert(verificationResponse.message);
          setIsEmailAvailable(false); // 인증번호 전송 실패 시
        }
      } else {
        alert('이 이메일은 이미 사용 중입니다.');
        setIsEmailAvailable(false); // 이메일 중복 시 X 표시
      }
    } catch (error) {
      console.error('이메일 인증 코드 전송 실패:', error);
      setIsEmailAvailable(false); // 에러 발생 시 X 표시
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

  const handleSignup = async () => {
    if (!name || !userId || !email || !password || !passwordCheck || !verificationCode) {
      alert('모든 필드를 올바르게 입력해주세요.');
      return;
    }

    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      // 이메일 중복 체크 (회원가입 전에 이메일이 이미 등록된 경우 X 아이콘 표시)
      const emailCheckResponse = await authAPI.checkEmailDuplication(email);

      if (!emailCheckResponse.isSuccess) {
        alert('이 이메일은 이미 사용 중입니다.');
        setIsEmailAvailable(false); // 이메일이 중복되면 X 표시
        return;
      }

      if (!isAllChecked) {
        alert('모든 약관에 동의해야 합니다.');
        return;
      }

      const signupData = {
        userId,
        email,
        password,
        passwordCheck,
        name,
        role: 'USER',
        status: 'ACTIVE',
      };
      console.log('Signup data:', signupData);
      const response = await authAPI.register(signupData);

      if (response.isSuccess) {
        alert('회원가입이 완료되었습니다!');
        navigate('/login');
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <SignupBox>
        <Title>회원가입</Title>
        <InputBox>
          <FormGroup>
            <Name>이름</Name>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해주세요"
            />
          </FormGroup>
          <FormGroup>
            <Name>ID</Name>
            <InputShort
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)} // 디바운스된 함수 사용
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
          <Text>
            <DetailText>• 6자 이상의 영문 혹은 영문과 숫자를 조합 </DetailText>
          </Text>

          <FormGroup2>
            <Name>E-mail</Name>
            <InputShort
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="otaku@gmail.com"
            />
            {isEmailChecked && (
              <CheckIcon1
                src={isEmailAvailable ? O : X}
                alt={isEmailAvailable ? 'Available' : 'Unavailable'}
              />
            )}
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
          <Text>
            <DetailText>• 10자 이상 입력</DetailText>
            <DetailText>• 영문/숫자/특수문자(공백제외)만 허용하며, 2개 이상 조합</DetailText>
            <DetailText>• 동일한 숫자 3개 이상 연속 사용 불가</DetailText>
          </Text>

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
            <Checkbox
              id="check1"
              checked={isChecked1}
              onChange={() => setIsChecked1(!isChecked1)}
            />
            <CheckboxLabel>이용 약관 동의</CheckboxLabel>
            <Openbutton onClick={() => toggleTerms('terms')}>
              {expandedTerms.terms ? '접기' : '펼치기'}
            </Openbutton>
          </CheckboxItem>
          {expandedTerms.terms && (
            <TermsContent>
              <Terms src={terms5} />
              <Terms src={terms6} />
              <Terms src={terms7} />
              <Terms src={terms8} />
              <Terms src={terms9} />
              <Terms src={terms10} />
              <Terms src={terms11} />
              <Terms src={terms12} />
              <Terms src={terms13} />
              <Terms src={terms14} />
            </TermsContent>
          )}

          <CheckboxItem>
            <Checkbox
              id="check2"
              checked={isChecked2}
              onChange={() => setIsChecked2(!isChecked2)}
            />
            <CheckboxLabel>개인정보 수집 이용 동의</CheckboxLabel>
            <Openbutton onClick={() => toggleTerms('privacy')}>
              {expandedTerms.privacy ? '접기' : '펼치기'}
            </Openbutton>
          </CheckboxItem>
          {expandedTerms.privacy && (
            <TermsContent>
              <Terms src={terms3} />
              <Terms src={terms4} />
            </TermsContent>
          )}
          <CheckboxItem>
            <Checkbox
              id="check3"
              checked={isChecked3}
              onChange={() => setIsChecked3(!isChecked3)}
            />
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
