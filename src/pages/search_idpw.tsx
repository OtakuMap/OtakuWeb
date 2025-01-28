import { Container,SearchIdPwBox, Section,Title, DetailText,
  FormGroup, Name, Input, InputShort, Divider, ActionButton, ActionButtonShort}
   from '../styles/login/search_idpw.style';

const SearchIdPWPage: React.FC = () => {
  return (
    <Container>
      <SearchIdPwBox>
        <Section>
          <Title>아이디 찾기</Title>
            <FormGroup>
              <Name>이름</Name>
              <Input type="text" placeholder="이름을 입력해주세요" />
            </FormGroup>
            <FormGroup>
              <Name>E-mail</Name>
              <Input type="text" placeholder="가입한 이메일을 입력해주세요" />
            </FormGroup>
            <ActionButton>조회하기</ActionButton>
        </Section>
        <Divider />
        <Section>
          <Title>비밀번호 찾기</Title>
            <FormGroup>
              <Name>이름</Name>
              <Input type="text" placeholder="이름을 입력해주세요" />
            </FormGroup>
            <FormGroup>
              <Name>ID</Name>
              <InputShort type="text" placeholder="ID를 입력해주세요" />
              <ActionButtonShort>인증하기</ActionButtonShort>
            </FormGroup>
            <DetailText>계정에 등록된 이메일로 인증번호가 전송되었습니다.</DetailText>
            <FormGroup>
              <Name>인증번호</Name>
              <Input type="text" placeholder="인증번호 6자리를 입력해주세요" />
            </FormGroup>
            <ActionButton>인증번호 받기</ActionButton>
        </Section>
      </SearchIdPwBox>
    </Container>
  );
};

export default SearchIdPWPage;

