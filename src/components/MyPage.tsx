import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../api/userInfo';
import { updateNickname } from '../api/userInfo/nickname';
import { reportEvent } from '../api/userInfo/report-event';
import { updateNotificationSettings } from '../api/userInfo/notification-settings';
import { UserInfo } from '../types/userInfo/userType';
import { deleteAllReviews } from '../api/userInfo/deleteReviews';
import StarIcon from '../assets/star.png';
import SpaceIcon from '../assets/space.png';
import PencilIcon from '../assets/pencil.png';
import * as S from '../styles/mypage/mypage.style';

const MyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isEditing, setIsEditing] = useState({
    nickname: false,
    email: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: 'xxxxxxxxxxxxx',
  });
  const [eventForm, setEventForm] = useState({
    event_name: '',
    animation_name: '',
    additional_info: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        setUserInfo(response.result);
        setFormData((prev) => ({
          ...prev,
          nickname: response.result.nickname,
          email: response.result.email,
        }));
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSave = async () => {
    try {
      if (isEditing.nickname) {
        const response = await updateNickname(formData.nickname);
        if (response.isSuccess) {
          setUserInfo((prev) => (prev ? { ...prev, nickname: formData.nickname } : null));
          setIsEditing((prev) => ({ ...prev, nickname: false }));
          alert('닉네임이 성공적으로 수정되었습니다.');
        }
      }
    } catch (error) {
      alert('닉네임 수정에 실패했습니다.');
    }
  };

  const handleEdit = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const checkDuplicate = () => {
    alert('닉네임 중복 확인이 완료되었습니다.');
  };

  const handleEventFormChange = (field: string, value: string) => {
    setEventForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 후기 페이지 이동 핸들러 추가
  const handleReviewClick = () => {
    navigate('/review6');
  };

  const handleEventSubmit = async () => {
    try {
      if (!eventForm.event_name || !eventForm.animation_name) {
        alert('이벤트명과 애니메이션명은 필수 입력사항입니다.');
        return;
      }

      const response = await reportEvent(eventForm);
      if (response.isSuccess) {
        alert('이벤트가 성공적으로 제보되었습니다.');
        setEventForm({
          event_name: '',
          animation_name: '',
          additional_info: '',
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('이벤트 제보에 실패했습니다.');
      }
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deleteAllReviews();
      if (response.isSuccess) {
        alert('모든 후기가 성공적으로 삭제되었습니다.');
        // 사용자 정보 다시 불러오기 (donation 정보 업데이트를 위해)
        const userResponse = await getUserInfo();
        setUserInfo(userResponse.result);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : '후기 삭제에 실패했습니다.');
    }
    setShowDeleteModal(false);
  };

  const handleNotificationToggle = async (type: number, isEnabled: boolean) => {
    try {
      const response = await updateNotificationSettings({
        notificationType: type,
        isEnabled: !isEnabled,
      });

      if (response.isSuccess) {
        setUserInfo((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            community_activity: type === 1 ? !isEnabled : prev.community_activity,
            event_benefits_info: type === 2 ? !isEnabled : prev.event_benefits_info,
          };
        });
      }
    } catch (error) {
      alert('알림 설정 변경에 실패했습니다.');
    }
  };

  if (loading) {
    return <S.Container>Loading...</S.Container>;
  }

  if (error) {
    return <S.Container>Error: {error}</S.Container>;
  }

  return (
    <S.Container>
      <S.Mypage>마이 페이지</S.Mypage>
      <S.TopLeftIcon src={StarIcon} alt="Star Icon" />

      <S.ProfileContainer>
        <S.Avatar imageUrl={userInfo?.profileImageUrl} />
        <S.Nickname>{userInfo?.nickname}</S.Nickname>
        <S.Email>{userInfo?.email}</S.Email>
      </S.ProfileContainer>

      <S.Section>
        <S.SectionTitle>내 정보 수정</S.SectionTitle>

        <S.FormRow>
          <S.Label>닉네임 수정</S.Label>
          <S.InputContainer>
            {isEditing.nickname ? (
              <S.InputField
                type="text"
                value={formData.nickname}
                onChange={(e) => handleChange('nickname', e.target.value)}
              />
            ) : (
              <S.Text>{formData.nickname}</S.Text>
            )}
            <S.EditButton onClick={() => handleEdit('nickname')}>
              <S.EditIcon src={PencilIcon} alt="edit" />
            </S.EditButton>
            <S.DuplicateCheckButton onClick={checkDuplicate}>중복확인</S.DuplicateCheckButton>
          </S.InputContainer>
        </S.FormRow>

        <S.FormRow>
          <S.Label>이메일 수정</S.Label>
          <S.InputContainer>
            {isEditing.email ? (
              <S.InputField
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            ) : (
              <S.Text>{formData.email}</S.Text>
            )}
            <S.EmailEditButton onClick={() => handleEdit('email')}>
              <S.EditIcon src={PencilIcon} alt="edit" />
            </S.EmailEditButton>
          </S.InputContainer>
        </S.FormRow>

        <S.FormRow>
          <S.Label>비밀번호 변경</S.Label>
          <S.InputContainer>
            {isEditing.password ? (
              <S.InputField
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
            ) : (
              <S.Text>{formData.password}</S.Text>
            )}
            <S.EditButton onClick={() => handleEdit('password')}>
              <S.EditIcon src={PencilIcon} alt="edit" />
            </S.EditButton>
          </S.InputContainer>
        </S.FormRow>

        <S.Button onClick={handleSave}>저장하기</S.Button>
      </S.Section>

      <S.Section>
        <S.SectionTitle>내 후기 관리</S.SectionTitle>
        <S.ReviewSection>
          <S.ReviewTitle>후기 관리</S.ReviewTitle>
          <S.ReviewRow>
            <S.ReviewButton onClick={handleReviewClick}>내 후기 전체보기</S.ReviewButton>
            <S.ReviewButton onClick={handleDeleteClick}>내 후기 전체 삭제하기</S.ReviewButton>
          </S.ReviewRow>
          <S.AmountTitle>후기 수익 내역</S.AmountTitle>
          <S.ReviewAmount>{userInfo?.donation || 0}P</S.ReviewAmount>
        </S.ReviewSection>
      </S.Section>
      {/* Modal 추가 */}
      {showDeleteModal && (
        <S.ModalOverlay>
          <S.ModalContainer>
            <S.ModalText>
              삭제 뒤에는 복구할 수 없습니다
              <br />
              삭제하시겠습니까?
            </S.ModalText>
            <S.ModalButtonContainer>
              <S.ModalButton onClick={handleDeleteCancel}>아니오</S.ModalButton>
              <S.ModalButton onClick={handleDeleteConfirm}>네</S.ModalButton>
            </S.ModalButtonContainer>
          </S.ModalContainer>
        </S.ModalOverlay>
      )}

      <S.Section>
        <S.SectionTitle>이벤트 제보하기</S.SectionTitle>
        <S.FormRow>
          <S.EventLabel>이벤트 이름</S.EventLabel>
          <S.EventInputField
            type="text"
            placeholder="입력해주세요"
            value={eventForm.event_name}
            onChange={(e) => handleEventFormChange('event_name', e.target.value)}
          />
        </S.FormRow>
        <S.FormRow>
          <S.EventLabel>이벤트 애니명</S.EventLabel>
          <S.EventInputField
            type="text"
            placeholder="입력해주세요"
            value={eventForm.animation_name}
            onChange={(e) => handleEventFormChange('animation_name', e.target.value)}
          />
        </S.FormRow>
        <S.FormRow>
          <S.EventLabel>추가사항</S.EventLabel>
          <S.EventInputField
            type="text"
            placeholder="입력해주세요"
            value={eventForm.additional_info}
            onChange={(e) => handleEventFormChange('additional_info', e.target.value)}
          />
        </S.FormRow>
        <S.Button onClick={handleEventSubmit}>제출하기</S.Button>
      </S.Section>

      <S.Section>
        <S.SectionTitle>알림 설정</S.SectionTitle>
        <S.ToggleContainer>
          <S.ToggleLabel>커뮤니티 활동 알림</S.ToggleLabel>
          <S.ToggleSwitch
            checked={userInfo?.community_activity || false}
            onChange={() => handleNotificationToggle(1, userInfo?.community_activity || false)}
          />
        </S.ToggleContainer>
        <S.ToggleContainer>
          <S.ToggleLabel>이벤트 및 혜택 정보 알림</S.ToggleLabel>
          <S.ToggleSwitch
            checked={userInfo?.event_benefits_info || false}
            onChange={() => handleNotificationToggle(2, userInfo?.event_benefits_info || false)}
          />
        </S.ToggleContainer>
      </S.Section>

      <S.LogoutButton>로그아웃</S.LogoutButton>
      <S.BottomRightIcon src={SpaceIcon} alt="Space Icon" />
    </S.Container>
  );
};

export default MyPage;
