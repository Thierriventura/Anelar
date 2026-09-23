import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CestaService, Produto } from '../cesta.service';
import { PedidoService } from '../pedido.service';

@Component({
  imports: [CommonModule],
  selector: 'app-cesta',
  styleUrl: './cesta.component.css',
  templateUrl: './cesta.component.html',
})
export class CestaComponent {
  constructor(
    private cestaService: CestaService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  get itens(): Produto[] {
    return this.cestaService.obterItens();
  }

  get total(): number {
    return this.cestaService.obterTotal();
  }

  removerItem(produtoId: number) {
    this.cestaService.removerItem(produtoId);
  }

  aprovarPedido() {
    this.pedidoService.aprovarPedido(this.itens, this.total);
    this.cestaService.limparCesta();
    this.router.navigate(['/lista-pedidos']);
  }
}

