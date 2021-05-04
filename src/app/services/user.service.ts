import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "app/app.reducers";
import { UserPages } from "app/interface/UserResponse";
import { LoadUserAction } from "app/reducer/user/user.actions";
import { environment } from "environments/environment.prod";

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
}
