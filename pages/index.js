import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import axios from 'axios'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [location, setLocation] = useState('');
  const [data, setData] = useState({});
  const [weather, setWeather] = useState();
  const [ErrorMessange, setErrorMessange] = useState('');
  const [temp, setTemp] = useState();
  const [feel, setFeel] = useState();
  const [wind, setWind] = useState();
  const [date, setDate] = useState();
  const [display, setDisplay] = useState(false);
  const [bg, setBg] = useState("");
  const [lowtemp, setLowtemp] = useState();
  const [hightemp, setHightemp] = useState();

  var newday = new Date(date * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  var year = newday.getFullYear();
  var month = months[newday.getMonth()];
  var dat = newday.getDate();
  var hour = newday.getHours();
  var min = newday.getMinutes();
  var localtime = newday.toLocaleTimeString();

  var apiKey = "8ca7e2dc56cc6762826d7af08501be29";
  var lang = "en";
  var units = "metric";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}&lang=${lang}`
  console.log(url);

  const searchLocation = (event) => {
    if(event.key === "Enter"){
      axios.get(url)
      .then((response) => {
        console.clear();
        setData(response.data)
        console.log(response.data);
        setWeather(response.data.weather);
        setTemp(response.data.main.temp);
        setFeel(response.data.main.feels_like);
        setWind(response.data.wind.gust);
        setLowtemp(response.data.main.temp_max);
        setHightemp(response.data.main.temp_min);
        setDate(response.data.dt);
        setDisplay(true);
        setBg(response.data.weather[0].main.toLowerCase());
        setErrorMessange("")
      }).catch(err => {
        console.log(err);
        setErrorMessange("Please enter another location");
        setData({});
        setWeather();
        setTemp();
        setFeel();
        setWind();
        setDate();
      })
      setLocation('')
    }
  }
  return (
    <>
      <Head>
        <title>Weather Forecast</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} 
        style={{backgroundImage: `url("/${bg}.png")`}}>

      <div className={styles.home}>
          <img className={styles.homeicon} src="./homeicon.png"/>
          <div className={styles.title}>Weather Forecast </div>
      </div>

        <div className={styles.input}>
          <div className={styles.errormessage}>
            {ErrorMessange}
          </div>
          <input 
            value={location}
            onChange={event => setLocation(event.target.value)}
            placeholder="Enter Location"
            onKeyDown={searchLocation}
            type="text"
          />
        </div>

        {display ? 
          <>

        <div className={styles.locationcont}>
          <img className={styles.locationicon} src="./locationarrow.png"/>
          <div className={styles.location}>
            {data.name}
          </div>
        </div>

          <div className={styles.temp}>
              {temp} °C
          </div>

          <div className={styles.feel}>
              Feels like {feel} °C
          </div>

          <div className={styles.datacont}>
            {
              weather && weather.map((w,index)=> {
                return(
                  <div className={styles.indexcont}>
                    <div className={styles.index} key={index}>
                    
                      <div className={styles.description}>
                        {w.description.toUpperCase()}
                      </div>
                      <div className={styles.place}>
                        {w.main.toUpperCase()}
                      </div>
                    </div>
                  </div>
                )
              })
            }

            <div className={styles.highlowtemp}>
                <div className={styles.lowtemp}>
                  <div className={styles.lowtext}>Lowest: </div>
                  {lowtemp}  °C</div>
                <div classname={styles.hightemp}>
                <div className={styles.hightext}>Highest: </div>
                {hightemp} °C</div>
            </div>   

            <div className={styles.wind}>
                <div className={styles.windtext}>Wind</div>
                <div classname={styles.winddata}>{wind}m/s</div>
            </div>   
          </div>

            {/* <div>
              {year}{month}{dat}
            </div>

            <div>  
              {localtime}
            </div>   */}

        </> : null
      }

    <div className={styles.footer}>
      by Kaley Tsang  ©  2023
    </div>

      </main>
    </>
  )
}
