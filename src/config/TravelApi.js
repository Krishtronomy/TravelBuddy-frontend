import axios from 'axios';

// Save travel advisor API in URL variable
const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

const options = {
  params: {
    bl_latitude: '11.847676',
    tr_latitude: '12.838442',
    bl_longitude: '109.095887',
    tr_longitude: '109.149359',
  },
  headers: {
    'X-RapidAPI-Key': 'bc4055fb00mshf976bd99b91c0f7p18896ajsn7d4ca347bc53',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};

// Make travel advisor API call using URL passed through axios

export const getPlacesData = async () => {
    try {
        const { data: { data } } = await axios.get(URL, options);

        return data;
    } catch (error) {
        console.log(error)
    }
}