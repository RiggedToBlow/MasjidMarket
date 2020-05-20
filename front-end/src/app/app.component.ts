import { Component, OnInit } from "@angular/core";
import { LoginService } from "./services/login.service";
import { Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "سوق مسجد الكنجلية الالكتروني";

  constructor(
    private login: LoginService,
    private router: Router,
    private DomSan: DomSanitizer,
    private register: MatIconRegistry
  ) {}

  ngOnInit() {
    this.login.loggedInToken.subscribe((res) => {
      if (res) this.router.navigate(["market"]);
    });
    this.register.addSvgIcon(
      "logout",
      this.DomSan.bypassSecurityTrustResourceUrl("assets/log-out.svg")
    );
  }
}
