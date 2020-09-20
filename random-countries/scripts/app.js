/* eslint-disable */
const App = {
  data () {
    return {
      appName: 'RandomCountries',
      details: 'Every 5 seconds, we will set a random country from CountriesNow API',
      counter: 0,
      countries: null,
      selectedCountry: null,
      isChanging: false
    }
  },
  mounted () {
    this.getAllCountries()

    setInterval(() => {
      if (this.counter === 1000) {
        this.counter = 0
      }

      this.counter++
      if (this.counter % 5 === 0) {
        this.selectRandom()
      }
    }, 1000)
  },
  methods: {
    getAllCountries () {
      fetch('https://countriesnow.space/api/v0.1/countries/flag/unicode')
        .then((response) => response.json())
        .then((data) => {
          this.countries = data.data
          this.selectRandom()
        })
    },
    selectRandom () {
      this.isChanging = true
      this.selectedCountry = this.countries[Math.floor(Math.random() * this.countries.length)]
      console.log(this.selectedCountry)
      setTimeout(() => {
        this.isChanging = false
      }, 1000);
    }
  }
}

Vue.createApp(App).mount('#app')
