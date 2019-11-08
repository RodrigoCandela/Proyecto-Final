import { Component, OnInit, Input } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-register-form",
  templateUrl: "./register-form.component.html",
  styleUrls: ["./register-form.component.scss"]
})
export class RegisterFormComponent implements OnInit {
  constructor(public apiService: ApiService, public router: Router) {}
  public tittle = "Finders";
  public mode: any;
  public type;
  public pass = document.getElementById("password");
  public userData: any;

  @Input() user = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    birthDate: Date
  };
  getUserInfo(user) {
    console.log("userCreated",user);
  }

  ngOnInit() {
    this.type = "password";
  }
  newUser(user) {
    this.apiService.createUser(this.user).subscribe();
    //localStorage.setItem("this.userData", JSON.stringify(this.userData));
    //console.log(`UserData:` , this.user);
  }

  showPass() {
    if (this.type == "password") {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }
}
