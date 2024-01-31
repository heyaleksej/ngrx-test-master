import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { IFilter, IUser, IUserState } from "../../common.model";
import { Store } from "@ngrx/store";
import { AppFacade } from "../../store/app.facades";

@Component({
  selector: 'app-filters-wrapper',
  templateUrl: './filters-wrapper.component.html',
  styleUrls: ['./filters-wrapper.component.css']
})
export class FiltersWrapperComponent implements OnInit {

  filterForm: FormGroup = {} as FormGroup;

  users$: Observable<IUser[]>;
  ids$: Observable<string[]>;
  fullNames$: Observable<string[]>;
  positions$: Observable<string[]>;
  emails$: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    protected store: Store<IUserState>,
    public app: AppFacade
  ) {
    this.users$ = this.store?.select('users') ?? of([]);
    this.ids$ = this.users$.pipe(
      map((res: IUser[]) => {
        const ids: (string | undefined)[] = res.map(elem => elem.id).filter((value, index, self) => self.indexOf(value)===index);
        const filteredIds: string[] = [];
        for(let id of ids) {
          if (id) {
            filteredIds.push(id);
          }
        }
        return filteredIds;
      })
    );

    this.fullNames$ = this.users$.pipe(
      map((res: IUser[]) =>
        res.map(elem => elem.fio).filter((value, index, self) => self.indexOf(value) ===index)
      )
    );
    this.positions$ = this.users$.pipe(
      map((res: IUser[]) =>
        res.map(elem => elem.position).filter((value, index, self) => self.indexOf(value)===index)
      )
    );
    this.emails$ = this.users$.pipe(
      map((res: IUser[]) =>
        res.map(elem => elem.email).filter((value, index, self) => self.indexOf(value)===index)
      )
    );
  }

  ngOnInit(): void {
   this.initForm()
  }

  initForm() {
    this.filterForm = this.fb.group({
      id: [''],
      fio: [''],
      position: [''],
      email: ['']
    })
  }

  onSubmit(): void {
    const newFilter = this.filterForm.value as IFilter;

    const validFilter: IFilter = Object.fromEntries(
      Object.entries(newFilter).filter(([_, value]) => value !== null && value !== undefined && value !== '')
    );

    this.app.setFilter(Object.keys(validFilter).length > 0 ? validFilter : null);
  }
}
