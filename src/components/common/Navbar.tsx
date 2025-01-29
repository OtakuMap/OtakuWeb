import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useAuth } from '@/hooks/login/useAuth';
import logoImage from '../../assets/logo.png';
import alarmIcon from '../../assets/alarm.png';
import menuIcon from '../../assets/menu.png';
import profileIcon from '../../assets/profile.png';
import * as S from '../../styles/common/Navbar.styles';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [showPopup, setShowPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: '알림 제목제목', message: '알림 내용 알림 내용 알림 내용 알림 내용' },
    { id: 2, title: '알림 제목제목', message: '알림 내용 알림 내용 알림 내용 알림 내용' },
    { id: 3, title: '알림 제목제목', message: '알림 내용 알림 내용 알림 내용 알림 내용' },
  ]);

  const handleLogout = async () => {
    try {
      await logout();
      console.log('Tokens after logout:', {
        access: localStorage.getItem('accessToken'),
        refresh: localStorage.getItem('refreshToken'),
      });
      setShowProfilePopup(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLogin = () => {
    navigate('/');
    setShowProfilePopup(false);
  };

  const handleMyPage = () => {
    navigate('/my-page');
    setShowProfilePopup(false);
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMenuClick = () => {
    navigate('/category');
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
          <img src={profileIcon} alt="User Profile" />
        </S.ProfileImage>
        <S.ProfileName>닉네임</S.ProfileName>
      </S.ProfileSection>
      <S.MenuList>
        <S.MenuItem onClick={() => handleMyPage()}>마이페이지</S.MenuItem>
        <S.MenuItem onClick={() => handleLogout()}>로그아웃</S.MenuItem>
      </S.MenuList>
    </>
  );

  return (
    <S.Nav>
      <S.Logo onClick={handleLogoClick}>
        <img src={logoImage} alt="Otaku Map" />
      </S.Logo>
      <S.IconsContainer>
        <S.IconWrapper onClick={() => setShowPopup((prev) => !prev)}>
          <img src={alarmIcon} alt="Alarm" />
          {notifications.length > 0 && <span>{notifications.length}</span>}
        </S.IconWrapper>
        <S.IconWrapper onClick={handleMenuClick}>
          <img src={menuIcon} alt="Menu" />
        </S.IconWrapper>
        <S.IconWrapper onClick={() => setShowProfilePopup((prev) => !prev)}>
          <img src={profileIcon} alt="Profile" />
        </S.IconWrapper>

        {showProfilePopup && (
          <S.ProfilePopup>{isLoggedIn ? UserProfileContent : GuestProfileContent}</S.ProfilePopup>
        )}

        {showPopup && (
          <S.AlarmPopup>
            <h4>알림</h4>
            <ul>
              {notifications.length === 0 ? (
                <li>알림이 없습니다.</li>
              ) : (
                notifications.map((notification) => (
                  <li key={notification.id}>
                    <h5>{notification.title}</h5>
                    <p>{notification.message}</p>
                    <button onClick={() => deleteNotification(notification.id)}>X</button>
                  </li>
                ))
              )}
            </ul>
          </S.AlarmPopup>
        )}
      </S.IconsContainer>
    </S.Nav>
  );
};

export default Navbar;
