import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CestaService, Produto } from '../cesta.service';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-vitrine',
  styleUrl: './vitrine.component.css',
  templateUrl: './vitrine.component.html',
})
export class VitrineComponent {
  produtos: Produto[] = [
    { id: 1, nome: 'Colar Gota de Esmeralda', desc: 'Ouro branco 18k e diamantes', preco: 5500, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBQSMeVA-Gdz-hFHJljuGW0d4fe7fyGwrWCXRDCqFMuXrknQhztRjDsIQ&s=10' },
    { id: 2, nome: 'Anel Solitário Imperial', desc: 'Ouro amarelo 18k, diamante 1ct', preco: 3800, img: 'https://images.tcdn.com.br/img/img_prod/1305187/anel_de_noivado_imperial_1199_1_cd59876e26f98f291f35a1051be67a7d.jpg' },
    { id: 3, nome: 'Pulseira Riviera', desc: 'Ouro branco 18k com safiras', preco: 4800, img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 4, nome: 'Brinco Argola Ouro', desc: 'Ouro amarelo 18k', preco: 1200, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 5, nome: 'Colar de Pérolas', desc: 'Pérolas de água doce', preco: 2500, img: 'https://images.unsplash.com/photo-1599643478524-fb66f70a00ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 6, nome: 'Anel de Prata com Rubi', desc: 'Prata 925, rubi natural', preco: 950, img: 'https://images.unsplash.com/photo-1605100804763-247f67963c9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 7, nome: 'Pulseira de Prata', desc: 'Prata 925', preco: 450, img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 8, nome: 'Brinco de Prata com Zircônia', desc: 'Prata 925, zircônia cúbica', preco: 350, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 9, nome: 'Colar de Ouro com Diamante', desc: 'Ouro branco 18k, diamante 0.5ct', preco: 7500, img: 'https://images.unsplash.com/photo-1599643478524-fb66f70a00ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 10, nome: 'Anel de Ouro com Esmeralda', desc: 'Ouro amarelo 18k, esmeralda natural', preco: 4200, img: 'https://images.unsplash.com/photo-1605100804763-247f67963c9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 11, nome: 'Pulseira de Ouro com Diamantes', desc: 'Ouro branco 18k, diamantes', preco: 8500, img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 12, nome: 'Brinco de Ouro com Rubi', desc: 'Ouro amarelo 18k, rubi natural', preco: 3200, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 13, nome: 'Colar de Prata com Safira', desc: 'Prata 925, safira natural', preco: 1800, img: 'https://images.unsplash.com/photo-1599643478524-fb66f70a00ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 14, nome: 'Anel de Prata com Diamante', desc: 'Prata 925, diamante 0.1ct', preco: 1500, img: 'https://images.unsplash.com/photo-1605100804763-247f67963c9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 15, nome: 'Pulseira de Couro com Ouro', desc: 'Couro natural, ouro 18k', preco: 2200, img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 16, nome: 'Brinco de Pérola', desc: 'Pérola de água salgada, ouro 18k', preco: 4500, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ];

  termoBusca = '';
  paginaAtual = 1;
  itensPorPagina = 6;

  constructor(private cestaService: CestaService) { }

  adicionarNaCesta(produto: Produto) {
    this.cestaService.adicionarItem(produto);
  }

  get produtosFiltrados() {
    return this.produtos.filter(p => p.nome.toLowerCase().includes(this.termoBusca.toLowerCase()));
  }

  aoMudarBusca() {
    this.paginaAtual = 1;
  }

  get totalPaginas() {
    return Math.ceil(this.produtosFiltrados.length / this.itensPorPagina);
  }

  get arrayPaginas() {
    return Array(this.totalPaginas).fill(0).map((x, i) => i + 1);
  }

  get produtosPaginados() {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.produtosFiltrados.slice(inicio, fim);
  }

  mudarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
    }
  }
}

