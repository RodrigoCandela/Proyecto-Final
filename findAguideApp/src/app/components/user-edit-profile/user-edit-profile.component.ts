/*
import { Component, OnInit, Input, DoCheck } from "@angular/core";
import { ApiService } from "../../services/api.service";

@Component({
  selector: "app-user-edit-profile",
  templateUrl: "./user-edit-profile.component.html",
  styleUrls: ["./user-edit-profile.component.scss"]
})
export class UserEditProfileComponent implements OnInit {
  constructor(public apiService: ApiService) {}
  @Input() userData;
  public localStorageUserData: any;

  public userDetails = {
   name: String,
   birthDate: Date,
   email: String,
   picture: String,
   password: String
  }


  ngDoCheck() {
    this.userData = JSON.parse(this.localStorageUserData);

    this.userDetails.name = this.userDetails[0].name;
    this.userDetails.birthDate=this.userDetails[0].birthDate;
    this.userDetails.email = this.userDetails[0].email;
    this.userDetails.password = this.userDetails[0].password;

    console.log("User Local storage data: ",this.localStorageUserData);
  }

  editUser() {
    this.apiService
      .editUser(this.userData.id, this.userData.user)
      .subscribe(data => {
        console.log(data);
      });
  }

  ngOnInit() {
console.log("Informacion ",
typeof JSON.stringify(this.localStorageUserData[0].name));
  }
}
*/

//TEST ANDRES

import { Component, Input, OnChanges, DoCheck } from "@angular/core";
import { UserNavBarService } from "src/app/services/user-nav-bar.service";
import { ApiService } from "src/app/services/api.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-user-edit-profile",
  templateUrl: "./user-edit-profile.component.html",
  styleUrls: ["./user-edit-profile.component.scss"]
})
export class UserEditProfileComponent implements DoCheck {
  constructor(
    public apiService: ApiService,
    public router: Router,
    public route: ActivatedRoute
  ) {}
  public localStorageUserData: any;
  public userInfo;
  public name: String;
  public birthDate: string;
  public email: String;
  public picture: String;
  public password: String;

  @Input() userData;
  ngDoCheck() {
    this.localStorageUserData = localStorage.getItem("this.userData");
    this.userInfo = JSON.parse(this.localStorageUserData);
    this.name = this.userInfo[0].name;
    this.birthDate =( this.userInfo[0].birthDate).slice(0, 10);
    this.email = this.userInfo[0].email;
    console.log("this.userInfo.name:", this.birthDate.slice(0, 10));
  }
}
