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

  get pedidos(): Pedido[] {
    return this.pedidoService.obterPedidos();
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  irParaPagamento(pedidoId: string) {
    this.router.navigate(['/pedido'], { queryParams: { id: pedidoId } });
  }
}

