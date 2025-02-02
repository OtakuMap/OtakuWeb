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
    // 1. 역지오코딩으로 주소 가져오기
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
    const query = `${latitude},${longitude}`;

    const searchRequest = {
      query: query,
      location: latlng,
      radius: 100,
    };

    const places = await new Promise<google.maps.places.PlaceResult[]>((resolve, reject) => {
      service.textSearch(searchRequest, (results, status) => {
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

      if (places[0].photos && places[0].photos.length > 0) {
        photoUrl = places[0].photos[0].getUrl({
          maxWidth: 800,
          maxHeight: 600,
        });
      } else if (placeId) {
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
        }
      }
    }

    // 이미지가 없는 경우 기본 이미지 사용
    if (!photoUrl) {
      photoUrl = '/src/assets/logorepeat.png';
    }

    return {
      address,
      photoUrl,
      name,
      placeId,
    };
  } catch (error) {
    console.error('Error fetching place details:', error);
    return {
      address: '',
      photoUrl: '/src/assets/logorepeat.png',
      name: undefined,
      placeId: undefined,
    };
  }
};
