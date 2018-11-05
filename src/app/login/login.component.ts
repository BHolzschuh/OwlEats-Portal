import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

export interface User {
	email: string;
	password: string;
}

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	message: string;
	user = {} as User;

	constructor(
		private authservice: AuthService,
		private fb: FormBuilder,
	) { }

	ngOnInit(): void {
		this.createForm();
	}


	login(value) {
		this.authservice.login(value)
			.then(res => {
				this.message = res;
			});
	}

	logout() {
		this.authservice.logout();
	}

	createForm() {
		this.loginForm = this.fb.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	checkAuth() {
		console.log(this.authservice.isAuthenticated());
	}

}
