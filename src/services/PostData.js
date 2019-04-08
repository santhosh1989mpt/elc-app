export function PostData(type, userData) {
    //let BaseURL = 'http://localhost:8080/rest_api/api/';
    let BaseURL = 'http://10.50.24.21/rest_api/api/';

    return new Promise((resolve, reject) =>{
    
         
        fetch(BaseURL+type, {
            method: 'POST',
            body: JSON.stringify(userData)
          })
          .then((response) => response.json())
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });

  
      });
}