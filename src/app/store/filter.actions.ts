import { createAction, props } from "@ngrx/store";
import { IFilter } from "../common.model";

export enum EFilterActions {
    SetFilter = '[Filter] Set filter'
}

export const SetFilter = createAction(
    EFilterActions.SetFilter,
    props<{filter: IFilter | null}>()
)
