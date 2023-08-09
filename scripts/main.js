// ===== CONFIG ===== //
const xhr = new XMLHttpRequest()
xhr.withCredentials = false
xhr.responseType = "json"

// ===== DOM VARIABLES ===== //
const displayBtn = document.querySelector("#display")
const villagerDiv = document.querySelector("#villager-div")
const h2 = document.querySelector("h2")

// ===== FUNCTIONS ===== //
const displayVillagers = function(data) {
    // console.log("VILLAGERS DATA", data)
    h2.style.display = "block"
    data.forEach(villager => {
        console.log("villager:", villager)
        //create div
        let vEl = document.createElement("button")
        vEl.classList.add("v_card")
        // create name & personality p tag
        let vName =  document.createElement("p")
        vName.innerText = villager.name + ", personality: " + villager.personality
        // create img
        let vImg = document.createElement("img")
        vImg.src = villager.image_url
        vImg.classList.add("v_img")

        // append created elements
        vEl.append(vName)
        vEl.append(vImg)
        // append el to div
        villagerDiv.append(vEl)
    })
}

// xmlhttp help from https://javascript.info/xmlhttprequest
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

// ===== EVENT LISTENERS ===== // 
// displayBtn.addEventListener("click", xmlRequest) // get data from API request 
displayBtn.addEventListener("click", ()=> { // get data from json file
    // console.log("data", villagerdata)
    displayVillagers(villagerdata)
})