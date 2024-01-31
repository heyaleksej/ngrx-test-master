import { Component, Inject, OnInit } from '@angular/core';
import { IUser } from "../../common.model";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { map, Observable, Subject, takeUntil } from "rxjs";
import { DatePipe } from "@angular/common";
import { AppFacade } from "../../store/app.facades";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{

  userForm: FormGroup = {} as FormGroup;
  showErrors = false;
  submitted: boolean = false
  positions$: Observable<string[]>;
  destroy$ = new Subject();
  user:IUser | null = null

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private app: AppFacade,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.positions$ = this.app.getUsersObservables().pipe(
      takeUntil(this.destroy$),
      map((res: IUser[]) =>
        res.map((elem: IUser) => elem.position).filter((value, index, self) => self.indexOf(value) === index))
    );
  }

  ngOnInit(): void {
    this.initAddForm()
    if (this.data.user) {
      this.patchEditForm()
    }
    this.userForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.showErrors = !this.userForm.valid;
    });
  }

  initAddForm() {
    this.userForm = this.fb.group({
      create: ['', Validators.required],
      fio: ['', Validators.required],
      position: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    });
  }


  patchEditForm() {
    this.userForm.patchValue({ 'create': this.data.user.create });
    this.userForm.get('fio')?.setValue(this.data.user.fio);
    this.userForm.get('position')?.setValue(this.data.user.position);
    this.userForm.get('email')?.setValue(this.data.user.email);
    this.userForm.get('password')?.setValue(this.data.user.password);
    this.userForm.get('phone')?.setValue(Number(this.data.user.phone.replace('+', '')));
  }

  showError(controlName: string): boolean {
    const control = this.userForm.get(controlName) as FormControl;
    return this.showErrors && control.errors && (control.errors['required'] || control.errors['email'] || control.errors['phone']) && control.touched;
  }

  onSubmit(): void {
    this.submitted = true
    if (!this.userForm.valid) {
      this.showErrors = true;
      return;
    }
    let registrationDate = this.userForm.get('create')?.value;
    let phone = this.userForm.get('phone')?.value
    const newUser: IUser = {
      create: registrationDate && this.userForm.get('create')?.touched ? this.datePipe.transform(registrationDate, 'dd.MM.yyyy') ?? '' : '',
      fio: this.userForm.get('fio')?.value,
      position: this.userForm.get('position')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      phone: '+'+ phone.toString(),
    };
    if (this.data.user) {
      newUser.create = !this.userForm.get('create')?.touched ? this.data.user.create : this.datePipe.transform(registrationDate, 'dd.MM.yyyy')
      newUser.id = this.data.user.id
      this.app.editUser(newUser);

    } else {
      this.app.addUser(newUser);

    }
    this.userForm.reset();
    this.close()
  }

  close() {
    this.dialogRef.close()
  }
}
