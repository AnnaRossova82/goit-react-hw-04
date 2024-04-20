import axios from "axios";

axios.defaults.baseURL = 'https://api.unsplash.com/';
axios.defaults.headers.common['Authorization'] = 'Client-ID _CN-smlrxNw7HR_U3vyGrICzNrWeA9JnMCkYq0sp0fY';

export const fetchImages = async (searchQuery, currentPage) => {
    try {
        const response = await axios.get("/search/photos", {
            params: {
              query: searchQuery,
              per_page: 12,
              orientation: "landscape",
              page: currentPage,
            },
          });
          console.log(response.data.results); 

          return response.data.results;

    } catch (error) {
        console.error('Error fetching images:', error);
      return []; 
    }
}

