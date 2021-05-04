import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "app/app.reducers";
import { User } from "app/interface/User";
import { AuthService } from "app/services/auth.service";
import {
  FinishLoadingAction,
  StartLoadingAction,
} from "../../reducer/ui/ui.actions";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: [],
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  showEmailError: boolean = false;
  loading: boolean = false;

  createFormRegister(): FormGroup {
    return new FormGroup({
      name: new FormControl("Alexander", [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl("alex@ufps.edu.co", [
        Validators.required,
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
      password: new FormControl("Realmadrid94", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/\d/),
        Validators.pattern(/[a-zA-Z]/),
      ]),
    });
  }

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.formRegister = this.createFormRegister();
  }

  ngOnInit(): void {
    this.store
      .select("ui")
      .subscribe(({ loading }) => (this.loading = loading));
  }

  onSubmit() {
    this.store.dispatch(new StartLoadingAction());
    this.showEmailError = false;
    const value = this.formRegister.get("email").value.split("@");
    if (!this.formRegister.invalid && value[1] === "ufps.edu.co") {
      const user: User = this.formRegister.value;
      this.authService.registerUser(user);
    } else {
      this.showEmailError = true;
    }
    this.store.dispatch(new FinishLoadingAction());
  }

  get name() {
    return this.formRegister.get("name");
  }

  get email() {
    return this.formRegister.get("email");
  }

  get password() {
    return this.formRegister.get("password");
  }
}
