import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

interface Project {
    title: string;
    category: string;
    description: string;
    image: string;
}

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    standalone: true,
    styleUrls: ['./projects.component.scss'],
    imports: [
        NgForOf,
    ],
})
export class ProjectsComponent {
    projects: Project[] = [
        {
            title: 'Solar Farm in Desert',
            category: 'Solar',
            description: 'A large-scale solar farm providing clean energy to over 50,000 households.',
            image: 'assets/images/projects/solar-farm.jpg'
        },
        {
            title: 'Urban Wind Turbines',
            category: 'Wind',
            description: 'Innovative wind turbines designed for urban environments with minimal noise.',
            image: 'assets/images/projects/wind-turbine.jpg'
        },
        {
            title: 'Smart Electric Grid',
            category: 'Electric',
            description: 'A next-generation smart grid for efficient energy distribution and monitoring.',
            image: 'assets/images/projects/electric-grid.jpg'
        },
        {
            title: 'Solar-Powered Schools',
            category: 'Solar',
            description: 'Equipping schools with rooftop solar panels to reduce energy costs.',
            image: 'assets/images/projects/solar-school.jpg'
        },
        {
            title: 'Offshore Wind Project',
            category: 'Wind',
            description: 'Harnessing ocean winds to generate sustainable electricity for coastal areas.',
            image: 'assets/images/projects/offshore-wind.jpg'
        },
        {
            title: 'Electric Vehicle Charging Network',
            category: 'Electric',
            description: 'A nationwide network of fast-charging stations for electric vehicles.',
            image: 'assets/images/projects/ev-charging.jpg'
        }
    ];
}
