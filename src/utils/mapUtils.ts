import logoRepeat from '../assets/logorepeat.png';

// interface GooglePlacePhoto extends google.maps.places.PlacePhoto {
//   photo_reference: string;
// }

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
    const latlng = { lat: latitude, lng: longitude };

    // 1. 역지오코딩
    const geocoder = new google.maps.Geocoder();
    const geocodeResponse = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          resolve(results);
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });

    const address = geocodeResponse[0].formatted_address;

    // 2. Places API로 장소 검색
    const service = new google.maps.places.PlacesService(map);

    const searchRequest: google.maps.places.PlaceSearchRequest = {
      location: latlng,
      // radius를 제거하고 rankBy만 사용
      rankBy: google.maps.places.RankBy.DISTANCE,
      // 검색 결과를 개선하기 위해 type 추가
      type: 'point_of_interest',
    };

    const places = await new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
      service.nearbySearch(searchRequest, (results, status) => {
        if (status === 'OK' && results) {
          resolve(results);
        } else if (status === 'ZERO_RESULTS') {
          resolve([]);
        } else {
          reject(new Error(`Places search failed: ${status}`));
        }
      });
    });

    let photoUrl = undefined;
    let name = undefined;
    let placeId = undefined;

    if (places && places.length > 0) {
      // 가장 가까운 장소의 상세 정보 가져오기
      const place = places[0];

      // Place Details 요청
      const placeDetails = await new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
        service.getDetails(
          {
            placeId: place.place_id,
            fields: ['name', 'photos', 'place_id'],
          },
          (result, status) => {
            if (status === 'OK' && result) {
              resolve(result);
            } else {
              reject(new Error(`Place Details failed: ${status}`));
            }
          },
        );
      });

      name = placeDetails.name;
      placeId = placeDetails.place_id;

      if (placeDetails.photos && placeDetails.photos.length > 0) {
        try {
          photoUrl = placeDetails.photos[0].getUrl({
            maxWidth: 800,
            maxHeight: 800,
          });
          console.log('Generated photo URL:', photoUrl);
        } catch (error) {
          console.error('Failed to get photo URL:', error);
        }
      }
    }

    // 결과 반환
    return {
      address,
      photoUrl: photoUrl || logoRepeat,
      name: name || geocodeResponse[0].address_components[0].long_name,
      placeId,
    };
  } catch (error) {
    console.error('Error in getPlaceDetails:', error);
    return {
      address: '',
      photoUrl: logoRepeat,
      name: undefined,
      placeId: undefined,
    };
  }
};

// export const getPlaceDetails = async (
//   latitude: number,
//   longitude: number,
//   apiKey: string,
//   map: google.maps.Map,
// ): Promise<PlaceDetails> => {
//   try {
//     // 1. 역지오코딩으로 주소 가져오기
//     const geocoder = new google.maps.Geocoder();
//     const latlng = { lat: latitude, lng: longitude };

//     const geocodeResponse = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
//       geocoder.geocode({ location: latlng }, (results, status) => {
//         if (status === 'OK' && results) {
//           resolve(results);
//         } else {
//           reject(new Error(`Geocoding failed: ${status}`));
//         }
//       });
//     });

//     if (!geocodeResponse || geocodeResponse.length === 0) {
//       throw new Error('No geocoding results found');
//     }

//     const address = geocodeResponse[0].formatted_address;

//     // 2. Places API로 상세 정보 가져오기
//     const service = new google.maps.places.PlacesService(map);
//     const query = `${latitude},${longitude}`;

//     const searchRequest = {
//       query: query,
//       location: latlng,
//       radius: 100,
//     };

//     const places = await new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
//       service.textSearch(searchRequest, (results, status) => {
//         if (status === 'OK' && results) {
//           resolve(results);
//         } else {
//           reject(new Error(`Places API failed: ${status}`));
//         }
//       });
//     });

//     let name: string | undefined;
//     let placeId: string | undefined;
//     let photoUrl: string | undefined;

//     console.log('Places API search results:', places);

//     // if (places && places.length > 0) {
//     //   name = places[0].name;
//     //   placeId = places[0].place_id;

//     //   if (places[0].photos && places[0].photos.length > 0) {
//     //     try {
//     //       // Google Maps JavaScript API의 Place Photo URL을 직접 구성
//     //       const photo = places[0].photos[0];
//     //       // 중요: 아래와 같이 rawReference 형식의 url 생성
//     //       const rawReference = photo
//     //         .getUrl({ maxWidth: 800, maxHeight: 800 })
//     //         .split('1s')[1]
//     //         .split('&')[0];

//     //       if (rawReference) {
//     //         // Places Photo API URL 형식으로 변경
//     //         photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${rawReference}&key=${apiKey}`;
//     //         console.log('Final constructed photo URL:', photoUrl);
//     //       } else {
//     //         photoUrl = logoRepeat;
//     //       }
//     //     } catch (error) {
//     //       console.error('Error getting photo URL:', error);
//     //       photoUrl = logoRepeat;
//     //     }
//     //   }
//     // }
//     if (places && places.length > 0) {
//       name = places[0].name;
//       placeId = places[0].place_id;

//       if (places[0].photos && places[0].photos.length > 0) {
//         try {
//           const photo = places[0].photos[0];
//           photoUrl = photo.getUrl({
//             maxWidth: 800,
//             maxHeight: 800,
//           });
//           console.log('getUrl photo URL:', photoUrl);
//         } catch (error) {
//           console.error('Error getting photo URL:', error);
//           photoUrl = logoRepeat;
//         }
//       } else {
//         photoUrl = logoRepeat;
//       }
//     }

//     // 이미지가 없는 경우 기본 이미지 사용
//     if (!photoUrl) {
//       photoUrl = logoRepeat;
//     }

//     return {
//       address,
//       photoUrl,
//       name,
//       placeId,
//     };
//   } catch (error) {
//     console.error('Error fetching place details:', error);
//     return {
//       address: '',
//       photoUrl: logoRepeat,
//       name: undefined,
//       placeId: undefined,
//     };
//   }
// };
