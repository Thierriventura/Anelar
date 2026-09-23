import { Injectable, signal, computed } from '@angular/core';

export interface Produto {
  id: number;
  nome: string;
  desc: string;
  preco: number;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class CestaService {
  private _itensNaCesta = signal<Produto[]>([]);
  
  readonly itensNaCesta = this._itensNaCesta.asReadonly();
  
  readonly total = computed(() => 
    this._itensNaCesta().reduce((acc, produto) => acc + produto.preco, 0)
  );

  constructor() { }

  adicionarItem(produto: Produto) {
    this._itensNaCesta.update(itens => [...itens, produto]);
  }

  removerItem(produtoId: number) {
    this._itensNaCesta.update(itens => {
      const index = itens.findIndex(p => p.id === produtoId);
      if (index > -1) {
        const novosItens = [...itens];
        novosItens.splice(index, 1);
        return novosItens;
      }
      return itens;
    });
  }

  obterItens(): Produto[] {
    return this._itensNaCesta();
  }

  obterTotal(): number {
    return this.total();
  }

  limparCesta() {
    this._itensNaCesta.set([]);
  }
}

