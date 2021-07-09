import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  covidLink: string = "https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST?fbclid=IwAR2Mc_Nl7FMrvJ57kW_d92VtlEpuvIvBXpbZXF-APdiqcIcjEDjuNOqzuvo/"
  hecKeyLink: string = "https://api.apify.com/v2/key-value-stores/p3nS2Q9TUn6kUOriJ/records/LATEST?fbclid=IwAR0BhnrHNWbhHR7vqKs04AmaUAI1Dmi9gsGBbkCZJ2kiKLmFXn_dEnH7XYE"
  constructor(private httpClient: HttpClient) { }
  getCovidLink() {
    return this.httpClient.get(this.covidLink);
  }
  getHeckeyLink() {
    return this.httpClient.get(this.hecKeyLink);
  }
  getDataCovid(): any {
    this.httpClient.get(this.covidLink).subscribe(data => {
      this.httpClient.get(this.hecKeyLink).subscribe(data1 => {
        let x1: any = Object.values(data)[9];
        let cityArr: City[] = [];
        let x2: any = (Object.values(data1)[5])
        console.log(x2)
        console.log(x1)
        for (let index = 0; index < x1.length; index++) {
          for (let index1 = 0; index1 < x2.length; index1++) {
            let name: string = x2[index1]['name'];
            let value: number = x1[index]['value'];
            let hckey: number = x1[index]['hc-key'];
            let heckey: number = x2[index1]['hec-key'];
            if (hckey == heckey) {
              cityArr.push(new City(name, value, hckey, this.getCoordinate(hckey)))
            }
          }
        }
        console.log(cityArr)
      })
    });
  }
  getCoordinate(hcKey: number): string {
    let cordinate: string = "";
    switch (hcKey) {
      case 79:
        cordinate = "10.826760025273845,106.6823606966149";
        break;
      case 79:
        cordinate = "";
        break;
      case 79:
        cordinate = "";
        break;
      case 79:
        cordinate = "";
        break;

      default:
        break;
    }
    return cordinate;
  }
  calDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
<<<<<<< HEAD
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2 - lon1);
    let a =
=======
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
>>>>>>> 001a8efd422252cbf55d088dfe7ae64e6579e1ec
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  }
  deg2rad(value: number) {
    return value * Math.PI / 180;
  }
<<<<<<< HEAD
  splitCor(cordinate: string) : number{
=======

  splitCor(cordinate: string): number {
>>>>>>> 001a8efd422252cbf55d088dfe7ae64e6579e1ec
    let lat1: number = 10.826812714562069;
    let lon1: number = 106.68232851010757;
    let lat2: number = parseFloat(cordinate.split(",")[0]);
    let lon2: number = parseFloat(cordinate.split(",")[1]);
    return this.calDistance(lat1, lon1, lat2, lon2);
  }
  getShipCost(hckey: number): number {
    if (hckey == 79) return 0
    return Math.round(this.splitCor(this.getCordianate(hckey))) * 3000
  }
  getTime(hckey: number): string {
    if (hckey == 79) return "Trong vòng 2 đến 3 ngày"
    if (this.splitCor(this.getCordianate(hckey)) > 100) return "Trong 1 đến 2 ngày"
    else if (this.splitCor(this.getCordianate(hckey)) > 500) return "Trong 3 đến 4 ngày"
    else if (this.splitCor(this.getCordianate(hckey))) return "Trong 4 đến 5 ngày"
    else return "Trong vòng 1 ngày"
  }
}
