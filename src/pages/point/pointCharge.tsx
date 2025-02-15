import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Prepage from '../../assets/img/prepage.svg';
import {
  Container,
  Title,
  PointChargeBox,
  Pagebutton,
  Text,
  Divider,
  DetailTitle,
  DetailText,
  ChargeButton,
  CheckboxGroup,
  CheckboxItem,
  Checkbox,
  SubTitle,
  ButtonGroup,
  Purchase,
  Header,
  InputGroup,
  Input1000,
  Input5000,
  Input10000,
  Button,
  PointGroup,
  PurchaseGroup,
} from '../../styles/point/pointCharge.style';

const PointCharge: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPoint, setSelectedPoint] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [pointValues, setPointValues] = useState({
    1000: 0,
    5000: 0,
    10000: 0,
  });

  const handlePointSelection = (amount: number) => {
    setPointValues((prev) => ({ ...prev, [amount]: prev[amount] + amount }));
    setSelectedPoint((prev) => prev + amount);
  };

  return (
    <Container>
      <Title>포인트 충전하기</Title>
      <PointChargeBox>
        <Header>
          <Pagebutton onClick={() => navigate('/my-point')}>
            <img src={Prepage} alt="Back" />
          </Pagebutton>
          <SubTitle>충전할 포인트</SubTitle>
          <PointGroup>
            <InputGroup>
              <Input1000>{pointValues[1000]} P</Input1000>
              <Input5000>{pointValues[5000]} P</Input5000>
              <Input10000>{pointValues[10000]} P</Input10000>
            </InputGroup>
            <ButtonGroup>
              <Button onClick={() => handlePointSelection(1000)}>1000원</Button>
              <Button onClick={() => handlePointSelection(5000)}>5000원</Button>
              <Button onClick={() => handlePointSelection(10000)}>10000원</Button>
            </ButtonGroup>
          </PointGroup>
        </Header>

        <PurchaseGroup>
          <SubTitle>결제 금액</SubTitle>
          <Purchase>{selectedPoint.toLocaleString()}원</Purchase>
        </PurchaseGroup>

        <Divider />

        <Text>
          <DetailTitle>포인트 구매안내</DetailTitle>
          <DetailText>- 결제 금액은 부가세(VAT)가 포함된 가격입니다.</DetailText>
          <DetailText>
            - 충전한 포인트는 충전 후 사용내역이 없는 경우 충전 결제 단위로 7일 이내에 오타쿠맵
            고객센터를 통해 결제취소 및 환불이 가능합니다.{' '}
          </DetailText>
          <DetailText>- 사용 후 남은 포인트는 환불되지 않습니다.</DetailText>
          <DetailText>
            - 만 14세 미만 미성년 회원의 결제는 원칙적으로 법정대리인의 명의 또는 동의 하에
            이루어져야 하고, 법정대리인은 본인 동의 없이 체결된 자녀(미성년자)의 계약을 취소할 수
            있습니다.{' '}
          </DetailText>
          <DetailText>- 기타 문의 사항은 MY의 고객센터에서 1:1 문의 부탁드립니다.</DetailText>
        </Text>

        <CheckboxGroup>
          <CheckboxItem>
            <Checkbox id="check1" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
            결제 내용과 유의사항을 확인했으며 결제 진행에 동의합니다.
          </CheckboxItem>
        </CheckboxGroup>

        <ChargeButton disabled={!isChecked || selectedPoint === 0}>결제하기</ChargeButton>
      </PointChargeBox>
    </Container>
  );
};

export default PointCharge;
