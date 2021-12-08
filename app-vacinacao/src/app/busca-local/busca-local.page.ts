import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-busca-local',
  templateUrl: './busca-local.page.html',
  styleUrls: ['./busca-local.page.scss'],
})
export class BuscaLocalPage {
  
  // VARIAVEL GOOGLE MAPS
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

  // Metodo para carregar a pagina do Google Maps
  exibirMapa() {
    const posicao = new google.maps.LatLng(-23.6138507, -46.5100014);
    const opcoes = {
      center: posicao,
      zoom: 15, // zoom para carregar o mapa
      disableDefaultUI: false // habilitar ou desabilitar recurso de satelite, zoom
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, opcoes);

    this.buscarPosicao();
  }
  
   // Metodo para buscar posicao atual por gps
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
  // Metodo para encontrar localizaçao atual do usuario por gps
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

  // Metodo para buscar endereço
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
  // Traçar rotas a partir da localizaçao atual do usuario
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