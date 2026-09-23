import { Injectable, signal, computed } from '@angular/core';
import { Produto } from './cesta.service';

export interface Pedido {
  id: string;
  data: string;
  status: string;
  total: number;
  itens: Produto[];
  formaPagamento?: string;
  parcelas?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private _pedidos = signal<Pedido[]>([]);
  private contador = 10024;
  
  readonly pedidos = this._pedidos.asReadonly();

  aprovarPedido(itens: Produto[], total: number): Pedido {
    const novoPedido: Pedido = {
      id: `#${this.contador++}`,
      data: new Date().toLocaleDateString('pt-BR'),
      status: 'Aguardando Pagamento',
      total,
      itens: [...itens]
    };
    
    this._pedidos.update(pedidosAtual => [novoPedido, ...pedidosAtual]);
    return novoPedido;
  }

  obterPedidos(): Pedido[] {
    return this._pedidos();
  }

  obterPedidoPorId(id: string): Pedido | undefined {
    return this._pedidos().find(p => p.id === id);
  }

  confirmarPagamento(id: string, formaPagamento: string, parcelas?: number): void {
    this._pedidos.update(pedidos => pedidos.map(p => {
      if (p.id === id) {
        return {
          ...p,
          formaPagamento,
          parcelas,
          status: 'Pagamento Confirmado'
        };
      }
      return p;
    }));
  }
}

