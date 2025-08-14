import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    slides = [
        { title: 'پنل خورشیدی', image: 'assets/solar-panel.jpg' },
        { title: 'توربین بادی', image: 'assets/wind-turbine.jpg' },
        { title: 'انرژی برقی نو', image: 'assets/electric-energy.jpg' }
    ];

    currentSlide = 0;

    holdings = [
        {
            title: 'هولدینگ انرژی خورشیدی',
            description: 'تمرکز بر تولید و توسعه انرژی پاک خورشیدی برای کاهش کربن و حفظ محیط زیست.',
            icon: '☀️'
        },
        {
            title: 'هولدینگ انرژی بادی',
            description: 'توسعه توربین‌های بادی و پروژه‌های انرژی باد برای نسل‌های آینده.',
            icon: '🌬️'
        },
        {
            title: 'هولدینگ انرژی برقی',
            description: 'تمرکز بر سیستم‌های برق نو و هوشمند برای مصرف بهینه انرژی.',
            icon: '⚡'
        }
    ];

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    }
}
