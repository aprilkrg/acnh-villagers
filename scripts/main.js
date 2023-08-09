// console.log("good morning developers") // connection check
// xmlhttp help from https://javascript.info/xmlhttprequest

const displayVillagers = function(data) {
    console.log("VILLAGERS DATA", data)
    data.forEach(villager => {
        // console.log("villager:", villager.name)
        let vEl = document.createElement("p")
        console.log("innertext", vEl.innerText)
        // vEl.innerText(villager.name)
        // document.appendChild(vEl)
    })
}

const xhr = new XMLHttpRequest()
xhr.withCredentials = false
xhr.responseType = "json"
const xmlRequest = function() {
    xhr.open("GET", "https://api.nookipedia.com/villagers?api_key=d659c807-1aa9-4c06-b204-1faf7ccfc4da")
    xhr.send()
    xhr.onload = function() {
        if (xhr.status != 200) { // HTTP error?
            // handle error
            console.log('Error: ', xhr.status)
            return
        }
        let responseObj = xhr.response
    }
    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === this.DONE) {
            // console.log(this.response)
            displayVillagers(this.response)
        }
    })
    xhr.onerror = function() {
    // handle non-HTTP error (e.g. network down)
        document.querySelector("body").innerText("Network Error")
    }
}


const displayBtn = document.querySelector("#display")
displayBtn.addEventListener("click", xmlRequest)
