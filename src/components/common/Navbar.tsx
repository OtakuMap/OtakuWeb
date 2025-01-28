import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useAuth } from '@/hooks/login/useAuth';
import styled from 'styled-components';
import logoImage from '../../assets/logo.png';
import alarmIcon from '../../assets/alarm.png';
import menuIcon from '../../assets/menu.png';
import profileIcon from '../../assets/profile.png';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #0c004b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid #e9e2ff;
`;

const Logo = styled.div`
  cursor: pointer;
  img {
    height: 40px;
    object-fit: contain;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  span {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: red;
    color: white;
    font-size: 12px;
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
  }
`;

const AlarmPopup = styled.div`
  position: absolute;
  top: 70px;
  right: 20px;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 320px;
  max-height: 500px;
  overflow-y: auto;
  z-index: 2000;
  align-items: center;

  h4 {
    margin: 16px 16px 0;
    padding-bottom: 16px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    text-align: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background-color: rgb(0, 0, 0);
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    background: #f4f4f4;
    border-radius: 12px;
    padding: 16px;
    margin: 10px;
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h5 {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 8px;
      color: #333;
    }

    p {
      font-size: 14px;
      color: #555;
      line-height: 1.4;
    }

    button {
      position: absolute;
      top: 12px;
      right: 12px;
      background: none;
      border: none;
      color: #888;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      color: red;
    }
  }
`;

const ProfilePopup = styled.div`
  position: absolute;
  top: 70px;
  right: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  width: 200px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 2000;
  overflow: hidden;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 15px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background-color: rgb(0, 0, 0);
  }
`;

const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-bottom: 10px;
  border: 2px solid #d1c1ff;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  padding: 12px 20px;
  cursor: pointer;
  color: #333;
  font-size: 14px;
  text-align: center;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [showPopup, setShowPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: '알림 제목제목', message: '알림 내용 알림 내용 알림 내용 알림 내용' },
    { id: 2, title: '알림 제목제목', message: '알림 내용 알림 내용 알림 내용 알림 내용' },
    { id: 3, title: '알림 제목제목', message: '알림 내용 알림 내용 알림 내용 알림 내용' },
  ]);

  const handleLogout = async () => {
    try {
      await logout();
      // 토큰이 정말 삭제되었는지 확인
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
      <ProfileSection>
        <ProfileImage>
          <img src={profileIcon} alt="Guest Profile" />
        </ProfileImage>
        <ProfileName>비회원</ProfileName>
      </ProfileSection>
      <MenuList>
        <MenuItem onClick={handleLogin}>로그인</MenuItem>
        <MenuItem
          onClick={() => {
            navigate('/signup');
            setShowProfilePopup(false);
          }}
        >
          회원가입
        </MenuItem>
      </MenuList>
    </>
  );

  const UserProfileContent = (
    <>
      <ProfileSection>
        <ProfileImage>
          <img src={profileIcon} alt="User Profile" />
        </ProfileImage>
        <ProfileName>닉네임</ProfileName>
      </ProfileSection>
      <MenuList>
        <MenuItem onClick={() => handleMyPage()}>마이페이지</MenuItem>
        <MenuItem onClick={() => handleLogout()}>로그아웃</MenuItem>
      </MenuList>
    </>
  );

  return (
    <Nav>
      <Logo onClick={handleLogoClick}>
        <img src={logoImage} alt="Otaku Map" />
      </Logo>
      <IconsContainer>
        <IconWrapper onClick={() => setShowPopup((prev) => !prev)}>
          <img src={alarmIcon} alt="Alarm" />
          {notifications.length > 0 && <span>{notifications.length}</span>}
        </IconWrapper>
        <IconWrapper onClick={handleMenuClick}>
          <img src={menuIcon} alt="Menu" />
        </IconWrapper>
        <IconWrapper onClick={() => setShowProfilePopup((prev) => !prev)}>
          <img src={profileIcon} alt="Profile" />
        </IconWrapper>

        {showProfilePopup && (
          <ProfilePopup>{isLoggedIn ? UserProfileContent : GuestProfileContent}</ProfilePopup>
        )}

        {showPopup && (
          <AlarmPopup>
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
          </AlarmPopup>
        )}
      </IconsContainer>
    </Nav>
  );
};

export default Navbar;
