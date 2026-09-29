import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService, Pedido } from '../pedido.service';

@Component({
  imports: [],
  selector: 'app-lista-pedidos',
  styleUrl: './lista-pedidos.component.css',
  templateUrl: './lista-pedidos.component.html',
})
export class ListaPedidosComponent {
  constructor(private pedidoService: PedidoService, private router: Router) {}

  /**
   * Obtém todos os pedidos registrados no PedidoService.
   */
  get pedidos(): Pedido[] {
    return this.pedidoService.obterPedidos();
  }

  /**
   * Formata um valor numérico para o padrão de moeda brasileiro (BRL).
   * @param valor Valor a ser formatado
   * @returns String formatada (ex: R$ 1.500,00)
   */
  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  /**
   * Redireciona o usuário para a tela de pagamento do pedido selecionado.
   * @param pedidoId ID do pedido
   */
  irParaPagamento(pedidoId: string) {
    this.router.navigate(['/pedido'], { queryParams: { id: pedidoId } });
  }
}

