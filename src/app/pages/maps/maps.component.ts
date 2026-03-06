import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'maps-cmp',
    templateUrl: 'maps.component.html'
})

export class MapsComponent implements OnInit, AfterViewInit {

    @ViewChild('mapContainer') mapElement!: ElementRef;

    map: any;
    wifiPoints: any[] = [];

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

        navigator.geolocation.getCurrentPosition(position => {

            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            this.map.setCenter(userLocation);
            this.map.setZoom(17);


            // marcador del usuario
            new google.maps.Marker({
                position: userLocation,
                map: this.map,
                title: "Tu ubicación",
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }
            });

            this.http.get<any>(
                'https://wifi-cdmx-24918-default-rtdb.firebaseio.com/.json'
            )
                .subscribe(data => {

                    const array = Object.values(data);

                    data.forEach(point => {

                        const distance = this.getDistance(
                            userLocation.lat,
                            userLocation.lng,
                            parseFloat(point.latitud),
                            parseFloat(point.longitud)
                        );

                        point.distance = distance;

                    });

                    // ordenar por distancia
                    this.wifiPoints = data.sort((a, b) => a.distance - b.distance);

                    this.wifiPoints.slice(0, 5).forEach(point => {

                        new google.maps.Marker({
                            position: {
                                lat: parseFloat(point.latitud),
                                lng: parseFloat(point.longitud)
                            },
                            map: this.map,
                            title: point.id
                        });

                    });

                });

        });

    }

    getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {

        const R = 6371; // radio de la tierra km

        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) *
            Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    deg2rad(deg: number) {
        return deg * (Math.PI / 180);
    }

}
