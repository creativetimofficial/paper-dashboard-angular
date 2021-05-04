import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Auth, AuthUser } from "app/interface/AuthResponse";
import { User } from "app/interface/User";
import { SetUserAction } from "app/reducer/auth/auth.actions";
import { FinishLoadingAction } from "app/reducer/ui/ui.actions";
import { environment } from "environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  endpoint: String = environment.URL_BACKEND;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  registerUser(user: User) {
    return this.httpClient
      .post<Auth>(this.endpoint + "/auth/register", user)
      .subscribe((res) => {
        localStorage.setItem("id", res.user.id);
        localStorage.setItem("x-token", res.tokens.access.token);
        this.store.dispatch(new SetUserAction(res.user));
        this.router.navigate(["/dashboard"]);
      }, console.error);
  }

  loginUser(user: User) {
    return this.httpClient
      .post<Auth>(this.endpoint + "/auth/login", user)
      .subscribe((res) => {
        localStorage.setItem("id", res.user.id);
        localStorage.setItem("x-token", res.tokens.access.token);
        this.store.dispatch(new SetUserAction(res.user));
        this.store.dispatch(new FinishLoadingAction());
        this.router.navigate(["/dashboard"]);
      }, console.error);
  }

  refreshAuth() {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("x-token");
    const headers = new HttpHeaders().append(
      "Authorization",
      "Bearer " + token
    );
    return this.httpClient
      .get(this.endpoint + "/users/" + id, {
        headers,
      })
      .subscribe((res: AuthUser) => {
        this.store.dispatch(new SetUserAction(res));
      });
  }
}
