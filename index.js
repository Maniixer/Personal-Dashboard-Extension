fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=lotr")
  .then((res) => res.json())
  .then((data) => {
    const unsplashImg = data.urls.full;
    const authorName = data.user.name;
    document.body.style.backgroundImage = `url(${unsplashImg})`;
    document.getElementById("author-name").innerText = `By: ${authorName}`;
  })
  .catch((err) => {
    console.log(err);
    document.querySelector(".time").innerText = "A Error Has Occurd, Please Reload The Page!";
    document.querySelector(".time").style.color = "red";
    document.body.style.backgroundImage =
      "url('https://d7hftxdivxxvm.cloudfront.net/?quality=80&resize_to=width&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F2RNK1P0BYVrSCZEy_Sd1Ew%252F3417757448_4a6bdf36ce_o.jpg&width=910')";
  });

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    const cryptoName = data.name;
    const cryptoLogo = data.image.thumb;

    document.getElementById("crypto-container").innerHTML = `
    <div id="crypto-logo">
        <img src="${cryptoLogo}" alt="${cryptoName}" class="logo">
        <p class="crypto-name">${cryptoName}</p>
        </div>
        <div id="crypto-market-data">
        <p class="cmd-text">🎯 €${data.market_data.current_price.eur}</p>
        <p class="cmd-text">👆 €${data.market_data.high_24h.eur}</p>
        <p class="cmd-text">👇 €${data.market_data.low_24h.eur}</p>
          </div>
    `;
  })
  .catch((err) => console.error(err));

function getCurrentTime() {
  const currentTime = new Date().toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" });
  document.getElementById("timer").innerText = currentTime;
}

setInterval(getCurrentTime, 1000);

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
};

function succes(position) {
  const apiKey = "06fee816140309b1972e95737a63dd0b";
  const cordinates = position.coords;
  const lat = cordinates.latitude;
  const lon = cordinates.longitude;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=06fee816140309b1972e95737a63dd0b&units=metric`)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      const weatherIcon = data.weather[0].icon;
      document.getElementById("weather-container").innerHTML = `
      <div class="weather-logoandcelcius">
            <img class="weather-logo" src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="weather icon" />
            <p class="weather-celcius">${Math.floor(data.main.temp)}°</p>
          </div>
          <div class="city">
            <p class="weather-city">${data.name}</p>
          </div>
      `;
    });
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(succes, error, options);
