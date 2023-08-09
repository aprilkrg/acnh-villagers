// ===== CONFIG ===== //
const xhr = new XMLHttpRequest()
xhr.withCredentials = false
xhr.responseType = "json"

// ===== DOM VARIABLES ===== //
const displayBtn = document.querySelector("#display")
const newHorizonsBtn = document.querySelector("#new-horizons")
const lazyBtn = document.querySelector("#lazy")
const villagerDiv = document.querySelector("#villager-div")
const h2 = document.querySelector("h2")
const filterType = document.querySelector("#v-type")

// ===== FUNCTIONS ===== //
const displayDetails = function(data) {
    h2.style.display = "none"
    // create div
    let vDetails = document.createElement("div")
    vDetails.style.display = "flex"
    vDetails.style.flexDirection = "column-reverse"

    // create phrase p tag
    let vPhrase = document.createElement("p")
    vPhrase.innerText = "Phrase: '" + data.phrase + "'"
    // create quote p tag
    let vQuote = document.createElement("p")
    vQuote.innerText = data.quote
    vQuote.style.fontStyle = "italic"
    // create personality p tag
    let vPersonality = document.createElement("p")
    vPersonality.innerText = "Personality: " + data.personality
    // create birthday p tag
    let vBday = document.createElement("p")
    vBday.innerText = "Birthday: " + data.birthday_month + " " + data.birthday_day + ", " + data.sign
    // append created elements
    vDetails.append(vQuote, vPhrase, vPersonality, vBday)
    // append details to villager-div
    villagerDiv.append(vDetails)
    villagerDiv.classList.add("v-details")
}

const displayVillagers = function(data, type) {
    // set heading
    h2.style.display = "block"
    filterType.innerText = type
    // remove all btns to make a clean slate
    while (villagerDiv.lastElementChild) {
        villagerDiv.removeChild(villagerDiv.lastElementChild);
    }
    // remove v-details classlist
    villagerDiv.classList.remove("v-details")
    // loop over data provided
    data.forEach(villager => {
        //create div
        let vEl = document.createElement("button")
        vEl.classList.add("v_card")
        // create name p tag
        let vName =  document.createElement("p")
        vName.innerText = villager.name 
        // create img
        let vImg = document.createElement("img")
        vImg.src = villager.image_url
        vImg.classList.add("v_img")

        // append created elements
        vEl.append(vName, vImg)
        // append el to div
        villagerDiv.append(vEl)

        // set event listener
        vEl.addEventListener("click", function(){
            console.log("villager: ", villager)
            displayVillagers([villager], "")
            displayDetails(villager)
        })
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
displayBtn.addEventListener("click", () => { // get data from json file
    displayVillagers(villagerdata, "All")
})
newHorizonsBtn.addEventListener("click", () => {
    const nhData = villagerdata.filter((v) => v.appearances.includes("NH"))
    displayVillagers(nhData, "New Horizons")
})
lazyBtn.addEventListener("click", () => {
    const lazies = villagerdata.filter((v) => v.personality === "Lazy")
    displayVillagers(lazies, "Lazy")
})

// loading images is slow, could i speed it up by invoking the display villager func at the end of the file and setting display to hidden?
document.addEventListener("DOMContentLoaded", () => {
    displayVillagers(villagerdata, "All")
    villagerDiv.style.display = "none"
    h2.style.display = "none"

})