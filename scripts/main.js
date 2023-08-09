console.log("good morning developers")

// const data = null;
const xhr = new XMLHttpRequest();

// const getVillagers = function(){
//     let villagerData = null
//     xhr.addEventListener('readystatechange', function () {
//         if (this.readyState === this.DONE) {
//             console.log(this.responseText)
//             villagerData = this.responseText
//         }
//     });
//     xhr.open("GET", "https://api.nookipedia.com/villagers?api_key=d659c807-1aa9-4c06-b204-1faf7ccfc4da", true)
//     xhr.send()
// }
// const result = getVillagers()
// console.log("RESULT:", result)

xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
        console.log(this.response)
    }
});

xhr.open('GET', 'https://api.nookipedia.com/villagers?api_key=d659c807-1aa9-4c06-b204-1faf7ccfc4da');

xhr.responseType = 'json';

xhr.onload = function() {
    let responseObj = xhr.response;
    // console.log("RESPONSE", responseObj.message); 
};
xhr.send();