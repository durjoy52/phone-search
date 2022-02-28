const searchResult = () =>{
    const searchBox = document.getElementById('search-box');
    const searchValue = searchBox.value;
    searchValue.textContent =''
    
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayAllPhone(data.data))
    
}
const displayAllPhone = mobiles =>{
    const cardsContainer = document.getElementById('cards-container')
    cardsContainer.textContent =''
    for(const mobile of mobiles.slice(0,20)){
        const div =document.createElement('div')
        div.classList.add('col')
        div.innerHTML =`
        <div class="card h-100">
        <img src="${mobile.image}" class="card-img-top" alt="...">
        <div class="card-body bg-info">
          <h5 class="card-title">Brand: ${mobile.brand}</h5>
          <p class="card-text">Name: ${mobile.phone_name}</p>
        </div>
        <div onclick="moreDetails('${mobile.slug}')" class="card-footer btn bg-primary">
          <span class="fw-bold text-white">Details</span>
        </div>
      </div>
        `
        cardsContainer.appendChild(div)
        // console.log(mobile)
    }
}

const moreDetails = id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data))
}

const displayDetails = info =>{
       const detailsBanner = document.getElementById('details-banner')
       detailsBanner.textContent =''
       const div = document.createElement('div')
       div.innerHTML =`
       <div class="card mx-auto" style="max-width: 540px;">
       <div class="row">
       <div class="col-md-5">
       <img src="${info.image}" class="card-img-top" alt="...">
       </div>
       <div class="col-md-7">
       <div class="card-body">
         <h4 class="card-title">${info.name}</h4>
         <p class="card-text"><small class="text-muted">${info.releaseDate}:'release-date not found'</small></p>
         <h5>Main-features:</h5>
         <p>
         <strong>chipSet:</strong> ${info.mainFeatures.chipSet} <strong>display:</strong> ${info.mainFeatures.displaySize} <strong>memory:</strong> ${info.mainFeatures.memory}    
         <strong>storage:</strong> ${info.mainFeatures.storage}
         </P>
         <p id ="sensors"><strong>Sensors: </strong></p>
       </div>
       </div>
       </div>
     </div>
       `
detailsBanner.appendChild(div)
const sensors = document.getElementById('sensors')
info.mainFeatures.sensors.forEach(feature =>{
  const span = document.createElement('span')
  span.innerText = `${feature}, `
  sensors.appendChild(span) 
})
console.log(info)
}