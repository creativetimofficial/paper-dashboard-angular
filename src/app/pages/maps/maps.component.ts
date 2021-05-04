import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: "maps-cmp",
  templateUrl: "maps.component.html",
})
export class MapsComponent implements OnInit {
  formCreate: FormGroup;

  createFormCreate(): FormGroup {
    return new FormGroup({
      name: new FormControl(""),
      email: new FormControl(""),
      password: new FormControl(""),
      role: new FormControl(""),
    });
  }

  constructor() {
    this.formCreate = this.createFormCreate();
  }

  ngOnInit() {}

  onSubmit() {
    console.log(this.formCreate.value);
  }
}
