import { validateSignup } from "../../utils/validate";
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
  DetailText, 
  CheckboxGroup, 
  CheckboxItem, 
  Checkbox, 
  CheckboxLabel, 
  Divider, 
  ActionLink, 
  Openbutton
 } from '../../styles/login/signup.style';

const SignupPage: React.FC = () => {
  const navigate = useNavigate(); 

      const { values, errors, touched, getTextInputProps } = useForm({
        initialValues: {
            name: '',
            nickname: '',
            email: '',
            verificationCode: '',
            pw:'',
            pw2: '',
        },
        validate: validateSignup,
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (Object.keys(errors).length === 0) {
            // 회원가입 API 호출
            const response = await fetch('http://3.39.72.211:8080/swagger-ui/index.html#/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: values.name,
                  id: values.id,
                  email: values.email,
                  verificationCode: values.verificationCode,
                  pw: values.pw,
                  pw2: values.pw2,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('회원가입 성공:', data);
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('email', values.email);  // 이메일 저장
                navigate('/login', { replace: true });
            } else {
                console.error('회원가입 실패:', data);
            }
        } else {
            console.log("Validation errors:", errors);
        }
    };


  return (
    <Container>
      <SignupBox>
          <Title>회원가입</Title>
        
        <InputBox>
            <FormGroup>
              <Name>이름</Name>
              <Input type="text" placeholder="이름을 입력해주세요"/>
            </FormGroup>
            <FormGroup>
              <Name>ID</Name>
              <InputShort type="text" placeholder="ID를 입력해주세요"/>
              <VerifyButton>중복 확인</VerifyButton>
            </FormGroup>
            <DetailText>• 6자 이상의 영문 혹은 영문과 숫자를 조합</DetailText>
            <FormGroup2>
              <Name>E-mail</Name>
              <InputShort type="text" placeholder="otaku@gmail.com"/>
              <VerifyButtonShort>인증번호 받기</VerifyButtonShort>
            </FormGroup2>
            <FormGroup2>
              <Name>인증번호</Name>
              <InputShort type="text" placeholder="인증번호 6자리를 입력해주세요"/>
              <VerifyButton>인증하기</VerifyButton>
            </FormGroup2>
            <FormGroup3>
              <Name>비밀번호</Name>
              <Input type="password" placeholder="비밀번호를 입력해주세요"/>
            </FormGroup3>
              <DetailText>• 10자 이상 입력</DetailText>
              <DetailText>• 영문/숫자/특수문자(공백제외)만 허용하며, 2개이상</DetailText>
              <DetailText>조합</DetailText>
              <DetailText>• 동일한 숫자 3개 이상 연속 사용 불가</DetailText>
            <FormGroup4>
              <Name>비밀번호 확인</Name>
              <Input type="password" placeholder="비밀번호를 입력해주세요"/>
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
        <Divider/>
          <ActionLink>가입하기</ActionLink>
      </SignupBox>
    </Container>
  );
};

export default SignupPage;

