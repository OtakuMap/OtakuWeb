import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, SearchIdPwBox, Section, Title, DetailText, 
  FormGroup, Name, Input, InputShort, Divider, ActionButton, ActionButtonShort } 
  from '../styles/login/search_idpw.style';
import { authAPI } from '../api/login/authAPI';

const SearchIdPWPage: React.FC = () => {
  const [idName, setIdName] = useState('');
  const [idEmail, setIdEmail] = useState('');
  const [foundUserId, setFoundUserId] = useState<string | null>(null); // 아이디 찾기 결과 상태 추가

  const [pwName, setPwName] = useState('');
  const [pwId, setPwId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 전송 여부 상태 추가
  const navigate = useNavigate();

  // 아이디 찾기
  const handleSearchId = async () => {
    if (!idName || !idEmail) {
      alert('이름과 이메일을 입력해주세요.');
      return;
    }

    try {
      const response = await authAPI.searchId({ name: idName, email: idEmail }); // 필드명 확인 후 수정
      if (response.isSuccess) {
        setFoundUserId(response.result.userId); // 찾은 아이디 저장
        alert('아이디가 조회되었습니다.');
      } else {
        alert(response.message || '아이디 조회에 실패했습니다.');
      }
    } catch (error) {
      console.error('아이디 조회 실패:', error);
      alert('아이디 조회 중 오류가 발생했습니다.');
    }
  };

  // 비밀번호 찾기
  const handleSearchPw = async () => {
    if (!pwName || !pwId) {
      alert('이름과 아이디를 입력해주세요.');
      return;
    }

    try {
      const response = await authAPI.searchPw({ name: pwName, id: pwId }); // 필드명 확인 후 수정
      if (response.isSuccess) {
        setIsCodeSent(true);
        alert('인증번호가 이메일로 전송되었습니다.');
      } else {
        alert(response.message || '비밀번호 찾기 실패');
      }
    } catch (error) {
      console.error('비밀번호 찾기 실패:', error);
      alert('비밀번호 찾기 중 오류가 발생했습니다.');
    }
  };

  // 인증번호 인증
  const handleVerifyCode = async () => {
    if (!verificationCode) {
      alert('인증번호를 입력해주세요.');
      return;
    }

    try {
      const response = await authAPI.emailVerifyCode({ email: pwId, code: verificationCode });
      if (response.isSuccess) {
        alert('인증번호 인증 성공!');
        navigate('/newsetpw');
      } else {
        alert(response.message || '인증번호 인증 실패');
      }
    } catch (error) {
      console.error('인증번호 인증 실패:', error);
      alert('인증번호 인증 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <SearchIdPwBox>
        {/* 아이디 찾기 */}
        <Section>
          <Title>아이디 찾기</Title>
          <FormGroup>
            <Name>이름</Name>
            <Input
              type="text"
              value={idName}
              onChange={(e) => setIdName(e.target.value)}
              placeholder="이름을 입력해주세요"
            />
          </FormGroup>
          <FormGroup>
            <Name>E-mail</Name>
            <Input
              type="text"
              value={idEmail}
              onChange={(e) => setIdEmail(e.target.value)}
              placeholder="가입한 이메일을 입력해주세요"
            />
          </FormGroup>
          <ActionButton onClick={handleSearchId}>조회하기</ActionButton>
          {foundUserId && <DetailText>찾은 아이디: {foundUserId}</DetailText>}
        </Section>
        
        <Divider />
        
        {/* 비밀번호 찾기 */}
        <Section>
          <Title>비밀번호 찾기</Title>
          <FormGroup>
            <Name>이름</Name>
            <Input
              type="text"
              value={pwName}
              onChange={(e) => setPwName(e.target.value)}
              placeholder="이름을 입력해주세요"
            />
          </FormGroup>
          <FormGroup>
            <Name>ID</Name>
            <InputShort
              type="text"
              value={pwId}
              onChange={(e) => setPwId(e.target.value)}
              placeholder="ID를 입력해주세요"
            />
            <ActionButtonShort onClick={handleSearchPw}>인증하기</ActionButtonShort>
          </FormGroup>
          {isCodeSent && <DetailText>계정에 등록된 이메일로 인증번호가 전송되었습니다.</DetailText>}
          <FormGroup>
            <Name>인증번호</Name>
            <Input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="인증번호 6자리를 입력해주세요"
            />
          </FormGroup>
          <ActionButton onClick={handleVerifyCode}>인증번호 인증</ActionButton>
        </Section>
      </SearchIdPwBox>
    </Container>
  );
};

export default SearchIdPWPage;
