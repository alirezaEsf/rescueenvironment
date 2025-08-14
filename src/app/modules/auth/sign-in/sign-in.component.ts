import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    NgForm,
    ReactiveFormsModule,
    UntypedFormBuilder, UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import {
    SaffronInputComponent,
} from '../../mat-wrapper-components/projects/components/src/lib/_01-components/_01-saffron-input/saffron-input.component';
import {
    SaffronDataType,
} from '../../mat-wrapper-components/projects/components/src/lib/_01-components/_02-models/saffron-data-type';
import {
    SaffronButtonTypes,
} from '../../mat-wrapper-components/projects/components/src/lib/_01-components/_03-saffron-button/models/saffron-button-types';
import {
    SaffronButtonComponent,
} from '../../mat-wrapper-components/projects/components/src/lib/_01-components/_03-saffron-button/saffron-button.component';
import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';
import {
    XssInputValidationDirective,
} from '../../../../shared/services/xss-input-validation.directive';
import { XssControlService } from '../../../../shared/services/XssControlService';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [
        RouterLink,
        FuseAlertComponent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        SaffronInputComponent,
        SaffronButtonComponent,
        TranslocoDirective
    ],
    providers: [XssControlService],
})
export class AuthSignInComponent implements OnInit {
    // @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    // signInForm: UntypedFormGroup;
    signInForm: UntypedFormGroup = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', Validators.required],
        rememberMe: [''],
    });
    passwordControl = new UntypedFormControl();

    showAlert: boolean = false;
    SaffronDataType = SaffronDataType;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _translocoService: TranslocoService,
        private fb: FormBuilder,
        private _router: Router,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        /* this.signInForm = this._formBuilder.group({
             username: [
                 '',
                 [Validators.required],
             ],
             password: ['', Validators.required],
             rememberMe: [''],
         });*/
        if (localStorage.getItem('activeLang')) {
            this._translocoService.setActiveLang(localStorage.getItem('activeLang'));
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(event?: any): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();
        if (this.signInForm.controls['rememberMe'].value) {
            localStorage.setItem('signInfo', JSON.stringify(this.signInForm.value));
        }

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value).subscribe(
            () => {
                // Set the redirect url.
                // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                // to the correct page after a successful sign in. This way, that url can be set via
                // routing file and we don't have to touch here.
                /*const redirectURL =
                    this._activatedRoute.snapshot.queryParamMap.get(
                        'redirectURL'
                    ) || '/signed-in-redirect';*/


                // Navigate to the redirect url
                this._router.navigateByUrl('/main/home');
            },
            (response) => {
                // Re-enable the form
                this.signInForm.enable();

                // Reset the form
                this.signInForm.reset();

                // Set the alert
                this.alert = {
                    type: 'error',
                    message: 'نام کاربری یا رمز عبور صحیح نمی باشد.',
                };

                // Show the alert
                this.showAlert = true;
            },
        );
    }

    protected readonly SaffronButtonTypes = SaffronButtonTypes;
}
