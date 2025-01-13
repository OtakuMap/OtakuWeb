import styled from "styled-components";
import logoIcon from '../assets/logo.png';

const SearchIdPWPage: React.FC = () => {
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
      <SearchIdPwBox>
        <Section>
          <Title>아이디 찾기</Title>
          <Form>
            <FormGroup>
              <Label>이름(실명)</Label>
              <Input type="text"  />
            </FormGroup>
            <FormGroup>
              <Label>가입한 E - mail</Label>
              <Input type="text"  />
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
            <VerifyButton>인증 하기</VerifyButton>
            </FormGroup>
            <ActionButton>조회하기</ActionButton>
          </Form>
        </Section>
      </SearchIdPwBox>
    </Container>
  );
};

export default SearchIdPWPage;

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

const SearchIdPwBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  width:528px;
  height: 570px;
  background: #1a1b4b;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-family: 'Gothic A1', serif;
  text-align: center;
  color: #ffffff;
  margin-bottom: 5px;
  margin-top:5px;
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #101148;
  border-radius: 20px;
  border: 2px solid #d1c1ff;
  padding: 10px;
  position: relative;
`;

const Label = styled.label`
  font-family: 'Gothic A1';
  font-size: 16px;
  font-weight: 600;
  color: #999797;
  text-align: left;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 16px;
  background-color: #101148;
  color: #ffffff;
  border: none;
  outline: none;
  &::placeholder {
    color: #999797;
  }
`;

const VerifyButton = styled.button`
  background-color: #Bdaee5;
  color: #101148;
  border: 2px solid #fff5d5;
  border-radius: 30px;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  align-self:flex-end;
  flex-shrink: 0;
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
    width:174px;
  height:60px;
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #999797;
  width: 100%;
  margin: 20px 0;
`;
