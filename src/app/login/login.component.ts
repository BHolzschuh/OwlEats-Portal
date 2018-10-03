import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { FirebaseService } from '../../services/firebase.service';

export interface User {
	first: string;
	last: string;
	email: string;
	password: string;
}

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {

	loginForm = this.fb.group({
		email: ['', Validators.required],
		password: ['', Validators.required],
	})

	items: Observable<any[]>;
	vendors: Observable<any[]>;
	user = {} as User;
	message;

	constructor(private afAuth: AngularFireAuth, private fb: FormBuilder,
		private fbS: FirebaseService) {
		this.items = this.fbS.GetTable('/menuItems');
		this.vendors = this.fbS.GetTable('/vendors');
	}

	// Authenticate the user and determine if they are a vendor
	async login(user: User) {
		try {
			const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);

			// slight delay between authentication and signout of non vendor
			this.vendors.subscribe(
				(response) => {
					if (!response.some(x => x.uid === result.user.uid)) {
						this.logout();
						this.message = "Not a vendor account";
					}
				});
		}
		catch (e) {
			console.error(e);
			this.checkErrors(e.code);
		}
	}

	async checkVendor() {

		return true;
	}

	// Signs out the authenticated user
	logout() {
		this.afAuth.auth.signOut();
	}

	checkErrors(error: String) {
		if (error == "auth/invalid-email") {
			this.message = "Invalid Email Address";
		}
		else if (error == "auth/user-not-found" || error == "auth/wrong-password") {
			this.message = "Incorrect Email/Password";
		}
		else if (error == "auth/argument-error") {
			this.message = "Please fill out both fields";
		}
	}

}
