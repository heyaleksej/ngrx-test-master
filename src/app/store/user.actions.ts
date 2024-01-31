import { createAction, props } from "@ngrx/store";
import { IUser } from "../common.model";

export enum EUserActions {
    LoadUsers = '[Users] Load users from service',
    GetUsers = '[Users] Get all users',
    AddUser = '[Users] Add user',
    DeleteUser = '[Users] Delete user',
    DeleteUsers = '[Users] Delete users',
    EditUser = '[Users] Edit user',
}

const LoadUsers = createAction(
    EUserActions.LoadUsers,
    props<{users: IUser[]}>()
);

const GetUsers = createAction(
    EUserActions.GetUsers,
    props<{users: IUser[]}>()
);

const AddUser = createAction(
    EUserActions.AddUser,
    props<{user: IUser}>()
);

const DeleteUser = createAction(
    EUserActions.DeleteUser,
    props<{user: IUser}>()
);

const DeleteUsers = createAction(
    EUserActions.DeleteUsers,
    props<{users: IUser[]}>()
);

const EditUser = createAction(
    EUserActions.EditUser,
    props<{user: IUser}>()
);


export const UserActions = {
    LoadUsers,
    GetUsers,
    AddUser,
    DeleteUser,
    DeleteUsers,
    EditUser,
};


