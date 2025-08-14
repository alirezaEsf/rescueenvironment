import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { NgForOf } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CarouselModule, CardModule, NgForOf],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    slides = [
        { title: 'Solar Panel', image: 'assets/images/logo/solar-panel.svg' },
        { title: 'Wind Turbine', image: 'assets/images/logo/wind-turbine.svg' },
        { title: 'New Electric Energy', image: 'assets/images/logo/electric-energy.svg' }
    ];

    holdings = [
        {
            title: 'Solar Energy Holding',
            description: 'Focused on production and development of clean solar energy to reduce carbon and protect the environment.',
            icon: '☀️'
        },
        {
            title: 'Wind Energy Holding',
            description: 'Development of wind turbines and wind energy projects for future generations.',
            icon: '🌬️'
        },
        {
            title: 'Electric Energy Holding',
            description: 'Focused on new and smart electric systems for optimized energy consumption.',
            icon: '⚡'
        }
    ];
}
