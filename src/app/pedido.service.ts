import { Injectable } from '@angular/core';
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
  private pedidos: Pedido[] = [];
  private contador = 10024;

  aprovarPedido(itens: Produto[], total: number): Pedido {
    const novoPedido: Pedido = {
      id: `#${this.contador++}`,
      data: new Date().toLocaleDateString('pt-BR'),
      status: 'Aguardando Pagamento',
      total,
      itens: [...itens]
    };
    this.pedidos.unshift(novoPedido);
    return novoPedido;
  }

  obterPedidos(): Pedido[] {
    return this.pedidos;
  }

  obterPedidoPorId(id: string): Pedido | undefined {
    return this.pedidos.find(p => p.id === id);
  }

  confirmarPagamento(id: string, formaPagamento: string, parcelas?: number): void {
    const pedido = this.obterPedidoPorId(id);
    if (pedido) {
      pedido.formaPagamento = formaPagamento;
      pedido.parcelas = parcelas;
      pedido.status = 'Pagamento Confirmado';
    }
  }
}
