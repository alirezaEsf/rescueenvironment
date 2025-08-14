import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { HomeApiService } from '../services/home-api-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

    constructor(
        private authService: AuthService,
        private homeApiService: HomeApiService,
        private router: Router
    ) {

    }

    ngOnInit(): void {

    }

}
