import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EMAIL_PATTERN, getValidatonOnForm, maxNumToBeAllowed } from 'src/app/core/app-constants';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { AppData } from 'src/app/services/app-date.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  isSubmitted = false;
  privacyPolicy = false

  constructor(private router: Router, private fb: FormBuilder, private apiRequestService: ApiRequestService) {
  }

  ngOnInit(): void {
    this.initForm();
  }
  onSignIn() {
    this.router.navigate(['/login'])
  }
  initForm() {
    this.signUpForm = this.fb.group({
      "user_firstname": ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      "user_lastname": ['K', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      "user_email": ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      "user_phone": ['', [Validators.required, Validators.min(1111111111), Validators.max(9999999999)]],
      "user_password": ['', [Validators.required]],
      "user_city": ['HYD', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      "user_zipcode": ['500032', [Validators.required, Validators.min(100000), Validators.max(999999)]]
    })
  }

  getValid(name: any) {
    return getValidatonOnForm(this.signUpForm, name, this.isSubmitted);
  }
  onKeyPress(event: any, size: number) {
    if (isNaN(Number(event.key))) {
      event.preventDefault();
  }
    return maxNumToBeAllowed(event, size);
  }
  onContinue() {
    if (this.signUpForm.valid) {
      this.isSubmitted = true;
      const payload = this.signUpForm.value;
      const apiResponse = this.apiRequestService.post('https://snapkaro.com/eazyrooms_staging/api/user_registeration', payload)
      apiResponse.then((res: any) => {
        console.log(res)
        const response = res['body']
        if (response.status && response?.msg === "Registered Successfully") {
          AppData.isAuthenticated = true;
          AppData.userInfo$.next(payload);
          this.router.navigate(['/dashboard'])
        } else if (!response.status && response?.msg === "Already Exists") {
          alert('User Already Exsist')
        }
      })
    }
  }
  onClickPrivacyPolicy() {
    this.privacyPolicy = !this.privacyPolicy;
  }

}
interface HttpResponse {
  status: boolean,
  msg: string
}
