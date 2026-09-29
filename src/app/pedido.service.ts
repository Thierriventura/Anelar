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

  /**
   * Cria um novo pedido com os itens informados, definindo o status inicial como 'Aguardando Pagamento'.
   * @param itens Lista de produtos que compõem o pedido
   * @param total Valor total do pedido
   * @returns O objeto do pedido criado
   */
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

  /**
   * Retorna a lista de todos os pedidos realizados.
   * @returns Array contendo os pedidos
   */
  obterPedidos(): Pedido[] {
    return this._pedidos();
  }

  /**
   * Busca um pedido específico pelo seu identificador único.
   * @param id Identificador único do pedido (ex: '#10024')
   * @returns O pedido encontrado ou undefined caso não exista
   */
  obterPedidoPorId(id: string): Pedido | undefined {
    return this._pedidos().find(p => p.id === id);
  }

  /**
   * Atualiza os dados de pagamento de um pedido e altera seu status para 'Pagamento Confirmado'.
   * @param id Identificador do pedido
   * @param formaPagamento Forma escolhida para pagamento
   * @param parcelas Quantidade de parcelas (opcional)
   */
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

