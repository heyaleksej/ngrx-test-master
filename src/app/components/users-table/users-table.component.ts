import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { combineLatest, map, Observable, Subject, takeUntil } from "rxjs";
import { AppFacade } from "../../store/app.facades";
import { IFilter, IUser } from "../../common.model";
import { SelectionModel } from "@angular/cdk/collections";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort, Sort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { UserFormComponent } from "../user-form/user-form.component";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  users$: Observable<IUser[]>;
  selectedUsers: IUser[] = [];
  allUsers: IUser[] = [];
  pageIndex: number = 0
  pageSize: number = 10
  destroy$ = new Subject();
  selection: SelectionModel<IUser>;

  displayedColumns: string[] = ['select', 'id', 'create', 'fio', 'position', 'email', 'password', 'phone'];

  constructor(
    private app: AppFacade,
    private dialog: MatDialog,

  ) {
    this.selection = new SelectionModel<IUser>(true, []);
    this.selection.isSelected = this.isChecked.bind(this);
    this.users$ = combineLatest([
      this.app.getUsersObservables(),
      this.app.getFilterObservables()
    ]).pipe(
      map(([users, filter]) => {
        return this.applyFilter(users, filter);
      })
    );
  }

  ngOnInit(): void {
    this.users$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(resp => {
      this.allUsers = resp
      this.selectedUsers = [];
    });
  }

  ngAfterViewInit(){
    this.paginator.pageSize = this.pageSize;
    this.paginator.pageIndex = this.pageIndex;
  }

  applyFilter(users: IUser[], filter: IFilter | null): IUser[] {
    if (!filter || Object.keys(filter).length <= 0) {
      return users;
    }
    return users.filter((user: IUser) => {
      for (let [filterKey, filterValue] of Object.entries(filter)) {
        if (user[filterKey as keyof IUser]?.toLowerCase().includes(filterValue.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

  onAddHandler(user?: IUser): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '700px',
      height: 'max-content',
      disableClose: false,
      autoFocus: 'first-heading',
      data: {
        user: user
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed:', result);
      this.selection.clear()
    });
  }

  removeUser(): void {
    this.app.deleteUsers(this.selection.selected);
    this.selection.clear() ;
  }


  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.allUsers.length;
    return numSelected === numRows;
  }

  masterToggle($event: MatCheckboxChange): void {
    if ($event.checked) {
      this.selectAll();
    } else {
      this.deselectAll();
    }
  }

  private selectAll(): void {
    this.selection.select(...this.allUsers);
  }

  private deselectAll(): void {
    this.selection.deselect(...this.allUsers);
  }

  checkboxHandler(row: IUser) {
    this.selection.toggle(row)
  }

  isChecked(row: any): boolean {
    const found = this.selection.selected.find(el => el.id === row.id);
    return !!found;
  }

  onPageChange(event: PageEvent) {
    if (event.pageIndex !== this.pageIndex) {
      this.pageIndex = event.pageIndex
      this.paginator.pageIndex = event.pageIndex;
    }
    if (event.pageSize !== this.pageSize){
      this.paginator.pageSize = event.pageSize;
      this.pageSize = event.pageSize
    }
  }

  onSortChange(event: Sort) {
    const data = this.allUsers.slice();
    if (!event.active || event.direction === '') {
      this.allUsers = data;
      return;
    }

    this.allUsers = data.sort((a, b) => {
      const isAsc = event.direction === 'asc';
      switch (event.active) {
        case 'id':
        case 'create':
        case 'fio':
        case 'position':
        case 'email':
        case 'phone':
          return this.compare(a[event.active]!, b[event.active]!, isAsc);
        default:
          return 0;
      }
    });
    this.paginator.pageIndex = 0;
  }

  compare(a: string, b: string, isAsc: boolean): number {
    const aStr = a.toLowerCase();
    const bStr = b.toLowerCase();

    return aStr.localeCompare(bStr) * (isAsc ? 1 : -1);
  }
}
