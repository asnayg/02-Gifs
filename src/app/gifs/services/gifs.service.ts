import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apikey:string = 'ASo2J9irR2YmHVR03o8FHAUIYxLDrBbj';
  private _historial: string[] = [];
  public resultado: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this.resultado = JSON.parse( localStorage.getItem('resultado')! ) || [];
    //if ( localStorage.getItem('historial') )
    //  this._historial = JSON.parse( localStorage.getItem('historial')! )

  }

  buscarGifs(query:string){
    query = query.trim().toLocaleLowerCase();
    if ( !this._historial.includes(query ) )
    {
      this._historial.unshift( query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial) );
    }
    //console.log(this._historial);

    const params = new HttpParams()
          .set('api_key', this.apikey)
          .set('limit', '10')
          .set('q', query);

    this.http.get<SearchGifsResponse> (`https://api.giphy.com/v1/gifs/search`, {params: params} )
        .subscribe( (resp) => {
          console.log(resp.data);
          this.resultado = resp.data;
          localStorage.setItem('resultado', JSON.stringify(this.resultado) )
        });

  }

}
