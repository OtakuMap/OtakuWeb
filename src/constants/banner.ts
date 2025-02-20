export const BANNER_DATA = [
  {
    id: 1,
    uuid: '9e5f9cee-245e-49f7-a079-ba9e408c9210',
    fileName: 'banner-1.jpg',
    fileUrl:
      'https://otakumap-s3-bucket.s3.ap-northeast-2.amazonaws.com/event/9e5f9cee-245e-49f7-a079-ba9e408c9210',
  },
  {
    id: 2,
    uuid: '0c7c6ec4-40a4-4263-8973-1c1f3474f31d',
    fileName: 'banner-2.jpg',
    fileUrl:
      'https://otakumap-s3-bucket.s3.ap-northeast-2.amazonaws.com/event/0c7c6ec4-40a4-4263-8973-1c1f3474f31d',
  },
  {
    id: 3,
    uuid: 'db5d68ea-0690-4633-bb71-a45db2afb922',
    fileName: 'banner-3.jpg',
    fileUrl:
      'https://otakumap-s3-bucket.s3.ap-northeast-2.amazonaws.com/event/db5d68ea-0690-4633-bb71-a45db2afb922',
  },
  {
    id: 4,
    uuid: '640fb4c1-a268-4da2-8c1f-ad405faff341',
    fileName: 'banner-4.jpg',
    fileUrl:
      'https://otakumap-s3-bucket.s3.ap-northeast-2.amazonaws.com/event/640fb4c1-a268-4da2-8c1f-ad405faff341',
  },
  {
    id: 5,
    uuid: 'cf74a506-e02f-4dda-86bc-3ba166e93c3e',
    fileName: 'banner-5.jpg',
    fileUrl:
      'https://otakumap-s3-bucket.s3.ap-northeast-2.amazonaws.com/event/cf74a506-e02f-4dda-86bc-3ba166e93c3e',
  },
  {
    id: 6,
    uuid: '0e3ff7d0-fc2a-4de7-8836-87eaed489c17',
    fileName: 'banner-6.jpg',
    fileUrl:
      'https://otakumap-s3-bucket.s3.ap-northeast-2.amazonaws.com/event/0e3ff7d0-fc2a-4de7-8836-87eaed489c17',
  },
  {
    id: 7,
    uuid: 'fde9be4b-dd6f-49d5-806f-b5f2668dcd6f',
    fileName: 'banner-7.jpg',
    fileUrl:
      'https://otakumap-s3-bucket.s3.ap-northeast-2.amazonaws.com/event/fde9be4b-dd6f-49d5-806f-b5f2668dcd6f',
  },
  {
    id: 8,
    uuid: '77116d4c-3db3-45ee-8c03-6cc3f447a2ed',
    fileName: 'banner-8.jpg',
    fileUrl:
      'https://otakumap-s3-bucket.s3.ap-northeast-2.amazonaws.com/event/77116d4c-3db3-45ee-8c03-6cc3f447a2ed',
  },
  {
    id: 9,
    uuid: 'f47a964a-32ad-4b10-b5ae-e5d3d8a25d61',
    fileName: 'banner-9.jpg',
    fileUrl:
      'https://otakumap-s3-bucket.s3.ap-northeast-2.amazonaws.com/event/f47a964a-32ad-4b10-b5ae-e5d3d8a25d61',
  },
];

// 랜덤 배너 가져오는 유틸리티 함수
export const getRandomBanner = () => {
  const randomIndex = Math.floor(Math.random() * BANNER_DATA.length);
  return BANNER_DATA[randomIndex];
};
