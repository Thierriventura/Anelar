import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-cadastro',
  styleUrl: './cadastro.component.css',
  templateUrl: './cadastro.component.html',
})
export class CadastroComponent {
  nome = '';
  cpf = '';
  nascimento = '';
  email = '';
  telefone = '';
  cep = '';
  cidade = '';
  rua = '';
  numero = '';
  complemento = '';
  senha = '';
  confirmaSenha = '';

  erros: Record<string, string> = {};
  sucesso = false;

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Gera as iniciais do usuário com base no nome completo fornecido.
   * Exemplo: "João Silva" -> "JS"
   * @param nome Nome completo do usuário
   * @returns String contendo as iniciais em maiúsculo
   */
  private gerarIniciais(nome: string): string {
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
    return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
  }

  /**
   * Valida se o CPF informado é válido através do cálculo de dígitos verificadores.
   * @param cpf String contendo o CPF, com ou sem máscara
   * @returns true se o CPF for válido, false caso contrário
   */
  private validarCPF(cpf: string): boolean {
    const numeros = cpf.replace(/\D/g, '');
    if (numeros.length !== 11 || /^(\d)\1+$/.test(numeros)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(numeros[i]) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(numeros[9])) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(numeros[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(numeros[10]);
  }

  /**
   * Realiza a validação de todos os campos do formulário de cadastro.
   * Popula o objeto 'erros' com mensagens apropriadas caso as validações falhem.
   * @returns true se todos os campos estiverem válidos, false caso haja algum erro
   */
  private validarCampos(): boolean {
    this.erros = {};

    if (!this.nome.trim() || this.nome.trim().split(' ').length < 2)
      this.erros['nome'] = 'Informe seu nome completo (nome e sobrenome).';

    if (!this.validarCPF(this.cpf))
      this.erros['cpf'] = 'CPF inválido. Verifique o número informado.';

    if (!this.nascimento)
      this.erros['nascimento'] = 'Informe sua data de nascimento.';
    else {
      const nasc = new Date(this.nascimento);
      const hoje = new Date();
      const idade = hoje.getFullYear() - nasc.getFullYear();
      if (idade < 18) this.erros['nascimento'] = 'É necessário ter ao menos 18 anos.';
    }

    if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
      this.erros['email'] = 'Informe um e-mail válido.';
    else if (this.authService.emailJaCadastrado(this.email))
      this.erros['email'] = 'Este e-mail já está cadastrado.';

    if (!this.telefone || this.telefone.replace(/\D/g, '').length < 10)
      this.erros['telefone'] = 'Informe um telefone válido com DDD.';

    if (!this.cep || this.cep.replace(/\D/g, '').length !== 8)
      this.erros['cep'] = 'Informe um CEP válido com 8 dígitos.';

    if (!this.cidade.trim())
      this.erros['cidade'] = 'Informe a cidade e estado.';

    if (!this.rua.trim())
      this.erros['rua'] = 'Informe o logradouro.';

    if (!this.numero.trim())
      this.erros['numero'] = 'Informe o número.';

    if (!this.senha || this.senha.length < 8)
      this.erros['senha'] = 'A senha deve ter ao menos 8 caracteres.';

    if (this.senha !== this.confirmaSenha)
      this.erros['confirmaSenha'] = 'As senhas não coincidem.';

    return Object.keys(this.erros).length === 0;
  }

  /**
   * Valida os campos preenchidos e conclui o cadastro salvando os dados
   * no AuthService, em seguida exibe mensagem de sucesso e redireciona para o login.
   */
  concluirCadastro() {
    if (!this.validarCampos()) return;

    this.authService.cadastrar({
      nome: this.nome.trim(),
      email: this.email.trim(),
      senha: this.senha,
      cpf: this.cpf,
      nascimento: this.nascimento,
      telefone: this.telefone,
      cep: this.cep,
      cidade: this.cidade,
      rua: this.rua,
      numero: this.numero,
      complemento: this.complemento,
      iniciais: this.gerarIniciais(this.nome)
    });

    this.sucesso = true;
    setTimeout(() => this.router.navigate(['/login']), 2000);
  }
}

