import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppData } from 'src/app/services/app-date.service';
import { StorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userInfo: UserDetails

  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    AppData.userInfo$.subscribe(data => {
      if (data) {
        this.userInfo = data
      }
    })
  }

  onLogout() {
    this.storageService.clearStorage();
    AppData.isAuthenticated = false;
    this.router.navigate(['/welcome'])

  }

}
interface UserDetails {
  user_firstname: string,
  user_email: string,
  user_phone: string,
  user_lastname: string,
  user_city: string,
  user_zipcode: string
}
