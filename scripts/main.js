console.log("good morning developers")

// import axios from "axios"
// const axios = require("axios").default

// const options = {
//     method: "GET",
//     url: "https://animal-crossing-new-horizons2.p.rapidapi.com/api/v1/accessories",
//     params: {
//         page_size: "50",
//         page: "1"
//     },
//     headers: {
//         "X-RapidAPI-Key": "d659c807-1aa9-4c06-b204-1faf7ccfc4da",
//         "X-RapidAPI-Host": "animal-crossing-new-horizons2.p.rapidapi.com"
//     }
// };

//     // try {
//     //     const response = await axios.request(options);
//     //     console.log(response.data);
//     // } catch (error) {
//     //     console.error(error);
//     // }

// axios.request(options)
//     .then(function(response) {
//     // handle success
//     console.log("DATA\n",response.data)
//     })
//     .catch(function(error) {
//     // handle error
//     console.log("ERROR=>", error)
//     })
//     .finally(function() {
//     // always executed
//     console.log("Finished Axios GET request")
//     })



const data = null;

const xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
        console.log(this.responseText);
    }
});

// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       document.getElementById("demo").innerHTML =
//       this.responseText;
//     }
//   };

// xhr.open('GET', 'https://api.nookipedia.com/villagers?api_key=d659c807-1aa9-4c06-b204-1faf7ccfc4da');
// xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');


// xhr.send(data);

xhr.open("GET", "https://api.nookipedia.com/villagers?api_key=d659c807-1aa9-4c06-b204-1faf7ccfc4da", true);
xhr.send();