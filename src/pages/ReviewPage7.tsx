import { useState } from 'react';
import styled from 'styled-components';
import profile from '../assets/profile.png';
import picture from '../assets/picture.png';
import mapIcon from '../assets/mapIcon.png';

const profileData = {
  profileImage: profile,
  name: 'Otkkk011',
  date: '2025.01.12',
};

const Container = styled.div`
  background-color: #0c004b;
  width: 100vw;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BreadcrumbNav = styled.div`
  width: 90%;
  max-width: 1200px;
  color: white;
  font-size: 24px;
  margin-bottom: 20px;
`;

const WhiteContainer = styled.div`
  background-color: white;
  width: 90%;
  max-width: 1200px;
  border-radius: 20px;
  padding: 30px;
  margin: 20px auto;
  box-sizing: border-box;
`;

const HeaderContainer = styled.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #252660;
`;

const ContentContainer = styled.div`
  display: flex;

  gap: 32px;
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 24px;
  padding: 10px;
  margin-bottom: 30px;
  border-radius: 8px;
  border: none;
  outline: none;

  &::placeholder {
    color: #999;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin-right: 15px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Date = styled.span`
  color: #666;
  font-size: 14px;
`;

const ContentTextArea = styled.textarea`
  width: 100%;
  height: 400px;
  padding: 15px;
  font-size: 16px;
  line-height: 1.6;
  border-radius: 8px;
  resize: vertical;
  border: none;
  outline: none;

  &::placeholder {
    color: #999;
  }
`;

const RouteSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RouteItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  padding-right: 40px; /* Space for delete button */
`;

const RouteNumber = styled.div`
  width: 30px;
  height: 30px;
  min-width: 30px;
  background-color: #bdaee5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #252660;
`;

const RouteInput = styled.input`
  flex: 1;
  padding: 8px 15px;
  border-radius: 15px;
  border: 1px solid #bdaee5;
  font-size: 14px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  max-width: 200px;
  background-color: #ffc50c;
  color: black;
  border: none;
  font-weight: 700;
  margin-top: 10px;
  align-self: center;
`;
const AddSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;
  cursor: pointer;
  margin-top: 10px;
`;

const AddPic = styled.img`
  width: 40px;
  height: 40px;
`;
const AddMap = styled.img`
  width: 40px;
  height: 40px;
`;

const ReviewPage7 = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [routes, setRoutes] = useState([
    { id: 1, value: '' },
    { id: 2, value: '' },
    { id: 3, value: '' },
    { id: 4, value: '' },
    { id: 5, value: '' },
  ]);

  const handleRouteChange = (id: number, value: string) => {
    setRoutes(routes.map((route) => (route.id === id ? { ...route, value } : route)));
  };

  const deleteRoute = (idToDelete: number) => {
    setRoutes(
      routes
        .filter((route) => route.id !== idToDelete)
        .map((route, index) => ({
          ...route,
          id: index + 1,
        })),
    );
  };

  const handleSubmit = () => {
    console.log({
      title,
      content,
      routes: routes.filter((route) => route.value).map((route) => route.value),
    });
  };

  return (
    <Container>
      <BreadcrumbNav>후기 작성</BreadcrumbNav>

      <WhiteContainer>
        <HeaderContainer>
          <TitleInput
            placeholder="후기 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <MetaInfo>
            <Avatar>
              <img src={profileData.profileImage} alt={`${profileData.name}의 프로필`} />
            </Avatar>
            <UserInfo>
              <Username>{profileData.name}</Username>
              <Date>{profileData.date}</Date>
            </UserInfo>
          </MetaInfo>
        </HeaderContainer>

        <ContentContainer>
          <ContentTextArea
            placeholder="후기 내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <RouteSection>
            {routes.map((route) => (
              <RouteItem key={route.id}>
                <RouteNumber>{route.id}</RouteNumber>
                <RouteInput
                  placeholder={`${route.id}번째 장소`}
                  value={route.value}
                  onChange={(e) => handleRouteChange(route.id, e.target.value)}
                />
                <DeleteButton onClick={() => deleteRoute(route.id)}>×</DeleteButton>
              </RouteItem>
            ))}
            <AddSection>
              <AddPic src={picture} alt="사진 추가" />
              <AddMap src={mapIcon} alt="지도 추가" />
            </AddSection>
            <Button onClick={handleSubmit}>업로드 하기</Button>
          </RouteSection>
        </ContentContainer>
      </WhiteContainer>
    </Container>
  );
};

export default ReviewPage7;
