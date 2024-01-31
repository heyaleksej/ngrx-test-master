import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSortModule } from "@angular/material/sort";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { AppComponent } from "./app.component";
import { DatePipe } from "@angular/common";
import { UsersTableComponent } from "./components/users-table/users-table.component";
import { filterReducer } from "./store/filter.reducer";
import { usersReducer } from "./store/user.reducer";
import { StoreModule } from "@ngrx/store";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { FiltersWrapperComponent } from "./components/filters-wrapper/filters-wrapper.component";
import { HeaderComponent } from "./components/header/header.component";
import { PhoneNumberPipe } from "./pipes/phoneNumber.pipe";
import { MatPaginatorModule } from "@angular/material/paginator";
import { UserFormComponent } from "./components/user-form/user-form.component";

@NgModule({
  declarations: [
    AppComponent,
    FiltersWrapperComponent,
    HeaderComponent,
    UsersTableComponent,
    PhoneNumberPipe,
    UserFormComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatSortModule,
    MatDialogModule,
    MatTabsModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    StoreModule.forRoot({
      users: usersReducer,
      filter: filterReducer
    }),
    MatPaginatorModule,
  ],
  providers: [
    DatePipe, PhoneNumberPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
