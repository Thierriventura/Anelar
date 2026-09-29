import { Injectable, signal } from '@angular/core';

export interface Usuario {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  nascimento: string;
  telefone: string;
  cep: string;
  cidade: string;
  rua: string;
  numero: string;
  complemento?: string;
  iniciais: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarios: Usuario[] = [];
  private _usuarioLogado = signal<Usuario | null>(null);

  readonly usuarioLogado = this._usuarioLogado.asReadonly();

  /**
   * Cadastra um novo usuário no sistema adicionando-o à lista em memória.
   * @param usuario Objeto contendo os dados do usuário a ser cadastrado
   */
  cadastrar(usuario: Usuario): void {
    this.usuarios.push(usuario);
  }

  /**
   * Verifica se já existe algum usuário cadastrado com o email fornecido.
   * @param email Email a ser verificado
   * @returns true se o email já estiver cadastrado, false caso contrário
   */
  emailJaCadastrado(email: string): boolean {
    return this.usuarios.some(u => u.email.toLowerCase() === email.toLowerCase());
  }

  /**
   * Realiza o login do usuário verificando as credenciais.
   * Caso os dados estejam corretos, define o usuário como logado.
   * @param email Email do usuário
   * @param senha Senha do usuário
   * @returns true se o login for bem-sucedido, false se as credenciais forem inválidas
   */
  login(email: string, senha: string): boolean {
    const usuario = this.usuarios.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
    );
    if (usuario) {
      this._usuarioLogado.set(usuario);
      return true;
    }
    return false;
  }

  /**
   * Realiza o logout do usuário, removendo os dados de logado.
   */
  logout(): void {
    this._usuarioLogado.set(null);
  }

  /**
   * Retorna um valor booleano indicando se existe um usuário logado no momento.
   * @returns true se estiver logado, false caso contrário
   */
  get estaLogado(): boolean {
    return this._usuarioLogado() !== null;
  }
}

