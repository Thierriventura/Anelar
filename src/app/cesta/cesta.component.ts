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

  /**
   * Retorna os itens atualmente presentes na cesta através do CestaService.
   */
  get itens(): Produto[] {
    return this.cestaService.obterItens();
  }

  /**
   * Retorna o valor total da cesta somando todos os itens.
   */
  get total(): number {
    return this.cestaService.obterTotal();
  }

  /**
   * Remove um item específico da cesta utilizando o seu ID.
   * @param produtoId ID do produto a ser removido
   */
  removerItem(produtoId: number) {
    this.cestaService.removerItem(produtoId);
  }

  /**
   * Finaliza o pedido com os itens atuais da cesta, limpa a cesta 
   * e redireciona o usuário para a lista de pedidos.
   */
  aprovarPedido() {
    this.pedidoService.aprovarPedido(this.itens, this.total);
    this.cestaService.limparCesta();
    this.router.navigate(['/lista-pedidos']);
  }
}

