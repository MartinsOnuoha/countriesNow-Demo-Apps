const BASE_URL = 'https://countriesnow.space/api/v0.1/countries'
let countryList = document.querySelector('#countryList')
let dialCode = document.querySelector('#dialCode')

let getCountries = async () => {
  let data = await fetch(BASE_URL).then(response => response.json())
  const countries = data.data
  countries.forEach((country) => {
    let option = document.createElement("option")
    option.appendChild(document.createTextNode(`${country.country}`))
    countryList.appendChild(option)
  })
}

let getDialCode = async () => {
  dialCode.innerHTML = 'Fetching...'

  const country = document.getElementById("countryList").value
  const payload = { country }

  const response = await fetch(`${BASE_URL}/codes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(payload)
  }).then(response => response.json())

  if (!response.error) {
    let { data } = response
    dialCode.innerHTML = `Dial Code for ${country}: ${data.dial_code}`
    return
  }
  dialCode.innerHTML = 'We could not get that'
}

getCountries()
