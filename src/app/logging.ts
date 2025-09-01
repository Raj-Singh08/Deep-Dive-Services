import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Logging {
  log(message:string){
    const timeSamp=new Date().toLocaleDateString();
    console.log( `[${timeSamp}]:${message}`);
  }
}
