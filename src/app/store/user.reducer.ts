import { UserActions } from './user.actions';
import { createReducer, on } from "@ngrx/store";
import { IUser } from "../common.model";

export const usersReducer = createReducer<IUser[]>(
    [],
    on(UserActions.LoadUsers, (state, { users }) => users),
    on(UserActions.AddUser, (state, { user }) => [...state, { ...user, id: (state.length + 1).toString() }]),
    on(UserActions.DeleteUser, (state, { user }) => state.filter(u => u.id !== user.id)),
    on(UserActions.DeleteUsers, (state, { users }) => state.filter(u => !users.some((delUser: IUser) => delUser.id === u.id))),
    on(UserActions.EditUser, (state, { user }) => state.map(u => (u.id === user.id ? user : u)))
);
