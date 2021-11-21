import { Schooling } from './../../../models/user/schooling.class';
import { User } from './../../../models/user/user.model';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { UserEditService } from './user-edit.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  public user: User;

  public userForm: FormGroup;
  public formSubmit: boolean;
  public optionsSelect: any[];
  public idUserSelected: number;
  public saving: boolean;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _userEditService: UserEditService,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.optionsSelect = []
    this.formSubmit = false;

    this._userEditService.onDataChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {

      this.user = new User(response);
      if (this.user?.dataNascimento) {
        this.user.dataNascimento = moment(new Date(this.user.dataNascimento)).format('YYYY-MM-DD');
      }
      this.createForm();
    });

    Object.entries(Schooling.enum).forEach(x => {
      this.optionsSelect.push({ key: x[0], value: x[1] });
    });

    this._activatedRoute.params.subscribe(params => {
      this.idUserSelected = params?.id ? Number(params?.id) : 0;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next()
    this._unsubscribeAll.complete()
  }

  submitForm() {
    this.formSubmit = true;
    if (this.userForm.invalid) {
      return;
    }
    this.saving = true;

    let message = 'Cadastro realizado com sucesso';
    if (this.idUserSelected) {
      message = 'Atualizado com sucesso';
    }

    this._userEditService.save(this.idUserSelected, this.user)
      .subscribe({
        next: (response) => {
          this._router.navigate(["user"])
            .then(() => {
              this.getToastSucess(message);
            });
          this.saving = false;
        },
        error: (err) => {
          let message = 'Erro inesperado!';
          if (err?.error?.StatusCode && err.error.StatusCode != 500) {
            message = err.error.Title;
          }
          this.getToastError(message);
          this.saving = false;
        }
      });
  }

  remove() {
    if (confirm("Deseja mesmo excluir ?")) {
      this.saving = true;

      if (this.idUserSelected) {
        this._userEditService.remove(Number(this.idUserSelected))
          .subscribe({
            next: (response) => {
              this._router.navigate(["user"])
                .then(() => {
                  this.getToastSucess('Excluido com sucesso');
                });
              this.saving = false;
            },
            error: (err) => {
              let message = 'Erro inesperado!';
              if (err?.error?.StatusCode && err.error.StatusCode != 500) {
                message = err.error.Title;
              }
              this.getToastError(message);
              this.saving = false;
            }
          });
      }
    }
  }

  get formControls() {
    return this.userForm.controls;
  }

  private createForm() {
    this.userForm = this._formBuilder.group({
      nome: [this.user.nome, [Validators.required]],
      sobrenome: [this.user.sobrenome, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      dataNascimento: [this.user.dataNascimento, [Validators.required, this.dateValidator()]],
      escolaridade: [this.user.escolaridade, [Validators.required]]
    });
  }

  private dateValidator(format = "YYYY-MM-DD"): any {
    return (control: FormControl): { [key: string]: any } => {
      const val = moment(control.value, format, true);
      if (!val.isValid()) {
        return { invalidDate: true };
      }

      if (val.isAfter(moment().toDate())) {
        return { invalidDate: true };
      }

      return null;
    };
  }

  private getToastSucess(message: string) {
    return this._toastr.success(message, '',
      { progressBar: true, closeButton: true, tapToDismiss: false });
  }

  private getToastError(message: string) {
    return this._toastr.error(message, '',
      { progressBar: true, closeButton: true, tapToDismiss: false });
  }
}
