import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useAuth } from '@/hooks/login/useAuth';
import { useNotifications } from '@/hooks/user/useNotifications';
import { NotificationType } from '@/types/user/notification';
import { useUserProfile } from '@/hooks/user/useUserProfile';
import { openLoginModal } from '@/store/slices/modalSlice';
import logoImage from '../../assets/logo.png';
import alarmIcon from '../../assets/alarm.png';
import menuIcon from '../../assets/menu.png';
import profileIcon from '../../assets/profile.png';
import * as S from '../../styles/common/Navbar.styles';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { notifications, isLoading, refetchNotifications, markAsRead } = useNotifications();
  const { userProfile } = useUserProfile();
  const [showPopup, setShowPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  // const [showMenuPopup, setShowMenuPopup] = useState(false);

  // 팝업 상태를 모두 닫는 함수
  const closeAllPopups = () => {
    setShowPopup(false);
    setShowProfilePopup(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowProfilePopup(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
    setShowProfilePopup(false);
  };

  const handleMyPage = () => {
    navigate('/my-page');
    setShowProfilePopup(false);
  };

  const handleReviewHome = () => {
    navigate('/review6');
    setShowProfilePopup(false);
  };

  const handleMyPoint = () => {
    navigate('/my-point');
    setShowProfilePopup(false);
  };

  const handleNotificationClick = () => {
    if (!isLoggedIn) {
      dispatch(openLoginModal());
      return;
    }

    if (!showPopup) {
      closeAllPopups();
      setShowPopup(true);
      refetchNotifications();
    } else {
      closeAllPopups();
    }
  };

  const handleMenuClick = () => {
    closeAllPopups(); // 열려있는 팝업이 있다면 닫기
    navigate('/category');
  };

  const handleProfileClick = () => {
    closeAllPopups(); // 항상 먼저 모든 팝업을 닫고
    if (!showProfilePopup) {
      // 프로필 팝업이 닫혀있었다면
      setShowProfilePopup(true); // 프로필 팝업을 열기
    }
  };

  const handleNotificationDelete = async (e: React.MouseEvent, notificationId: number) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    try {
      const success = await markAsRead(notificationId);
      if (success) {
        // markAsRead 내부에서 이미 상태를 업데이트하므로 추가 처리 필요 없음
        console.log('알림이 성공적으로 읽음 처리되었습니다.');
      } else {
        console.error('알림 읽음 처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('알림 읽음 처리 중 오류 발생:', error);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const GuestProfileContent = (
    <>
      <S.ProfileSection>
        <S.ProfileImage>
          <img src={profileIcon} alt="Guest Profile" />
        </S.ProfileImage>
        <S.ProfileName>비회원</S.ProfileName>
      </S.ProfileSection>
      <S.MenuList>
        <S.MenuItem onClick={handleLogin}>로그인</S.MenuItem>
        <S.MenuItem
          onClick={() => {
            navigate('/signup');
            setShowProfilePopup(false);
          }}
        >
          회원가입
        </S.MenuItem>
      </S.MenuList>
    </>
  );

  const UserProfileContent = (
    <>
      <S.ProfileSection>
        <S.ProfileImage>
          {userProfile?.profileImageUrl ? (
            <img src={userProfile.profileImageUrl} alt="User Profile" />
          ) : (
            <img src={profileIcon} alt="Default Profile" />
          )}
        </S.ProfileImage>
        <S.ProfileName>{userProfile?.nickname || '닉네임'}</S.ProfileName>
      </S.ProfileSection>
      <S.MenuList>
        <S.MenuItem onClick={handleMyPage}>마이페이지</S.MenuItem>
        <S.MenuItem onClick={handleReviewHome}>내 후기 홈</S.MenuItem>
        <S.MenuItem onClick={handleMyPoint}>내 포인트</S.MenuItem>
        <S.MenuItem onClick={handleLogout}>로그아웃</S.MenuItem>
      </S.MenuList>
    </>
  );

  return (
    <>
      <S.Nav>
        <S.Logo onClick={handleLogoClick}>
          <img src={logoImage} alt="Otaku Map" />
        </S.Logo>
        <S.IconsContainer>
          <S.IconWrapper
            onClick={handleNotificationClick}
            isActive={showPopup}
            width="27.01px"
            height="30px"
          >
            <img src={alarmIcon} alt="Alarm" />
            {notifications.length > 0 && <span>{notifications.length}</span>}
          </S.IconWrapper>
          <S.IconWrapper onClick={handleMenuClick} size={25}>
            <img src={menuIcon} alt="Menu" />
          </S.IconWrapper>
          <S.IconWrapper
            onClick={handleProfileClick}
            isActive={showProfilePopup}
            isProfile
            size={48}
          >
            {userProfile?.profileImageUrl ? (
              <img src={userProfile.profileImageUrl} alt="User Profile" />
            ) : (
              <img src={profileIcon} alt="Profile" />
            )}
          </S.IconWrapper>

          {showProfilePopup && (
            <S.ProfilePopup>{isLoggedIn ? UserProfileContent : GuestProfileContent}</S.ProfilePopup>
          )}

          {showPopup && (
            <S.AlarmPopup>
              <h4>알림</h4>
              <ul>
                {isLoading ? (
                  <li>알림을 불러오는 중...</li>
                ) : notifications.length === 0 ? (
                  <li>알림이 없습니다.</li>
                ) : (
                  notifications.map((notification) => (
                    <li key={notification.id}>
                      <h5>{getNotificationTitle(notification.type)}</h5>
                      <p>{notification.message}</p>
                      <button onClick={(e) => handleNotificationDelete(e, notification.id)}>
                        X
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </S.AlarmPopup>
          )}
        </S.IconsContainer>
      </S.Nav>
      <S.Overlay $isVisible={showPopup || showProfilePopup} onClick={closeAllPopups} />
    </>
  );
};

const getNotificationTitle = (type: NotificationType): string => {
  switch (type) {
    case 'COMMUNITY_ACTIVITY':
      return '커뮤니티 알림';
    case 'POST_SAVE':
      return '저장 알림';
    case 'POST_SUPPORT':
      return '후원 알림';
    case 'SERVICE_NOTICE':
      return '서비스 공지';
    case 'EVENT_STARTED':
      return '이벤트 알림';
    default:
      return '알림';
  }
};

export default Navbar;
