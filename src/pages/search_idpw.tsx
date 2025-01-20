import styled from "styled-components";
import Backgroundimg from '../assets/logorepeat.png';

const SearchIdPWPage: React.FC = () => {
  return (
    <Container>
      <SearchIdPwBox>
        <Section>
          <Title>아이디 찾기</Title>
          <Form>
            <FormGroup>
              <Label>이름(실명)</Label>
              <Input type="text" />
            </FormGroup>
            <FormGroup>
              <Label>가입한 E - mail</Label>
              <Input type="text" />
            </FormGroup>
            <ActionButton>조회하기</ActionButton>
          </Form>
        </Section>
        <Divider />
        <Section>
          <Title>비밀번호 찾기</Title>
          <Form>
            <FormGroup>
              <Label>이름(실명)</Label>
              <Input type="text" />
            </FormGroup>
            <FormGroup>
              <Label>ID</Label>
              <Input type="text" />
            </FormGroup>
            <FormGroup>
              <Label>인증번호</Label>
              <Input type="text" />
            </FormGroup>
            <ActionButton>인증번호 받기</ActionButton>
          </Form>
        </Section>
      </SearchIdPwBox>
    </Container>
  );
};

export default SearchIdPWPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  background-image: url(${Backgroundimg});
  background-size: cover;
  background-position: center;
`;

const SearchIdPwBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:flex-start;
  align-items: center;
  position: relative;
  width: 661px;
  height: auto;
  max-height:90%;
  background: #101148;
  border-radius: 20px;
  padding: 20px;
  overflow-y: auto; 
  scrollbar-width: none; 
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-family: 'Gothic A1', serif;
  text-align: center;
  color: #ffffff;
  margin-bottom: 35px;
  margin-top: 30px;
  font-size: 24px;
  font-weight: 600;
  line-height:30px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  margin-bottom: 35px;
`;

const FormGroup = styled.div`
  display: flex;
  justify-content: flex-start; 
  align-items: center;
  margin-bottom: 10px;
  width: 448px;
  height: 60px;
  background-color: #101148;
  border-radius: 20px;
  border: 2px solid #d1c1ff;
  box-sizing: border-box;
`;

const Label = styled.label`
  position: relative;
  font-family: 'Gothic A1';
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  color: #999797;
  margin-left: 15px;
  flex-shrink: 0;
`;

const Input = styled.input`
  font-size: 20px;
  background-color: #101148;
  color: #ffffff;
  border: none;
  outline: none;
  height: 56px;
  flex-shrink: 0;
  width: 58%;
  margin-left: 10px;

  &:focus {
    background-color: #101148;
    color: #ffffff;
  }

  &:-webkit-autofill {
    background-color: #101148 !important;
    -webkit-text-fill-color: #ffffff !important;
    -webkit-box-shadow: 0 0 0px 1000px #101148 inset !important;
    color: #ffffff !important;
  }
`;

const ActionButton = styled.button`
  background-color: #b8effd;
  color: #101148;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  margin: 0 auto;
  width: 174px;
  height: 60px;
  margin-top: 35px;
`;

const Divider = styled.hr`
  border: 1px solid #ffffff;
  width: 600px;
  position: relative;
  z-index: 1; 
`;
