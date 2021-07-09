import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
      case 24:
        cordinate = "21.302067651284702, 106.17949140796979";
        break;
      case 79:
        cordinate = "10.826760025273845,106.6823606966149";
        break;
      case 36:
        cordinate = "20.43448380422534, 106.08793192698147";
        break;
      case 89:
        cordinate = "10.674590124286668, 105.01607942299779";
        break;
      case 94:
        cordinate = "9.626460029135632, 105.94159052267136";
        break;
      case 86:
        cordinate = "10.271819699230967, 105.90716365847219";
        break;
      case 45:
        cordinate = "16.725182613065336, 107.09077493453262";
        break;
      case 31:
        cordinate = "20.85395218342969, 106.69393949260603";
        break;
      case 84:
        cordinate = "9.97173222073517, 106.34073321362116";
        break;
      case 19:
        cordinate = "21.585663568200832, 105.7900973667736";
        break;
      case 96:
        cordinate = "9.200776642645451, 105.1682859785899";
        break;
      case 25:
        cordinate = "21.45126547048769, 105.24112478720403";
        break;
      case 51:
        cordinate = "15.168344519876664, 108.81796793149348";
        break;
      case 46:
        cordinate = "16.41211210909523, 107.35117449778903";
        break;
      case 15:
        cordinate = "16.070370406916023, 108.2213519715551";
        break;
      case 10:
        cordinate = "22.465081276319474, 103.98806683937451";
        break;
      case 2:
        cordinate = "22.79424724564605, 104.98187279046168";
        break;
      case 8:
        cordinate = "21.82260168132014, 105.16175223082817";
        break;
      case 12:
        cordinate = "22.399630554854806, 103.43726575924691";
        break;
      case 14:
        cordinate = "21.367293656643824, 103.88760460682506";
        break;
      case 52:
        cordinate = "14.392838068725473, 108.61966876769002";
        break;
      case 68:
        cordinate = "11.59527958613712, 107.52522870768796";
        break;
      case 70:
        cordinate = "11.973622020945202, 106.56716684448499";
        break;
      case 93:
        cordinate = "10.808445894915405, 106.66219567492925";
        break;
      case 44:
        cordinate = "17.78181165280456, 105.75557662343996";
        break;
      case 67:
        cordinate = "12.456596934192778, 107.4985013731356";
        break;
      case 62:
        cordinate = "14.378777528603374, 107.89771263125483";
        break;

      case 4:
        cordinate = "22.667769729877488, 106.2383414869104";
        break;

      case 83:
        cordinate = "10.252595778308848, 106.35889952074201";
        break;

      case 82:
        cordinate = "10.370522332165955, 106.27205399909455";
        break;

      case 80:
        cordinate = "10.814107455203564, 105.91096580739524";
        break;

      case 54:
        cordinate = "13.275510070710544, 108.95509773456196";
        break;

      case 64:
        cordinate = "13.980260321688636, 108.12070947081207";
        break;

      case 66:
        cordinate = "12.99082837036432, 108.31651306922694";
        break;

      case 58:
        cordinate = "11.815899678695951, 108.80829863886574";
        break;

      case 56:
        cordinate = "12.41740870150259, 109.25576237008224";
        break;

      case 60:
        cordinate = "10.886979038058973, 107.63844834617815";
        break;



      default:
        break;
    }
    return cordinate;
  }
  calDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
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
  splitCor(cordinate: string): number {
    let lat1: number = 10.826812714562069;
    let lon1: number = 106.68232851010757;
    let lat2: number = parseFloat(cordinate.split(",")[0]);
    let lon2: number = parseFloat(cordinate.split(",")[1]);
    return this.calDistance(lat1, lon1, lat2, lon2);
  }
  getShipCost(hckey: number): number {
    if (hckey == 79) return 0
    return Math.round(this.splitCor(this.getCoordinate(hckey))) * 3000;
  }
  getTime(hckey: number): string {
    if (hckey == 79) return "Trong vòng 2 đến 3 ngày"
    if (this.splitCor(this.getCoordinate(hckey)) > 100) return "Trong 1 đến 2 ngày"
    else if (this.splitCor(this.getCoordinate(hckey)) > 500) return "Trong 3 đến 4 ngày"
    else if (this.splitCor(this.getCoordinate(hckey))) return "Trong 4 đến 5 ngày"
    else return "Trong vòng 1 ngày"
  }
}
