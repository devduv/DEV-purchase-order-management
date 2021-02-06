import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Person } from '../model/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

  public savePersonalInformation(person: Person) {
    localStorage.setItem('personal-information', JSON.stringify(person));
  }

  public getPersonalInformation(): Person {
      return JSON.parse(localStorage.getItem('personal-information'));
  }
}
