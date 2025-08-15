import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    standalone: true,
    styleUrls: ['./contact-us.component.scss'],
    imports: [
        ReactiveFormsModule,
        NgIf,
    ],
})
export class ContactUsComponent {
    contactForm: FormGroup;
    submitted = false;

    constructor(private fb: FormBuilder) {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            subject: ['', Validators.required],
            message: ['', Validators.required]
        });
    }

    onSubmit() {
        this.submitted = true;
        if (this.contactForm.valid) {
            console.log('Form Data:', this.contactForm.value);
            alert('Your message has been sent successfully!');
            this.contactForm.reset();
            this.submitted = false;
        }
    }

    get f() {
        return this.contactForm.controls;
    }
}
