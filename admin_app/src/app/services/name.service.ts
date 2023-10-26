import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NameService {
  private name: string = '';

  setName(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }
}
