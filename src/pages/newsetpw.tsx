// newsetpw
import { Container,NewsetpwBox, Title, DetailText, 
  FormGroup,Name,Input,Divider, ActionLink, Text} 
  from '../styles/login/newsetpw.style';
  
const NewSetPWPage: React.FC = () => {
  return (
    <Container>
      <NewsetpwBox>
          <Title>새로운 비밀번호 설정</Title>
            <FormGroup>
              <Name>비밀번호</Name>
              <Input type="password" placeholder="새로운 비밀번호를 입력해주세요"/>
            </FormGroup>
            <FormGroup>
              <Name>비밀번호 확인</Name>
              <Input type="password" placeholder="비밀번호를 한번 더 입력해주세요" />
            </FormGroup>
        <Text>
         <DetailText>• 10자 이상 입력</DetailText>
                      <DetailText>• 영문/숫자/특수문자(공백제외)만 허용하며, 2개이상 조합</DetailText>
                      <DetailText>• 동일한 숫자 3개 이상 연속 사용 불가</DetailText>
        </Text>
        <Divider />
          <ActionLink>설정하기</ActionLink>
      </NewsetpwBox>
    </Container>
  );
};

export default NewSetPWPage;

