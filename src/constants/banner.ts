export const BANNER_DATA = [
  {
    id: 1,
    uuid: 'banner-2024-main-1',
    fileName: 'main-banner-2024-1.jpg',
    fileUrl: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=2070',
  },
  {
    id: 2,
    uuid: 'banner-2024-main-2',
    fileName: 'main-banner-2024-2.jpg',
    fileUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=2074',
  },
  {
    id: 3,
    uuid: 'banner-2024-main-3',
    fileName: 'main-banner-2024-3.jpg',
    fileUrl: 'https://images.unsplash.com/photo-1583795128727-6ec3642408f8?q=80&w=2070',
  },
  {
    id: 4,
    uuid: 'banner-2024-main-4',
    fileName: 'main-banner-2024-4.jpg',
    fileUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=2070',
  },
];

// 랜덤 배너 가져오는 유틸리티 함수
export const getRandomBanner = () => {
  const randomIndex = Math.floor(Math.random() * BANNER_DATA.length);
  return BANNER_DATA[randomIndex];
};
