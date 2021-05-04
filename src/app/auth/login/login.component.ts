import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "app/app.reducers";
import { User } from "app/interface/User";
import { StartLoadingAction } from "app/reducer/ui/ui.actions";
import { AuthService } from "app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  loading: boolean = false;

  createFormRegister(): FormGroup {
    return new FormGroup({
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
    this.formLogin = this.createFormRegister();
  }

  ngOnInit(): void {
    this.store
      .select("ui")
      .subscribe(({ loading }) => (this.loading = loading));
  }

  onSubmit() {
    this.store.dispatch(new StartLoadingAction());
    if (!this.formLogin.invalid) {
      const user: User = this.formLogin.value;
      this.authService.loginUser(user);
    }
  }

  get email() {
    return this.formLogin.get("email");
  }

  get password() {
    return this.formLogin.get("password");
  }
}
