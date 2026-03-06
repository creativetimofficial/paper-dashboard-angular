/// <reference types="google.maps" />

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { HttpClient } from '@angular/common/http';

declare var google: any;

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('mapContainer') mapElement!: ElementRef;

  wifiPoints: any[] = [];
  map!: google.maps.Map;
  markers: google.maps.Marker[] = [];
  cluster!: MarkerClusterer;
  alcaldias: string[] = [];
  selectedAlcaldia: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  ngAfterViewInit() {

    const cdmx = new google.maps.LatLng(19.4326, -99.1332);

    const mapOptions = {
      zoom: 12,
      center: cdmx,
      scrollwheel: false
    };

    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapOptions
    );

    this.loadWifiPoints();
  }

  loadWifiPoints() {
    this.http.get<any>(
      'https://wifi-cdmx-24918-default-rtdb.firebaseio.com/.json'
    )
      .subscribe(data => {

        const array = Object.values(data);

        this.wifiPoints = array;

        this.alcaldias = [...new Set(array.map((p: any) => p.alcaldia))];

        this.renderMarkers(this.wifiPoints);

      });
  }

  renderMarkers(points: any[], adjustZoom: boolean = false) {

    // limpiar marcadores
    this.markers.forEach(m => m.setMap(null));
    this.markers = [];

    // limpiar cluster anterior
    if (this.cluster) {
      this.cluster.clearMarkers();
    }

    points.forEach(point => {

      const marker = new google.maps.Marker({
        position: {
          lat: parseFloat(point.latitud),
          lng: parseFloat(point.longitud)
        },
        title: point.id
      });

      this.markers.push(marker);

    });

    // crear cluster
    this.cluster = new MarkerClusterer({
      map: this.map,
      markers: this.markers,
      algorithmOptions: {
        maxZoom: 15
      }
    });

    // centrado automático
    if (adjustZoom && this.markers.length > 0) {

      const bounds = new google.maps.LatLngBounds();

      this.markers.forEach(marker => {
        bounds.extend(marker.getPosition());
      });

      this.map.fitBounds(bounds);
    }

  }

  filterByAlcaldia() {

    if (!this.selectedAlcaldia) {
      this.renderMarkers(this.wifiPoints);
      return;
    }

    const filtered = this.wifiPoints.filter(
      p => p.alcaldia === this.selectedAlcaldia
    );

    this.renderMarkers(filtered, true);

  }

}
