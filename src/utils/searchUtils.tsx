// 초성 추출 함수
const CHOSUNG_LIST = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

export const getChosung = (str: string): string => {
  return str
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0) - 0xac00;
      if (code > -1 && code < 11172) {
        return CHOSUNG_LIST[Math.floor(code / 28 / 21)];
      }
      return char;
    })
    .join('');
};

// 검색어 매칭 함수
export const koreanMatch = (text: string, search: string): boolean => {
  if (!text || !search) return false;

  const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '');
  const textNormalized = normalize(text);
  const searchNormalized = normalize(search);

  // 1. 직접 매칭
  if (textNormalized.includes(searchNormalized)) return true;

  // 2. 초성 매칭
  const textChosung = getChosung(textNormalized);
  const searchChosung = getChosung(searchNormalized);
  if (textChosung.includes(searchChosung)) return true;

  // 3. 자음만 입력된 경우 처리
  if (/^[ㄱ-ㅎ]+$/.test(searchNormalized)) {
    return textChosung.includes(searchNormalized);
  }

  return false;
};
