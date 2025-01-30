export interface PlaceDetails {
  address: string;
  photoUrl?: string;
  name?: string;
  placeId?: string;
}

export const getPlaceDetails = async (
  latitude: number,
  longitude: number,
  apiKey: string,
  map: google.maps.Map,
): Promise<PlaceDetails> => {
  try {
    // 1. 주소 가져오기
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: latitude, lng: longitude };

    const geocodeResponse = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK' && results) {
          resolve(results);
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });

    if (!geocodeResponse || geocodeResponse.length === 0) {
      throw new Error('No geocoding results found');
    }

    const address = geocodeResponse[0].formatted_address;

    // 2. Places API로 상세 정보 가져오기
    const service = new google.maps.places.PlacesService(map);

    // 위도/경도를 기반으로 검색 쿼리 생성
    const query = `${latitude},${longitude}`;

    const searchRequest = {
      query: query,
      location: latlng,
      radius: 100, // 미터 단위
    };

    const places = await new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
      service.textSearch(searchRequest, (results, status) => {
        console.log('Text search results:', results);
        console.log('Text search status:', status);
        if (status === 'OK' && results) {
          resolve(results);
        } else {
          reject(new Error(`Places API failed: ${status}`));
        }
      });
    });

    let name: string | undefined;
    let placeId: string | undefined;
    let photoUrl: string | undefined;

    if (places && places.length > 0) {
      name = places[0].name;
      placeId = places[0].place_id;

      // places[0].photos가 있다면 바로 사용
      if (places[0].photos && places[0].photos.length > 0) {
        photoUrl = places[0].photos[0].getUrl({
          maxWidth: 800,
          maxHeight: 600,
        });
        console.log('Generated photo URL from search:', photoUrl);
      }
      // 없다면 place details로 추가 정보 가져오기
      else if (placeId) {
        const detailsRequest = {
          placeId: placeId,
          fields: ['photos', 'formatted_address', 'name'],
        };

        const placeDetails = await new Promise<google.maps.places.PlaceResult>(
          (resolve, reject) => {
            service.getDetails(detailsRequest, (result, status) => {
              if (status === 'OK' && result) {
                resolve(result);
              } else {
                reject(new Error(`Place Details failed: ${status}`));
              }
            });
          },
        );

        if (placeDetails.photos && placeDetails.photos.length > 0) {
          photoUrl = placeDetails.photos[0].getUrl({
            maxWidth: 800,
            maxHeight: 600,
          });
          console.log('Generated photo URL from details:', photoUrl);
        }
      }
    }

    // 사진이 없는 경우 Street View를 사용
    if (!photoUrl) {
      photoUrl = `https://maps.googleapis.com/maps/api/streetview?size=800x600&location=${latitude},${longitude}&key=${apiKey}&heading=0&pitch=0&fov=90`;
      console.log('Using Street View fallback:', photoUrl);
    }

    return {
      address,
      photoUrl,
      name,
      placeId,
    };
  } catch (error) {
    console.error('Error fetching place details:', error);
    // 에러 발생 시 Street View 이미지 반환
    const fallbackUrl = `https://maps.googleapis.com/maps/api/streetview?size=800x600&location=${latitude},${longitude}&key=${apiKey}&heading=0&pitch=0&fov=90`;
    console.log('Using error fallback URL:', fallbackUrl);
    return {
      address: '',
      photoUrl: fallbackUrl,
      name: undefined,
      placeId: undefined,
    };
  }
};
