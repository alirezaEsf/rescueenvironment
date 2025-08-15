import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgForOf, NgIf } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    animations: [
        trigger('fadeInUp', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(20px)' }),
                animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
        ]),
    ],
    imports: [
        NgForOf,
        NgIf,
    ],
})
export class HomeComponent {
    stats = [
        { value: 250, label: 'MW Installed Capacity' },
        { value: 36, label: 'Countries Served' },
        { value: 98, label: 'Client Satisfaction' },
        { value: 12, label: 'Innovation Awards' }
    ];

    holdings = [
        {
            name: 'Renewable Energy Solutions',
            icon: 'pi pi-sun',
            description: 'Comprehensive solar, wind and hydro power solutions for commercial and industrial applications.',
            services: [
                'Utility-scale solar farms',
                'Offshore wind projects',
                'Energy storage systems',
                'Microgrid solutions'
            ]
        },
        {
            name: 'Green Construction',
            icon: 'pi pi-building',
            description: 'Sustainable building practices and energy-efficient architectural designs.',
            services: [
                'LEED-certified construction',
                'Net-zero energy buildings',
                'Smart building integration',
                'Green materials sourcing'
            ]
        },
        {
            name: 'Energy Innovation Lab',
            icon: 'pi pi-microchip',
            description: 'R&D center developing next-generation clean energy technologies.',
            services: [
                'Advanced battery systems',
                'Hydrogen fuel cells',
                'AI-powered energy optimization',
                'Carbon capture solutions'
            ]
        }
    ];

    technologies = [
        {
            name: 'Floating Solar Arrays',
            image: 'assets/images/home/floating-solar.jpg',
            shortDesc: 'Water-based PV systems with higher efficiency',
            description: 'Our proprietary floating solar technology increases energy output by 15% compared to traditional ground-mounted systems while conserving water resources.',
            efficiency: 92
        },
        {
            name: 'Vertical Axis Wind Turbines',
            image: 'assets/images/home/vawt.jpg',
            shortDesc: 'Urban-friendly wind energy solution',
            description: 'Compact, silent turbines designed for urban environments with omnidirectional wind capture capability.',
            efficiency: 88
        },
        {
            name: 'Solid-State Batteries',
            image: 'assets/images/home/batteries.jpg',
            shortDesc: 'Next-gen energy storage',
            description: 'Safer, longer-lasting energy storage with 3x the energy density of lithium-ion batteries.',
            efficiency: 95
        }
    ];

    locations = [
        {
            name: 'Solar Farm Complex',
            country: 'Morocco',
            x: '25%',
            y: '45%',
            description: '1.2GW concentrated solar power plant with thermal storage capability',
            technologies: ['Solar Thermal', 'Energy Storage']
        },
        {
            name: 'Offshore Wind Park',
            country: 'Netherlands',
            x: '48%',
            y: '30%',
            description: '600MW offshore wind facility powering 500,000 homes',
            technologies: ['Offshore Wind', 'Smart Grid']
        },
        {
            name: 'Urban Microgrid',
            country: 'Singapore',
            x: '75%',
            y: '55%',
            description: 'Integrated renewable microgrid for sustainable urban development',
            technologies: ['Solar PV', 'Battery Storage', 'AI Optimization']
        }
    ];

    activeLocation: any = null;
}
