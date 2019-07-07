import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let httpService: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });
    httpService = TestBed.get(HttpService);
    httpMock = TestBed.get(HttpTestingController);
  });
  

  it('Verificando requisição ao endpoint de movies', ()=> {
    let headers = {
      'Content-Type': 'application/json'
    }
    httpService.get("https://demo3127152.mockable.io/movies", headers).subscribe((data: any) => {
      let movie = expect(Object.keys(data[0]))
      
      movie.toContain("id");
      movie.toContain("titulo_original");
      movie.toContain("titulo_portugues");
      movie.toContain("hero3x1");
      movie.toContain("hero4x1");
      movie.toContain("poster_p");
      movie.toContain("poster_m");
      movie.toContain("poster_g");
      movie.toContain("poster_gg");
      movie.toContain("wallpaper");
      movie.toContain("part_dia");
    });
  });
});
