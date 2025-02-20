import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Prepage from '../../assets/img/prepage.svg';
import Dimg from '../../assets/img/purpledivider.png';
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
  DividerFirst,
  SubTitle2,
} from '../../styles/point/pointCharge.style';
import { pointAPI } from '@/api/point/pointAPI';

interface PortOneResponse {
  success: boolean;
  error_msg?: string;
  imp_uid: string;
  merchant_uid: string;
  pay_method: string;
  paid_amount: number;
  status: string;
}

const PointCharge: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPoint, setSelectedPoint] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [pointValues, setPointValues] = useState<{ [key: number]: number }>({
    1000: 0,
    5000: 0,
    10000: 0,
  });

  const handlePointSelection = (amount: number) => {
    setPointValues((prev) => ({ ...prev, [amount]: prev[amount] + amount }));
    setSelectedPoint((prev) => prev + amount);
  };

  const onClickPayment = async () => {
    const PortOne = window.IMP;
    if (!PortOne) {
      console.error('PortOne 객체가 로드되지 않았습니다.');
      return;
    }

    PortOne.init('imp87071777');

    const data = {
      pg: 'kakaopay.TC0ONETIME',
      pay_method: 'card',
      merchant_uid: `order_${new Date().getTime()}`,
      name: '포인트 충전',
      amount: selectedPoint.toString(),
      buyer_name: '홍길동',
      buyer_tel: '010-1234-5678',
      buyer_email: 'test@example.com',
      buyer_addr: '서울시 강남구',
      buyer_postalcode: '123-456',
      m_redirect_url: 'http://localhost:3000/payment-success', // 테스트 서버 도메인 사용
    };

    console.log('결제 요청 데이터:', data);
    console.log('IMP.request_pay 호출');

    PortOne.request_pay(data, (response: PortOneResponse) => {
      console.log('callback 호출됨:', response);
      callback(response);
    });
  };

  // 기존 콜백에서 verify 호출 부분
  const callback = async (response: PortOneResponse) => {
    console.log('callback 호출', response);
    const { success, error_msg, imp_uid } = response;

    if (success) {
      alert('결제 성공!');
      try {
        console.log('보낼 verifyData:', imp_uid);

        // verify 함수는 문자열 타입의 imp_uid를 인자로 받습니다.
        const verifyResponse = await pointAPI.verify(imp_uid);

        // verifyResponse 안의 status가 "paid"인지 확인
        if (verifyResponse.response.status === 'paid') {
          // 결제 검증이 완료되었으므로 포인트 충전 API 호출
          const chargeData = { point: selectedPoint.toString() };
          const chargeResponse = await pointAPI.charge(chargeData);

          if (chargeResponse.isSuccess) {
            alert('포인트 충전 성공!');
          } else {
            alert('포인트 충전 실패');
          }
        } else {
          alert('결제 검증 실패 또는 결제 상태가 paid가 아님');
        }
      } catch (error) {
        console.error('API 호출 실패:', error);
        alert('결제 검증 중 오류가 발생했습니다.');
      }
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

  return (
    <Container>
      <DividerFirst src={Dimg} />
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
          <SubTitle2>결제 금액</SubTitle2>
          <Purchase>{selectedPoint.toLocaleString()}원</Purchase>
        </PurchaseGroup>

        <Divider />

        <Text>
          <DetailTitle>포인트 구매안내</DetailTitle>
          <DetailText>- 결제 금액은 부가세(VAT)가 포함된 가격입니다.</DetailText>
          <DetailText>
            - 충전한 포인트는 충전 후 사용내역이 없는 경우 충전 결제 단위로 7일 이내에 오타쿠맵
            고객센터를 통해 결제취소 및 환불이 가능합니다.
          </DetailText>
          <DetailText>- 사용 후 남은 포인트는 환불되지 않습니다.</DetailText>
          <DetailText>
            - 만 14세 미만 미성년 회원의 결제는 원칙적으로 법정대리인의 명의 또는 동의 하에
            이루어져야 하고, 법정대리인은 본인 동의 없이 체결된 자녀(미성년자)의 계약을 취소할 수
            있습니다.
          </DetailText>
          <DetailText>- 기타 문의 사항은 MY의 고객센터에서 1:1 문의 부탁드립니다.</DetailText>
        </Text>

        <CheckboxGroup>
          <CheckboxItem>
            <Checkbox id="check1" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
            결제 내용과 유의사항을 확인했으며 결제 진행에 동의합니다.
          </CheckboxItem>
        </CheckboxGroup>

        <ChargeButton disabled={!isChecked || selectedPoint === 0} onClick={onClickPayment}>
          결제하기
        </ChargeButton>
      </PointChargeBox>
    </Container>
  );
};

export default PointCharge;
