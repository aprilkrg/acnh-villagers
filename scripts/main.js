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
const displayVillagers = function(data, type) {
    // set heading
    h2.style.display = "block"
    filterType.innerText = type
    // remove all btns to make a clean slate
    while (villagerDiv.lastElementChild) {
        villagerDiv.removeChild(villagerDiv.lastElementChild);
    }
    // loop over data provided
    data.forEach(villager => {
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

        // set event listener
        vEl.addEventListener("click", function(){
            console.log("villager: ", villager)
            displayVillagers([villager], villager.name)
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