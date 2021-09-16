import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  covidLink: string = "https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST?fbclid=IwAR2Mc_Nl7FMrvJ57kW_d92VtlEpuvIvBXpbZXF-APdiqcIcjEDjuNOqzuvo/"
//  hecKeyLink: string = "https://api.apify.com/v2/key-value-stores/p3nS2Q9TUn6kUOriJ/records/LATEST?fbclid=IwAR0BhnrHNWbhHR7vqKs04AmaUAI1Dmi9gsGBbkCZJ2kiKLmFXn_dEnH7XYE"
  constructor(private httpClient: HttpClient) { }
  getCovidLink() {
    return this.httpClient.get(this.covidLink);
  }
  // getHeckeyLink() {
  //   return this.httpClient.get(this.hecKeyLink);
  // }

  // getDataCovid(): any {
  //   this.httpClient.get(this.covidLink).subscribe(data => {
  //     this.httpClient.get(this.hecKeyLink).subscribe(data1 => {
  //       let x1: any = Object.values(data)[9];
  //       let cityArr: City[] = [];
  //       let x2: any = (Object.values(data1)[5])
  //       for (let index = 0; index < x1.length; index++) {
  //         for (let index1 = 0; index1 < x2.length; index1++) {
  //           let name: string = x2[index1]['name'];
  //           let value: number = x1[index]['value'];
  //           let hckey: string = x1[index]['hc-key'];
  //           let heckey: string = x2[index1]['hec-key'];
  //           if (hckey == heckey) {
  //             cityArr.push(new City(name, value, hckey, this.getCordianate(hckey)))
  //           }
  //         }
  //       }
  //       console.log(cityArr)
  //     })
  //   });
  // }

  getCordianate(hcKey: string): string {
    let cordinate: string = "";
    switch (hcKey) {
      case "79":
        cordinate = "10.823512334224576,106.61446278562542";
        break;
      case "36":
        cordinate = "20.43834787202179,106.16174700901708";
        break;
      case "94":
        cordinate = "9.603951563293295,105.97352026584757";
        break;
      case "45":
        cordinate = "16.740318537597823,107.18725145529353";
        break;
      case "24":
        cordinate = "21.281438448611333,106.19871816830488";
        break;
      case "27":
        cordinate = "21.177219407714173,106.06355976798004";
        break;
      case "30":
        cordinate = "20.938266957772193,106.3168752998917";
        break;
      case "01":
        cordinate = "21.028187499645618,105.83713536136611";
        break;
      case "48":
        cordinate = "16.055087272295676,108.19915294989171";
        break;
      case "77":
        cordinate = "10.43118714317501,107.18587531544753";
        break;
      case "74":
        cordinate = "11.129636724208261,106.61665872678057";
        break;
      case "26":
        cordinate = "21.307506785915034,105.6166806160755";
        break;
      case "20":
        cordinate = "21.85592254308607,106.7754793111749";
        break;
      case "42":
        cordinate = "18.35619948187832,105.89050064983759";
        break;
      case "22":
        cordinate = "20.97238341588559,107.03433634532294";
        break;
      case "72":
        cordinate = "11.332875346182131,106.11214414065809";
        break;
      case "33":
        cordinate = "20.634725712230154,106.04347826849967";
        break;
      case "91":
        cordinate = "10.027000728010018,105.10575286351363";
        break;
      case "34":
        cordinate = "20.457123076745482,106.34224894087464";
        break;
      case "11":
        cordinate = "21.48515555103137,103.0803376711742";
        break;
      case "35":
        cordinate = "20.532513505051835,105.91645434459818";
        break;
      case "95":
        cordinate = "9.295488749047397,105.75210003180341";
        break;
      case "37":
        cordinate = "20.251561567365325,105.97287662938912";
        break;
      case "17":
        cordinate = "20.83749894607004,105.34636450000002";
        break;
      case "40":
        cordinate = "18.76536363944038,105.80177870014425";
        break;
      case "92":
        cordinate = "10.055518877113279,105.73904991333711";
        break;
      case "87":
        cordinate = "10.753241387475523,105.6759921207901";
        break;
      case "38":
        cordinate = "19.82352442367533,105.79908546554098";
        break;
      case "89":
        cordinate = "10.681333815618007,105.26730930444718";
        break;
      case "86":
        cordinate = "10.237362030807514,105.95557289114532";
        break;
      case "31":
        cordinate = "20.847276831222473,106.68843933535854";
        break;
      case "84":
        cordinate = "9.95561953332926,106.3351833919193";
        break;
      case "19":
        cordinate = "21.56466960182076,105.82871867050936";
        break;
      case "96":
        cordinate = "9.152316568378048,105.19918794562679";
        break;
      case "25":
        cordinate = "21.421389018668293,105.23563230917952";
        break;
      case "51":
        cordinate = "15.122790636526764,108.79820973566663";
        break;
      case "46":
        cordinate = "16.516338819291615,107.80715310745907";
        break;
      case "15":
        cordinate = "21.702102769257216,104.92738116149555";
        break;
      case "10":
        cordinate = "22.479372725790707,103.98497966371512";
        break;
      case "02":
        cordinate = "22.80502343453076,104.98874196803415";
        break;
      case "08":
        cordinate = "21.776394577354854,105.23110616814246";
        break;
      case "12":
        cordinate = "22.386619554991572,103.47674855507701";
        break;
      case "14":
        cordinate = "21.349216274556,103.97263737494829";
        break;
      case "52":
        cordinate = "13.917241925729401,109.31384955656371";
        break;
      case "68":
        cordinate = "12.005064314910857,108.29698845501021";
        break;
      case "93":
        cordinate = "9.766620985953438,105.63148906904115";
        break;
      case "44":
        cordinate = "17.551167261502368,106.67393903070499";
        break;
      case "67":
        cordinate = "12.042599393281298,107.7153032915683";
        break;
      case "83":
        cordinate = "10.285065007016481,106.37529807627469";
        break;
      case "62":
        cordinate = "14.37346664669782,108.02302829622232";
        break;
      case "04":
        cordinate = "22.660486876365653,106.26306140464389";
        break;
      case "82":
        cordinate = "10.46280810355318,106.24797178621658";
        break;
      case "80":
        cordinate = "10.761251370707084,106.10652056149092";
        break;
      case "54":
        cordinate = "13.113000977466402,109.11459037343597";
        break;
      case "64":
        cordinate = "14.040579924935585,108.14669708120257";
        break;
      case "66":
        cordinate = "12.757380741065708,108.08923812264851";
        break;
      case "58":
        cordinate = "11.75957427136036,108.85915746770932";
        break;
      case "56":
        cordinate = "12.337497738852939,108.95383006198269";
        break;
      case "56":
        cordinate = "12.337497738852939,108.95383006198269";
        break;
      case "vn-307":
        cordinate = "11.08431940859576,108.10006693941291";
        break;
      case "truongsa":
        cordinate = "10.725305757600497,115.82595051590171";
        break;
      case "hs01":
        cordinate = "10.725474420122634,115.82663716136612";
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

  getShipCost(hckey: string): number {  
    if (hckey == "79") return 0
    return Math.round(this.splitCor(this.getCordianate(hckey))) * 3000
  }
  getTime(hckey: string): string {
    if (hckey == "79") return "Từ 2 đến 3 tiếng"
    else if (this.splitCor(this.getCordianate(hckey)) > 1000) return "Trong 4 đến 5 ngày"
    else if (this.splitCor(this.getCordianate(hckey)) > 500) return "Trong 3 đến 4 ngày"
    else if (this.splitCor(this.getCordianate(hckey)) > 100) return "Trong 1 đến 2 ngày"
    else return "Trong vòng 1 ngày"
  }
}
