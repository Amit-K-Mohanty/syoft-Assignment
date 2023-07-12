import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMAIL_PATTERN, getValidatonOnForm, maxNumToBeAllowed } from 'src/app/core/app-constants';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { AppData } from 'src/app/services/app-date.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  isSubmitted = false;
  invalidUserCred = false

  constructor(private fb:FormBuilder,private router:Router,private apiRequestService:ApiRequestService,private renderer:Renderer2) { }

  ngOnInit(): void {
    this.initForm();
    this.loginForm.valueChanges.subscribe(data => {
      this.invalidUserCred = false;
    })
  }
  initForm(){
    this.loginForm = this.fb.group({
      "user_email": ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      "user_password": ['', [Validators.required]],
    })

  }
  getValid(fieldName:string){
    return getValidatonOnForm(this.loginForm,fieldName,this.isSubmitted)
  }
  onClickRememberMe(){

  }
  onSignUp(){
    this.router.navigate(['/signup'])
  }
  onContinue(){
    if (this.loginForm.valid) {
      this.isSubmitted = true;
      const payload = this.loginForm.value;
      const apiResponse = this.apiRequestService.post('https://snapkaro.com/eazyrooms_staging/api/userlogin', payload)
      apiResponse.then((res: any) => {
        const response = res['body'];
        if (response.status && response?.msg === "User found") {
          AppData.isAuthenticated = true;
          AppData.userInfo$.next(response['user_data'][0])
          this.router.navigate(['/dashboard'])
        } else if (!response.status && response?.msg === "Invalid credentials") {
          this.invalidUserCred = true;      
        }
      })
    }
  }
  // https://snapkaro.com/eazyrooms_staging/api/userlogin
}
