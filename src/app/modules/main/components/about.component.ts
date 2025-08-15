import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { NgForOf } from '@angular/common';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [PanelModule, AccordionModule, AvatarModule, NgForOf],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
    teamMembers = [
        {
            name: 'Alice Johnson',
            role: 'CEO',
            photo: 'assets/images/team/alice.jpg',
            bio: 'Passionate about renewable energy and innovation.'
        },
        {
            name: 'Bob Smith',
            role: 'CTO',
            photo: 'assets/images/team/bob.jpg',
            bio: 'Expert in solar and wind technologies.'
        },
        {
            name: 'Carla Gomez',
            role: 'Environmental Specialist',
            photo: 'assets/images/team/carla.jpg',
            bio: 'Committed to sustainable development and environment.'
        }
    ];

    history = `Founded in 2010, New Energy Holding has been a pioneer in developing clean and sustainable energy solutions...`;

    mission = `Our mission is to reduce carbon footprint globally by innovating in solar, wind, and electric energy sectors...`;

    vision = `To be the global leader in renewable energy and contribute to a cleaner planet for future generations.`;
}
