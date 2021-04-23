import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { errorMessage, successDialog, timeMessage } from 'src/app/functions/alerts';
import { Userl } from 'src/app/models/userl';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  user:Userl;
  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router, private cookieService:CookieService) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  login(): void {
    if(this.loginForm.invalid){
      return Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched()
      })
    }else{
      console.log(this.user)
      this.setUser()
      this.authService.login(this.user).subscribe((data:any) =>{
        console.log('usuario logeado')
        timeMessage('Iniciando...',1500).then(() => {
          successDialog('Iniciado').then(() => {
            //console.log(data.token)
            this.cookieService.set('token_acces',data.token,4,'/')
            this.router.navigate(['/home'])
          })
        })

      },error =>{
        console.log('error')
        errorMessage('Correo o contraseña incorrecto.');
      });
    }
  }

  get emailValidate(){
    return(
      this.loginForm.get('email').invalid && this.loginForm.get('email').touched
    )
  }

  get passwordValidate(){
    return(
      this.loginForm.get('password').invalid && this.loginForm.get('password').touched
    )
  }

  createForm(): void{
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password: ['',[Validators.required]]
    });
  }

  setUser():void{
    this.user = { 
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
  }

}
