
// clear result 
 const clearSearchResult = idName =>{
  const clearResult = document.getElementById(idName)
  clearResult.textContent =''
 }
//  massage generator
 const showOnOf = (idName,show) => {
 document.getElementById(idName).style.display = show
 }
//  search result 
const searchResult = () =>{
  showOnOf('massage2','none')
  const searchBox = document.getElementById('search-box');
  const searchValue = searchBox.value;
  searchBox.value =''
  if(searchValue == '' || !isNaN(searchValue)){
    showOnOf('massage','block')
  }else{
    showOnOf('massage','none')
    showOnOf('spinner','block')
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayAllPhone(data.data))
  }
    
}

// display cards 

const displayAllPhone = mobiles =>{
    const cardsContainer = document.getElementById('cards-container')
    clearSearchResult('cards-container')
    clearSearchResult('details-banner')
    if(mobiles.length == 0){
      showOnOf('massage2','block')
    }else
    showOnOf('massage2','none')
    for(const mobile of mobiles.slice(0,20)){
        const div =document.createElement('div')
        div.classList.add('col')
        div.innerHTML =`
        <div class="card h-100">
        <div class="w-100 d-flex align-items-center justify-content-center">
        <div class="w-50">
        <img src="${mobile.image}" class="card-img-top" alt="...">
        </div>
        </div>
        <div class="card-body bg-secondary text-light">
          <h5 class="card-title">Brand: ${mobile.brand}</h5>
          <p class="card-text">Name: ${mobile.phone_name}</p>
        </div>
        <div onclick="moreDetails('${mobile.slug}')" class="card-footer btn bg-primary">
          <span class="fw-bold text-white">Details</span>
        </div>
      </div>
        `
        cardsContainer.appendChild(div)
    }
    showOnOf('spinner','none')
}

//  more info by item id 
const moreDetails = itemId =>{
  showOnOf('spinner','block')
  const url = `https://openapi.programming-hero.com/api/phone/${itemId}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayDetails(data.data))
}

const displayDetails = info =>{
  clearSearchResult('details-banner')
  const cardDetails = document.getElementById('details-banner')
  
      //  card detail 
       const div = document.createElement('div')
       div.innerHTML =`
       <div class="card mx-auto" style="max-width: 540px;">
       <div class="row g-0 align-items-center">
       <div class="col-md-5 ">
      <img src="${info.image}" class="card-img-top" alt="...">
       </div>
       <div class="col-md-7">
       <div class="card-body">
         <h4 class="card-title">${info.name}</h4>
         <p class="card-text"><small class="text-muted">${info.releaseDate?info.releaseDate:'release-date not found'}</small></p>
         <h5>Main-features:</h5>
         <p>
         <strong>chipSet:</strong> ${info.mainFeatures.chipSet} <strong>display:</strong> ${info.mainFeatures.displaySize} <strong>memory:</strong> ${info.mainFeatures.memory}    
         <strong>storage:</strong> ${info.mainFeatures.storage}
         </P>
         <p id ="sensors"><strong>Sensors: </strong></p>
         <h5>Others:</h5>
         <p id="others"></p>
       </div>
       </div>
       </div>
     </div>
       `
cardDetails.appendChild(div)

//  all sensor features 
const sensors = document.getElementById('sensors')
info.mainFeatures.sensors.forEach(feature =>{
  const span = document.createElement('span')
  span.innerText = `${feature}, `
  sensors.appendChild(span) 
})

// other items 
const others = document.getElementById('others')
const items = info.others
for(const item in items){
  const span = document.createElement('span')
  span.innerHTML = `<strong>${item}:</strong> ${items[item]}, `
  others.appendChild(span) 
}
showOnOf('spinner','none')
}