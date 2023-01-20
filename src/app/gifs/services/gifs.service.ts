import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string [] = [];
  private apiKey: string = 'NJFaaFWX4v4hie1ofqrucTJ84XJLWE5b';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';


  public resultados: Gif[] = []; 
  

  get historial()
  {
    return [...this._historial];
  }

  constructor( private http : HttpClient) { 

    if( localStorage.getItem('historial'))
    {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }

    if( localStorage.getItem('resultados'))
    {
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }
  }


  buscarGifs( query: string){

    query = query.toLowerCase();

    if(!this._historial.includes(query)){

      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));

    }

    const params = new HttpParams().set('api_key', this.apiKey)
                                   .set('limit', 10)
                                   .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
    .subscribe( (resp) => {
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })
      
      
      
      
  }

}
