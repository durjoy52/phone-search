const searchResult = () =>{
    const searchBox = document.getElementById('search-box');
    const searchValue = searchBox.value;
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayAllPhone(data.data))
    
}
const displayAllPhone = mobiles =>{
    const cardsContainer = document.getElementById('cards-container')
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
    .then(data => console.log(data.data))
}