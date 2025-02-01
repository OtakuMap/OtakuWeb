import { useState } from 'react';
import profile from '../assets/profile.png';
import picture from '../assets/picture.png';
import mapIcon from '../assets/mapIcon.png';
import * as S from '../styles/review/ReviewPage.style';
const profileData = {
  profileImage: profile,
  name: 'Otkkk011',
  date: '2025.01.12',
};

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
    <S.Container>
      <S.BreadcrumbNav>후기 작성</S.BreadcrumbNav>

      <S.WhiteContainer>
        <S.HeaderContainer7>
          <S.TitleInput
            placeholder="후기 제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <S.MetaInfo>
            <S.Avatar>
              <img src={profileData.profileImage} alt={`${profileData.name}의 프로필`} />
            </S.Avatar>
            <S.UserInfo>
              <S.Username>{profileData.name}</S.Username>
              <S.Date>{profileData.date}</S.Date>
            </S.UserInfo>
          </S.MetaInfo>
        </S.HeaderContainer7>

        <S.ContentContainer7>
          <S.ContentTextArea
            placeholder="후기 내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <S.RouteSection>
            {routes.map((route) => (
              <S.RouteItem7 key={route.id}>
                <S.RouteNumber>{route.id}</S.RouteNumber>
                <S.RouteInput
                  placeholder={`${route.id}번째 장소`}
                  value={route.value}
                  onChange={(e) => handleRouteChange(route.id, e.target.value)}
                />
                <S.DeleteButton7 onClick={() => deleteRoute(route.id)}>×</S.DeleteButton7>
              </S.RouteItem7>
            ))}
            <S.AddSection>
              <S.AddPic src={picture} alt="사진 추가" />
              <S.AddMap src={mapIcon} alt="지도 추가" />
            </S.AddSection>
            <S.Button7 onClick={handleSubmit}>업로드 하기</S.Button7>
          </S.RouteSection>
        </S.ContentContainer7>
      </S.WhiteContainer>
    </S.Container>
  );
};

export default ReviewPage7;
