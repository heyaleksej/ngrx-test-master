import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { IFilter, IUser, IUserState } from "../common.model";
import { SetFilter } from "./filter.actions";
import { UserActions } from "./user.actions";

@Injectable({
  providedIn: "root",
})
export class AppFacade {
  public initial_users: IUser[] = [
    {
      id: '1',
      create: '29.01.2024',
      fio: 'Алексей Рогожников',
      position: "Developer",
      email: 'test@mail.ru',
      password: '123',
      phone: '+79221111113'
    },
    {
      id: '2',
      create: '29.01.2024',
      fio: 'Павел Юртаев',
      position: "Lead",
      email: 'tellsy@mail.ru',
      password: '123',
      phone: '+79241111111'
    },
  ];
  constructor(
    protected store: Store<IUserState>,
  ) {
  }

  setFilter(filter: IFilter | null): void {
    this.store.dispatch(SetFilter({filter}));
  }

  getFilterObservables(): Observable<IFilter | null> {
    return this.store?.select('filter') ?? of([]);
  }

  loadUsers(): void {
   this.store.dispatch(UserActions.LoadUsers({users: this.initial_users}));
  }

  addUser(newUser: IUser): void {
    this.store.dispatch(UserActions.AddUser({user: newUser}));
  }

  deleteUsers(delUsers: IUser[]): void {
    this.store.dispatch(UserActions.DeleteUsers({users: delUsers}))
  }

  editUser(eUser: IUser): void {
    this.store.dispatch(UserActions.EditUser({user: eUser}));
  }

  getUsersObservables(): Observable<IUser[]> {
    return this.store?.select('users') ?? of([]);
  }
}
