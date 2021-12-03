import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-busca-local',
  templateUrl: './busca-local.page.html',
  styleUrls: ['./busca-local.page.scss'],
})
export class BuscaLocalPage {
  
  map: google.maps.Map;
  minhaPosicao: google.maps.LatLng;

  listaEnderecos: any = [];

  private autoComplete = new google.maps.places.AutocompleteService();
  private direction = new google.maps.DirectionsService();
  private directionsRender = new google.maps.DirectionsRenderer();

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(private geolocation: Geolocation, private ngZone: NgZone) { }
  
  ionViewWillEnter() {
    this.exibirMapa(); 
  }

  exibirMapa() {
    const posicao = new google.maps.LatLng(-23.533773, -46.625290);
    const opcoes = {
      center: posicao,
      zoom: 1,
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, opcoes);

    this.buscarPosicao();
  }

  buscarPosicao() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      this.minhaPosicao = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      this.irParaMinhaPosicao();
    
    }).catch((error) => {
      console.log('Error getting location', error);  
    });
  }

  irParaMinhaPosicao()  {
    this.map.setCenter(this.minhaPosicao);
    this.map.setZoom(15);

    const marker = new google.maps.Marker({
      position: this.minhaPosicao,
      title: 'Minha Posicao!',
      animation: google.maps.Animation.BOUNCE,
      map: this.map
    });
  }


  buscarEndereco(eventoCampoBusca: any) {
    const busca = eventoCampoBusca.target.value as string;

    if (!busca.trim().length) { this.listaEnderecos = []; return false; }

    this.autoComplete.getPlacePredictions({ input: busca }, (arrayLocais, status) => {
      if (status == 'OK') {
        this.ngZone.run(() => {
          this.listaEnderecos = arrayLocais;
        });
      } else {
        this.listaEnderecos = [];
      }
    });
  }

  public tracarRota(Local: google.maps.places.AutocompletePrediction) {
    this.listaEnderecos = [];

    new google.maps.Geocoder().geocode({address: Local.description}, resultado => {
      console.log(resultado);
      // this.map.setCenter(resultado[0].geometry.location);
      // this.map.setZoom(19);

      const marker = new google.maps.Marker({
        position: resultado[0].geometry.location,
        title: resultado[0].formatted_address,
        animation: google.maps.Animation.DROP,
        map: this.map
      });

      const rota: google.maps.DirectionsRequest = {
        origin: this.minhaPosicao,
        destination: resultado[0].geometry.location,
        unitSystem: google.maps.UnitSystem.METRIC,
        travelMode: google.maps.TravelMode.DRIVING
      }

      this.direction.route(rota, (result, status) => {
        if (status == 'OK') {
          this.directionsRender.setMap(this.map);
          this.directionsRender.setDirections(result);
          this.directionsRender.setOptions({ suppressMarkers: true });
          console.log(result);
        }
      });

    });
  }

}
