<template>
  <div class="weather-popup">
    <div class="weather-popup__close"><button @click="closePopup">&#x2715</button></div>
    <div v-if="isLoaded" class="weather-popup__loaded-content">
      <h4>Current temperature:</h4>
      <h2>{{weatherData.currentTemperature}}°C</h2>
      <div class="weather-popup__min-max">
        <div>
          <h5>Min:</h5>
          <h3>{{weatherData.temp_min}}°C</h3>
        </div>
        <div>
          <h5>Max:</h5>
          <h3>{{weatherData.temp_max}}°C</h3>
        </div>
      </div>
      <div class="weather-popup__description">
        <h5>Location:</h5>
        <h3>{{weatherData.location}}</h3>
        <h5>Visibility:</h5>
        <h3>{{weatherData.sky}}</h3>
        <h5>Humidity:</h5>
        <h3>{{weatherData.humidity}} %</h3>
        <h5>Wind speed:</h5>
        <h3>{{weatherData.wind}} km/h</h3>
      </div>
    </div>
    <div v-else class="weather-popup__loading-content">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      <h3>Loading weather data...</h3>
    </div>
  </div>
</template>

<script>

export default {
  name: "Weather",
  data() {
    return {
      weatherData: {},
      isLoaded: false,
      weatherUrl: 'https://api.openweathermap.org/data/2.5/weather?lat=44.78&lon=20.45&units=metric&appid=90730ad5c59e25d0c16a8805483dd077'
    }
  },
  methods: {
    fetchWeatherData() {
      fetch(this.weatherUrl)
      .then(res=>res.json())
      .then(data => {
        console.log(data)
        this.weatherData = {
          location: data.name,
          sky: data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1),
          currentTemperature: Math.round(data.main.temp),
          humidity: data.main.humidity,
          temp_max: Math.round(data.main.temp_max),
          temp_min: Math.round(data.main.temp_min),
          wind: data.wind.speed
        }
        this.isLoaded = true
      })
    },
    closePopup() {
      this.$emit('closePopup', false)
    }
  },
  mounted() {
    this.fetchWeatherData()
  }
}
</script>

<style>
@import './Weather.css';
</style>