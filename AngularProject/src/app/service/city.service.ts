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

  getCordianate(nameCity: string): string {
    let cordinate: string = "";
    switch (nameCity) {
      case "TP. Hồ Chí Minh":
        cordinate = "10.823512334224576,106.61446278562542";
        break;
      case "Nam Định":
        cordinate = "20.43834787202179,106.16174700901708";
        break;
      case "Sóc Trăng":
        cordinate = "9.603951563293295,105.97352026584757";
        break;
      case "Quảng Trị":
        cordinate = "16.740318537597823,107.18725145529353";
        break;
      case "Bắc Giang":
        cordinate = "21.281438448611333,106.19871816830488";
        break;
      case "Bắc Ninh":
        cordinate = "21.177219407714173,106.06355976798004";
        break;
      case "Hải Dương":
        cordinate = "20.938266957772193,106.3168752998917";
        break;
      case "Hà Nội":
        cordinate = "21.028187499645618,105.83713536136611";
        break;
      case "Đà Nẵng":
        cordinate = "16.055087272295676,108.19915294989171";
        break;
      case "Bà Rịa – Vũng Tàu":
        cordinate = "10.43118714317501,107.18587531544753";
        break;
      case "Bình Dương":
        cordinate = "11.129636724208261,106.61665872678057";
        break;
      case "Vĩnh Long":
        cordinate = "21.307506785915034,105.6166806160755";
        break;
      case "Lạng Sơn":
        cordinate = "21.85592254308607,106.7754793111749";
        break;
      case "Hà Tĩnh":
        cordinate = "18.35619948187832,105.89050064983759";
        break;
      case "Quảng Ninh":
        cordinate = "20.97238341588559,107.03433634532294";
        break;
      case "Tây Ninh":
        cordinate = "11.332875346182131,106.11214414065809";
        break;
      case "Hưng Yên":
        cordinate = "20.634725712230154,106.04347826849967";
        break;
      case "Kiên Giang":
        cordinate = "10.027000728010018,105.10575286351363";
        break;
      case "Thái Bình":
        cordinate = "20.457123076745482,106.34224894087464";
        break;
      case "Điện Biên":
        cordinate = "21.48515555103137,103.0803376711742";
        break;
      case "Hà Nam":
        cordinate = "20.532513505051835,105.91645434459818";
        break;
      case "Bạc Liêu":
        cordinate = "9.295488749047397,105.75210003180341";
        break;
      case "Ninh Bình":
        cordinate = "20.251561567365325,105.97287662938912";
        break;
      case "Hòa Bình":
        cordinate = "20.83749894607004,105.34636450000002";
        break;
      case "Nghệ An":
        cordinate = "18.76536363944038,105.80177870014425";
        break;
      case "Cần Thơ":
        cordinate = "10.055518877113279,105.73904991333711";
        break;
      case "Đồng Tháp":
        cordinate = "10.753241387475523,105.6759921207901";
        break;
      case "Thanh Hóa":
        cordinate = "19.82352442367533,105.79908546554098";
        break;
      case "An Giang":
        cordinate = "10.681333815618007,105.26730930444718";
        break;
      case "Vĩnh Long":
        cordinate = "10.237362030807514,105.95557289114532";
        break;
      case "Hải Phòng":
        cordinate = "20.847276831222473,106.68843933535854";
        break;
      case "Trà Vinh":
        cordinate = "9.95561953332926,106.3351833919193";
        break;
      case "Thái Nguyên":
        cordinate = "21.56466960182076,105.82871867050936";
        break;
      case "Cà Mau":
        cordinate = "9.152316568378048,105.19918794562679";
        break;
      case "Phú Thọ":
        cordinate = "21.421389018668293,105.23563230917952";
        break;
      case "Quảng Ngãi":
        cordinate = "15.122790636526764,108.79820973566663";
        break;
      case "Phú Thọ":
        cordinate = "16.516338819291615,107.80715310745907";
        break;
      case "Yên Bái":
        cordinate = "21.702102769257216,104.92738116149555";
        break;
      case "Lào Cai":
        cordinate = "22.479372725790707,103.98497966371512";
        break;
      case "Hà Giang":
        cordinate = "22.80502343453076,104.98874196803415";
        break;
      case "Tuyên Quang":
        cordinate = "21.776394577354854,105.23110616814246";
        break;
      case "Lai Châu":
        cordinate = "22.386619554991572,103.47674855507701";
        break;
      case "Sơn La":
        cordinate = "21.349216274556,103.97263737494829";
        break;
      case "52":
        cordinate = "13.917241925729401,109.31384955656371";
        break;
      case "Lâm Đồng":
        cordinate = "12.005064314910857,108.29698845501021";
        break;
      case "Hậu Giang":
        cordinate = "9.766620985953438,105.63148906904115";
        break;
      case "Quảng Bình":
        cordinate = "17.551167261502368,106.67393903070499";
        break;
      case "Đắk Nông":
        cordinate = "12.042599393281298,107.7153032915683";
        break;
      case "Bến Tre":
        cordinate = "10.285065007016481,106.37529807627469";
        break;
      case "Kon Tum":
        cordinate = "14.37346664669782,108.02302829622232";
        break;
      case "Cao Bằng":
        cordinate = "22.660486876365653,106.26306140464389";
        break;
      case "Tiền Giang":
        cordinate = "10.46280810355318,106.24797178621658";
        break;
      case "Long An":
        cordinate = "10.761251370707084,106.10652056149092";
        break;
      case "Phú Yên":
        cordinate = "13.113000977466402,109.11459037343597";
        break;
      case "Gia Lai":
        cordinate = "14.040579924935585,108.14669708120257";
        break;
      case "Đắk Lắk":
        cordinate = "12.757380741065708,108.08923812264851";
        break;
      case "Ninh Thuận":
        cordinate = "11.75957427136036,108.85915746770932";
        break;
      case "Khánh Hòa":
        cordinate = "12.337497738852939,108.95383006198269";
        break;
      case "vn-307":
        cordinate = "11.08431940859576,108.10006693941291";
        break;
      case "truongsa":
        cordinate = "10.725305757600497,115.82595051590171";
        break;
      case "Hoàng Sa":
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

  getShipCost(nameCity: string): number {  
    if (nameCity == "TP. Hồ Chí Minh") return 0
    return Math.round(this.splitCor(this.getCordianate(nameCity))) * 0.05;
  }
  getTime(nameCity: string): string {
    if (nameCity == "TP. Hồ Chí Minh") return "Từ 2 đến 3 tiếng"
    else if (this.splitCor(this.getCordianate(nameCity)) > 1000) return "Trong 4 đến 5 ngày"
    else if (this.splitCor(this.getCordianate(nameCity)) > 500) return "Trong 3 đến 4 ngày"
    else if (this.splitCor(this.getCordianate(nameCity)) > 100) return "Trong 1 đến 2 ngày"
    else return "Trong vòng 1 ngày"
  }
}
