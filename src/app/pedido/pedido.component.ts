import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService, Pedido } from '../pedido.service';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-pedido',
  styleUrl: './pedido.component.css',
  templateUrl: './pedido.component.html',
})
export class PedidoComponent implements OnInit {
  pedido: Pedido | undefined;
  formaSelecionada: string = '';
  parcelas: number = 1;
  confirmado = false;
  erro = '';

  readonly formas = [
    { id: 'debito',   label: 'Débito',            icon: '💳', desc: 'Desconto de 5% no débito' },
    { id: 'credito',  label: 'Crédito à Vista',   icon: '💳', desc: 'Sem juros à vista' },
    { id: 'parcelado',label: 'Crédito Parcelado', icon: '📅', desc: 'Em até 12x com juros' },
    { id: 'boleto',   label: 'Boleto Bancário',   icon: '📄', desc: 'Vence em 3 dias úteis' },
    { id: 'pix',      label: 'Pix',               icon: '⚡', desc: 'Aprovação instantânea' },
  ];

  readonly opsParcelas = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private pedidoService: PedidoService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.pedido = this.pedidoService.obterPedidoPorId(id);
    }
    if (!this.pedido) {
      this.router.navigate(['/lista-pedidos']);
    }
  }

  get totalComDesconto(): number {
    if (!this.pedido) return 0;
    if (this.formaSelecionada === 'debito') return this.pedido.total * 0.95;
    return this.pedido.total;
  }

  get valorParcela(): number {
    if (!this.pedido || this.formaSelecionada !== 'parcelado' || this.parcelas < 2) return 0;
    const juros = 1 + (0.0199 * this.parcelas);
    return (this.pedido.total * juros) / this.parcelas;
  }

  selecionar(id: string) {
    this.formaSelecionada = id;
    this.erro = '';
    if (id !== 'parcelado') this.parcelas = 1;
  }

  confirmarPagamento() {
    if (!this.formaSelecionada) {
      this.erro = 'Selecione uma forma de pagamento para continuar.';
      return;
    }
    if (!this.pedido) return;

    const parcelas = this.formaSelecionada === 'parcelado' ? this.parcelas : undefined;
    this.pedidoService.confirmarPagamento(this.pedido.id, this.formaSelecionada, parcelas);
    this.confirmado = true;
    setTimeout(() => this.router.navigate(['/lista-pedidos']), 2500);
  }
}

