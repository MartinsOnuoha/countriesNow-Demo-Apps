const BASE_URL = 'https://countriesnow.space/api/v0.1/countries'
const row = document.querySelector('.cn__row');
let countries = []

let getCountriesAndFlags = async () => {
  let response = await fetch(`${BASE_URL}/flag/images`).then(response => response.json())
  const { data } = response
  countries = data

  countries.forEach(country => {
    let col = document.createElement('div')
    col.classList.add('cn__col')
    col.innerHTML = `
      <div class="cn__card cn__bg-white center" id="${country.name}">
        <div class="country__img" style="background-image: url('${country.flag ? country.flag : 'https://countriesnow.space/img/1.png'}')"></div>
        <p class="country__name">${country.name}</p>
        <div class="country__action">
          <button class="action__btn cn__bg-brown no-border bshadow" onclick="viewCities(this)">View Cities</button>
        </div>
        <div class="country__cities">

        </div>
      </div>
    `
    row.appendChild(col)
  });
}

let viewCities = async (e) => {
  let ul = document.createElement('ul')
  let country = e.parentElement.parentElement.id
  let { children } = e.parentElement.parentElement

  children[0].style.display = 'none';
  children[1].style.display = 'none';
  children[2].style.display = 'none';

  let response = await fetch(`${BASE_URL}/cities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ country })
  }).then(response => response.json())


  if (!response.error) {
    let { data } = response
    data.forEach((city) => {
      let li = document.createElement('li')
      li.innerHTML = city
      ul.appendChild(li)
    })
    children[3].appendChild(ul)
    console.log(data)
  }
  console.log(e.parentElement.parentElement.children)

}

let close = () => {

}

getCountriesAndFlags()
