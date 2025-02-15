import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container,
  NewsetpwBox,
  Title,
  DetailText,
  FormGroup,
  Name,
  Input,
  Divider,
  ActionLink,
  Text,
} from '../styles/login/newsetpw.style';
import { authAPI } from '../api/login/authAPI';

const NewSetPWPage: React.FC = () => {
  const [pw, setPw] = useState('');
  const [pwcheck, setPwcheck] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // userId를 URL 파라미터에서 가져오고, 없으면 localStorage에서 가져오기
  const userId = searchParams.get('userId') || localStorage.getItem('userId');

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password: string) => {
    const lengthCheck = password.length >= 10;
    const complexityCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(
      password,
    );
    const sequenceCheck = !/(.)\1\1/.test(password); // 같은 문자 3개 이상 연속 금지

    return lengthCheck && complexityCheck && sequenceCheck;
  };

  // 비밀번호 변경 요청 함수
  const handleResetPw = async () => {
    if (!pw || !pwcheck) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    if (pw !== pwcheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!validatePassword(pw)) {
      alert('비밀번호 조건을 확인해주세요.');
      return;
    }

    if (!userId) {
      alert('사용자 정보를 찾을 수 없습니다.');
      return;
    }

    try {
      console.log('비밀번호 변경 요청:', { userId, password: pw, passwordCheck: pwcheck });

      const response = await authAPI.newsetPw({ userId, password: pw, passwordCheck: pwcheck });

      if (response.isSuccess) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        navigate('/login');
      } else {
        alert(response.message || '비밀번호 변경 실패');
      }
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      alert('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <NewsetpwBox>
        <Title>새로운 비밀번호 설정</Title>
        <FormGroup>
          <Name>비밀번호</Name>
          <Input
            type="password"
            placeholder="새로운 비밀번호를 입력해주세요"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Name>비밀번호 확인</Name>
          <Input
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            value={pwcheck}
            onChange={(e) => setPwcheck(e.target.value)}
          />
        </FormGroup>
        <Text>
          <DetailText>• 10자 이상 입력</DetailText>
          <DetailText>• 영문/숫자/특수문자(공백제외)만 허용하며, 2개 이상 조합</DetailText>
          <DetailText>• 동일한 숫자 3개 이상 연속 사용 불가</DetailText>
        </Text>
        <Divider />
        <ActionLink onClick={handleResetPw}>설정하기</ActionLink>
      </NewsetpwBox>
    </Container>
  );
};

export default NewSetPWPage;
