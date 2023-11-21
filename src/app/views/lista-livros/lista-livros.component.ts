import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: [];
  campoBusca: string = ''
  subscription: Subscription
  livro: Livro


  constructor(private service: LivroService) { }
  
  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: retornoAPI => console.log(retornoAPI),
      error: erro => console.log(erro),
      complete: () => console.log('Observable completado')
    });
  }
  
  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}



