import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "app/app.reducers";
import { User } from "app/interface/User";
import { UserPages } from "app/interface/UserResponse";
import { LoadUserAction } from "app/reducer/user/user.actions";
import { environment } from "environments/environment.prod";

import { FinishLoadingAction } from "app/reducer/ui/ui.actions";

@Injectable({
  providedIn: "root",
})
export class UserService {
  endpoint: String = environment.URL_BACKEND;

  constructor(private store: Store<AppState>, private httpClient: HttpClient) {}

  loadUsers() {
    const token = localStorage.getItem("x-token");
    const headers = new HttpHeaders().append(
      "Authorization",
      "Bearer " + token
    );
    this.httpClient
      .get(this.endpoint + "/users", {
        headers,
      })
      .subscribe((res: UserPages) => {
        this.store.dispatch(new LoadUserAction(res));
      }, console.error);
  }

  createUsers(user: User) {
    const token = localStorage.getItem("x-token");
    const headers = new HttpHeaders().append(
      "Authorization",
      "Bearer " + token
    );
    this.httpClient
      .post(this.endpoint + "/users", user, {
        headers,
      })
      .subscribe(console.log, console.error);
    this.store.dispatch(new FinishLoadingAction());
  }
}
