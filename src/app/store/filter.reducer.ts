import { createReducer, on } from "@ngrx/store";
import { SetFilter } from "./filter.actions";
import { IFilter } from "../common.model";

const filterInitState: IFilter | null = null;

export const filterReducer = createReducer<IFilter | null>(
  filterInitState,
  on(SetFilter, (state, action) => action.filter)
);
