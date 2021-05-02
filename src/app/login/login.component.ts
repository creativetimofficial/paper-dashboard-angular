import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'login-cmp',
  moduleId: module.id,
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{

  public saludo: string;

  ngOnInit(): void {
    this.saludo = 'Hola Manuel';
  }

}