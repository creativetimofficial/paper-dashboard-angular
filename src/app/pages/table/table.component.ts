import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "app/app.reducers";
import { AuthUser } from "app/interface/AuthResponse";
import { UserService } from "app/services/user.service";
import { map } from "rxjs/operators";

@Component({
  selector: "table-cmp",
  moduleId: module.id,
  templateUrl: "table.component.html",
})
export class TableComponent implements OnInit {
  users: AuthUser[];
  totalPages: number[];

  constructor(
    private userService: UserService,
    private store: Store<AppState>
  ) {
    this.userService.loadUsers();
  }

  ngOnInit() {
    this.store
      .select("user")
      .pipe(
        map(({ dataPages }) => {
          if (dataPages) {
            return {
              users: dataPages.results,
              total: dataPages.totalPages,
            };
          }
        })
      )
      .subscribe((users) => {
        if (users) {
          this.users = users.users;
          this.totalPages = Array(users.total).fill(users.total);
        }
      });
  }
}
