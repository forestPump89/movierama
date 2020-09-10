export const apiUrl = `https://api.themoviedb.org/3`;

// In case of CORS replace the apiUrl with the proxy one in the comment bellow
//export const apiUrl=`https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3`;

export const headers = () => {
  return {
    'Content-Type': 'application/json'
  };
};
