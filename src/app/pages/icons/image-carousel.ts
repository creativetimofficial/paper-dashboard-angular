import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit {
  images = [
    { src: 'assets/Imagenes/michi.webp', alt: 'Imagen de un michi', duration: 3000 },
    { src: 'assets/Imagenes/paisaje.webp', alt: 'Hermoso paisaje', duration: 5000 },
  ];
  
  currentIndex = 0;
  isFullscreen = false;
  interval: any;

  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router) {}

  ngOnInit() {
    this.startCarousel();
    this.enterFullscreen();
  }

  startCarousel() {
    this.updateCarousel();
  }

  updateCarousel() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.nextImage();
    }, this.images[this.currentIndex].duration);
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateCarousel();
  }

  prevImage() {
    this.currentIndex = (this.currentIndex === 0) ? this.images.length - 1 : this.currentIndex - 1;
    this.updateCarousel();
  }

  enterFullscreen() {
    const carousel = this.el.nativeElement.querySelector('.carousel-container');
    if (carousel.requestFullscreen) {
      carousel.requestFullscreen().then(() => this.isFullscreen = true);
    }
  }

  exitFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => this.isFullscreen = false);
    }
  }

  toggleFullscreen() {
    if (!this.isFullscreen) {
      this.enterFullscreen();
    } else {
      this.exitFullscreen();
    }
  }
}
