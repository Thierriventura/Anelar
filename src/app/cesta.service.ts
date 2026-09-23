import { Injectable } from '@angular/core';

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
  private itensNaCesta: Produto[] = [];

  constructor() { }

  adicionarItem(produto: Produto) {
    this.itensNaCesta.push(produto);
  }

  removerItem(produtoId: number) {
    const index = this.itensNaCesta.findIndex(p => p.id === produtoId);
    if (index > -1) {
      this.itensNaCesta.splice(index, 1);
    }
  }

  obterItens(): Produto[] {
    return this.itensNaCesta;
  }

  obterTotal(): number {
    return this.itensNaCesta.reduce((total, produto) => total + produto.preco, 0);
  }

  limparCesta() {
    this.itensNaCesta = [];
  }
}
