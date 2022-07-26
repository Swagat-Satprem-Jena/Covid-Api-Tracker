import React, { useState } from "react";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [cname, updCname] = useState('');
  const [dispObj, updDispObj] = useState({ name: 'N / A', time: 'N / A', nc: 0, rec: 0, death: 0 });

  const countryNameChng = (event) => {
    updCname(event.target.value);
  }

  const go = () => {
    try {
      async function getCovidData() {
        const covidDataJSON = await fetch('https://api.covid19api.com/summary');
        const covidDataJSObj = await covidDataJSON.json();
        console.log(covidDataJSObj);
        // updDispObj({name : cname, time : covidDataJSObj})
        console.log(covidDataJSObj.Date);
        const countryArr = covidDataJSObj.Countries;
        for (let i = 0; i < countryArr.length; i++) {
          let a = countryArr[i].Country.toLowerCase();
          let b = cname.toLowerCase();
          if (a === b || a.includes(b)) {
            const x = countryArr[i];
            updDispObj({ name: x.Country, time: covidDataJSObj.Date.slice(0, 10), nc: x.NewConfirmed, rec: x.TotalRecovered, death: x.TotalDeaths });
            break;
          }
        }
        const searchDivEl = document.querySelector('.search-div');
        const dataDivEl = document.querySelector('.data-div');
        searchDivEl.style.display = 'none';
        dataDivEl.style.display = 'flex';
      }
      getCovidData();
    }
    catch (error) {
      console.log(error);
    }
  }



  return (
    <>
      <div className="heading-div">
        <h2 className="heading-text"> COVID - 19 TRACKER</h2>
      </div>

      <div className="search-div">
        <div className="search-fit">
          <h3 className="search-text"> ENTER THE NAME OF THE COUNTRY :-</h3>
          <div className="inp-btn">
            <input type="text" className="form-control" id="exampleInputCountry1" aria-describedby="countryHelp" onChange={countryNameChng} value={cname}></input>
            <button className="btn btn-danger go-btn" onClick={go}><i className="fa-solid fa-paper-plane go-icon"></i></button>
          </div>
        </div>
      </div>

      <div className="data-div">
        <div className="country-details">
          <h2 className="country-name">{dispObj.name}</h2>
          <h4 className="last-upd">LAST UPDATED : - {dispObj.time}</h4>
        </div>
        <div className="row">
          <div className="col-lg-4 each-col">
            <div className="card">
              <div className="card-top">
                <h4>NEW CASES : </h4>
              </div>
              <div className="card-btm">
                <p>{dispObj.nc}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 each-col">
            <div className="card">
              <div className="card-top">
                <h4>TOTAL DEATH : </h4>
              </div>
              <div className="card-btm">
                <p>{dispObj.death}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 each-col">
            <div className="card">
              <div className="card-top">
                <h4>TOTAL RECOVERED : </h4>
              </div>
              <div className="card-btm">
                <p>{dispObj.rec}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
