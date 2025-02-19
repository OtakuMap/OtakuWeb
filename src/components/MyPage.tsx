import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../api/userInfo';
import { updateNickname } from '../api/userInfo/nickname';
import { updateEmail } from '../api/userInfo/email';
import { reportEvent } from '../api/userInfo/report-event';
import { updateNotificationSettings } from '../api/userInfo/notification-settings';
import { updateProfileImage } from '../api/userInfo/profile_image';
import { resetPassword } from '../api/userInfo/reset-password';
import { UserInfo } from '../types/userInfo/userType';
import { deleteAllReviews } from '../api/userInfo/deleteReviews';
import { useAuth } from '../hooks/login/useAuth';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../store/slices/userSlice';
import StarIcon from '../assets/star.png';
import SpaceIcon from '../assets/space.png';
import PencilIcon from '../assets/pencil.png';
import * as S from '../styles/mypage/mypage.style';

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isEditing, setIsEditing] = useState({
    nickname: false,
    email: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    nickname: '',
    email: '',
    password: 'xxxxxxxxxxxxx', // passwordCheck 제거
  });
  const [eventForm, setEventForm] = useState({
    eventName: '',
    animationName: '',
    additionalInfo: '',
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

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await updateProfileImage(formData);
      console.log('프로필 이미지 업로드 응답:', response); // 응답 확인

      if (response.isSuccess) {
        const userResponse = await getUserInfo();
        console.log('유저 정보 응답:', userResponse); // 유저 정보 응답 확인

        setUserInfo(userResponse.result);
        dispatch(updateProfile({ profileImageUrl: response.result }));
        alert('프로필 이미지가 성공적으로 변경되었습니다.');
      }
    } catch (error) {
      console.error('에러 발생:', error); // 에러 로그 추가
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('프로필 이미지 변경 중 오류가 발생했습니다.');
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      alert('로그아웃 처리 중 예기치 않은 오류가 발생했습니다.');
    }
  };

  // 기존 handleSave 함수를 수정
  const handleSave = async () => {
    try {
      // 닉네임 수정
      if (isEditing.nickname && formData.nickname !== userInfo?.nickname) {
        const response = await updateNickname(formData.nickname);
        if (response.isSuccess) {
          dispatch(updateProfile({ nickname: formData.nickname }));
          setUserInfo((prev) =>
            prev
              ? {
                  ...prev,
                  nickname: formData.nickname,
                }
              : null,
          );
          setIsEditing((prev) => ({ ...prev, nickname: false }));
          alert('닉네임이 성공적으로 수정되었습니다.');
        }
        return;
      }

      // 이메일 수정
      if (isEditing.email && formData.email !== userInfo?.email) {
        const response = await updateEmail(formData.email);
        if (response.isSuccess) {
          setUserInfo((prev) =>
            prev
              ? {
                  ...prev,
                  email: formData.email,
                }
              : null,
          );
          setIsEditing((prev) => ({ ...prev, email: false }));
          alert('이메일이 성공적으로 수정되었습니다.');
        }
        return;
      }

      // 비밀번호 변경
      if (isEditing.password) {
        try {
          const passwordResponse = await resetPassword({
            password: formData.password,
          });

          if (passwordResponse.isSuccess) {
            setIsEditing((prev) => ({ ...prev, password: false }));
            alert('비밀번호가 성공적으로 변경되었습니다.');
            setFormData((prev) => ({
              ...prev,
              password: 'xxxxxxxxxxxxx',
            }));
          }
        } catch (error) {
          alert('비밀번호 변경에 실패했습니다.');
        }
        return;
      }
    } catch (error) {
      if (isEditing.nickname) {
        alert('닉네임 수정에 실패했습니다.');
      } else if (isEditing.email) {
        alert('이메일 수정에 실패했습니다.');
      } else if (isEditing.password) {
        alert('비밀번호 변경에 실패했습니다.');
      }
    }
  };

  const handleEdit = (field: string) => {
    // 다른 필드 편집 중이면 먼저 저장하도록 알림
    if (Object.values(isEditing).some((value) => value)) {
      alert('현재 편집 중인 항목을 먼저 저장해주세요.');
      return;
    }

    if (field === 'password') {
      setFormData((prev) => ({
        ...prev,
        password: '',
        passwordCheck: '',
      }));
    }
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const checkDuplicate = () => {
    alert('닉네임 중복 확인이 완료되었습니다.');
  };

  const handleEventFormChange = (field: keyof typeof eventForm, value: string) => {
    setEventForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReviewClick = () => {
    navigate('/review6');
  };

  const handleEventSubmit = async () => {
    try {
      if (!eventForm.eventName || !eventForm.animationName) {
        alert('이벤트명과 애니메이션명은 필수 입력사항입니다.');
        return;
      }

      const response = await reportEvent(eventForm);
      if (response.isSuccess) {
        alert('이벤트가 성공적으로 제보되었습니다.');
        setEventForm({
          eventName: '',
          animationName: '',
          additionalInfo: '',
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
        <label htmlFor="profile-image-input" style={{ cursor: 'pointer' }}>
          <S.Avatar $imageUrl={userInfo?.profileImageUrl} />
          <input
            id="profile-image-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </label>
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
                placeholder="새 비밀번호"
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
            value={eventForm.eventName}
            onChange={(e) => handleEventFormChange('eventName', e.target.value)}
          />
        </S.FormRow>
        <S.FormRow>
          <S.EventLabel>이벤트 애니명</S.EventLabel>
          <S.EventInputField
            type="text"
            placeholder="입력해주세요"
            value={eventForm.animationName}
            onChange={(e) => handleEventFormChange('animationName', e.target.value)}
          />
        </S.FormRow>
        <S.FormRow>
          <S.EventLabel>추가사항</S.EventLabel>
          <S.EventInputField
            type="text"
            placeholder="입력해주세요"
            value={eventForm.additionalInfo}
            onChange={(e) => handleEventFormChange('additionalInfo', e.target.value)}
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

      <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
      <S.BottomRightIcon src={SpaceIcon} alt="Space Icon" />
    </S.Container>
  );
};

export default MyPage;
