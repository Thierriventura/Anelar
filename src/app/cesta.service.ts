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

  /**
   * Adiciona um produto à cesta.
   * @param produto Produto a ser adicionado
   */
  adicionarItem(produto: Produto) {
    this._itensNaCesta.update(itens => [...itens, produto]);
  }

  /**
   * Remove a primeira ocorrência de um produto na cesta a partir do seu ID.
   * @param produtoId ID do produto a ser removido
   */
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

  /**
   * Retorna os itens atualmente na cesta.
   * @returns Array de produtos adicionados
   */
  obterItens(): Produto[] {
    return this._itensNaCesta();
  }

  /**
   * Retorna o valor total da cesta somando o preço dos itens.
   * @returns Valor total numérico
   */
  obterTotal(): number {
    return this.total();
  }

  /**
   * Remove todos os itens da cesta, deixando-a vazia.
   */
  limparCesta() {
    this._itensNaCesta.set([]);
  }
}

