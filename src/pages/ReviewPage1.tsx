import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import sectionImage from '../assets/1.png';
import deleteIcon from '../assets/X.png';
import conanImage from '../assets/conan.png';
import * as S from '../styles/review/ReviewPage.style';
import { TopReview } from '../types/review/top';
import { getTop7Reviews } from '../api/review/top';
import { searchReviews } from '../api/review/search';

interface SearchItem {
  text: string;
  date: string;
}

// 가짜 데이터를 TopReview 타입에 맞게 변환
const fakeTopReviews: TopReview[] = [
  {
    id: 1,
    title: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
    reviewImage: {
      id: 1,
      uuid: 'temp-1',
      fileName: 'conan.png',
      fileUrl: conanImage,
    },
    view: 100,
  },
  {
    id: 2,
    title: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
    reviewImage: {
      id: 2,
      uuid: 'temp-2',
      fileName: 'conan.png',
      fileUrl: conanImage,
    },
    view: 90,
  },
  {
    id: 3,
    title: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
    reviewImage: {
      id: 3,
      uuid: 'temp-3',
      fileName: 'conan.png',
      fileUrl: conanImage,
    },
    view: 80,
  },
  {
    id: 4,
    title: '유명한이 지금까지 코난한테 맞은 마취총 개수 아는사람',
    reviewImage: {
      id: 4,
      uuid: 'temp-4',
      fileName: 'conan.png',
      fileUrl: conanImage,
    },
    view: 70,
  },
];

const ReviewPage1: React.FC = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [topReviews, setTopReviews] = useState<TopReview[]>(fakeTopReviews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<SearchItem[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved
      ? JSON.parse(saved)
      : [
          { text: '검색어검색어', date: '2024.12.04' },
          { text: '검색어검색어', date: '2024.11.14' },
          { text: '검색어검색어', date: '2024.11.14' },
        ];
  });

  useEffect(() => {
    const fetchTopReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getTop7Reviews();

        // 디버깅을 위한 로그 추가
        console.log('API Response:', response);
        console.log('Reviews count:', response.result?.reviews?.length);
        console.log('Full reviews data:', response.result?.reviews);

        if (response.isSuccess && response.result?.reviews?.length > 0) {
          const validReviews = response.result.reviews.filter(
            (review) => review && review.reviewImage && review.reviewImage.fileUrl,
          );

          // 필터링 된 결과 로깅
          console.log('Valid reviews count:', validReviews.length);
          console.log('Valid reviews:', validReviews);

          setTopReviews(validReviews.length > 0 ? validReviews : fakeTopReviews);
        } else {
          console.log('Using fake data because no valid data received');
          setTopReviews(fakeTopReviews);
        }
      } catch (err) {
        console.error('Failed to fetch top reviews:', err);
        setError('Failed to load reviews. Using sample data instead.');
        setTopReviews(fakeTopReviews);
      } finally {
        setLoading(false);
      }
    };

    fetchTopReviews();
  }, []);

  const handleSearch = async () => {
    if (searchInput.trim()) {
      const newSearch = {
        text: searchInput,
        date: new Date()
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .split(' ')
          .join('')
          .replace(/\./g, '')
          .replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3'),
      };

      console.log('Search initiated with:', searchInput);

      const updatedSearches = [newSearch, ...recentSearches].slice(0, 3);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

      try {
        console.log('Calling searchReviews with params:', {
          keyword: searchInput,
          page: 0,
          size: 10,
          sort: 'latest',
        });

        const searchResult = await searchReviews({
          keyword: searchInput,
          page: 0,
          size: 10,
          sort: 'latest',
        });

        console.log('Search API response:', searchResult);

        if (searchResult.isSuccess) {
          console.log('Navigating to /review2 with state:', {
            searchQuery: searchInput,
            searchResults: searchResult.result,
          });

          navigate('/review2', {
            state: {
              searchQuery: searchInput,
              searchResults: searchResult.result,
            },
          });
        } else {
          console.error('Search was not successful:', searchResult);
        }
      } catch (error) {
        console.error('Search error details:', error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleDelete = (index: number) => {
    const updatedSearches = recentSearches.filter((_item: SearchItem, i: number) => i !== index);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  return (
    <S.Container>
      <S.SearchWrapper>
        <S.SearchBarWrapper>
          <S.SearchInput
            placeholder="검색할 후기의 관련 키워드를 입력하세요"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <S.SearchButton onClick={handleSearch}>
            <FaSearch />
          </S.SearchButton>
        </S.SearchBarWrapper>
        <S.RecentSearch>
          <S.Title>최근검색어</S.Title>
          <S.SearchList>
            {recentSearches.map((search: SearchItem, index: number) => (
              <S.SearchItem key={index}>
                <S.DeleteButton onClick={() => handleDelete(index)}>
                  <S.DeleteIcon src={deleteIcon} alt="delete" />
                </S.DeleteButton>
                <S.SearchText>{search.text}</S.SearchText>
                <S.SearchDate>{search.date}</S.SearchDate>
              </S.SearchItem>
            ))}
          </S.SearchList>
        </S.RecentSearch>
      </S.SearchWrapper>
      <S.TopReviews>
        <S.SectionTitle>
          <S.Image src={sectionImage} alt="Section Icon" />
          조회수 TOP 7 여행 후기
        </S.SectionTitle>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
        <S.ReviewGrid>
          {loading ? (
            <div>로딩 중...</div>
          ) : (
            topReviews.map((review, index) => (
              <S.ReviewCard key={review.id}>
                <S.ImageWrapper src={review?.reviewImage?.fileUrl || conanImage}>
                  <S.Rank>{index + 1}</S.Rank>
                </S.ImageWrapper>
                <S.Description>{review.title}</S.Description>
              </S.ReviewCard>
            ))
          )}
        </S.ReviewGrid>
      </S.TopReviews>
    </S.Container>
  );
};

export default ReviewPage1;
