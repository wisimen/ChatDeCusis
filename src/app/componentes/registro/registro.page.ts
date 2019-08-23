import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsernameValidator } from './shared/username-validator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  public username: string;
  public name: string;
  public lastName: string;
  public dateOfBirth: string;
  public email: string;
  public phonenumber: string;
  public password: string;
  public retryPassword: string;
  validationsForm = this.createValidationForm();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }
  isValidField(fieldName) {
    const v = [];
    this.getValidationMessages()[fieldName].map(val => {
      if (this.validationsForm.get(fieldName).hasError(val.type) &&
        (this.validationsForm.get(fieldName).dirty || this.validationsForm.get(fieldName).touched)) {
        v.push(val);
      }
    });
  }
  createValidationForm() {
        return this.formBuilder.group({
          username: new FormControl('', Validators.compose([
            UsernameValidator.validUsername,
            Validators.maxLength(25),
            Validators.minLength(5),
            Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
            Validators.required
          ])),
          name: new FormControl('', Validators.compose([
            Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
            Validators.required
          ])),
          lastName: new FormControl('', Validators.compose([
            Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
            Validators.required
          ])),
          dateOfBirth: new FormControl('', Validators.compose([
            Validators.pattern('^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$'),
            Validators.required
          ])),
          email: new FormControl('', Validators.compose([
            Validators.email,
            Validators.required
          ])),
          phonenumber: new FormControl('', Validators.compose([
            Validators.pattern('^([3]{1})([0-2]{1})([0-9]{1})[0-9]{7}$'),
            Validators.required
          ])),
          password: new FormControl('', Validators.compose([
            Validators.minLength(6),
            Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'),
            Validators.required
          ])),
          retryPassword: new FormControl('', Validators.compose([
            UsernameValidator.validUsername,
            Validators.pattern('^()$'),
            Validators.required
          ])),
        });
      }
  getValidationMessages() {
        return {
          username: [
            { type: 'required', message: 'El nombre de usuario es requerido.' },
            { type: 'minlength', message: 'El nombre de usuario debe ser de al menos 5 caracteres.' },
            { type: 'maxlength', message: 'El nombre de usuario debe ser máximo de 25 caracteres.' },
            { type: 'pattern', message: 'El nombre de usuario solo puede tener números y letras.' },
            { type: 'validUsername', message: 'El nombre de usuario ya existe.' }
          ],
          name: [
            { type: 'required', message: 'El nombre es requerido.' },
            { type: 'pattern', message: 'El nombre solo puede tener números y letras.' },
          ],
          lastName: [
            { type: 'required', message: 'El apellido es requerido.' },
            { type: 'pattern', message: 'El apellido solo puede tener números y letras.' },
          ],
          dateOfBirth: [
            { type: 'required', message: 'La fecha de nacimiento es requerida.' },
            { type: 'pattern', message: 'La fecha debe tener el formato DD/MM/YYYY.' },
          ],
          email: [
            { type: 'required', message: 'El correo electrónico es requerido.' },
            { type: 'email', message: 'El correo electrónico no es válido.' }
          ],
          phonenumber: [
            { type: 'required', message: 'El número de celular es requerido.' },
            { type: 'pattern', message: 'El número de celular no es válido].' },
          ],
          password: [
            { type: 'minlength', message: 'La contraseña debe ser de al menos 6 caracteres' },
            { type: 'required', message: 'La contraseña es requerida.' },
            { type: 'pattern', message: 'La contraseña debe tener números y letras.' },
          ],
          retryPassword: [
            { type: 'required', message: 'Es necesario ingresar nuevamente la contraseña.' },
            { type: 'pattern', message: 'Las contraseñas no coincide' },
          ],
        };
      }
}
