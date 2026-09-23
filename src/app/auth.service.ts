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

  cadastrar(usuario: Usuario): void {
    this.usuarios.push(usuario);
  }

  emailJaCadastrado(email: string): boolean {
    return this.usuarios.some(u => u.email.toLowerCase() === email.toLowerCase());
  }

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

  logout(): void {
    this._usuarioLogado.set(null);
  }

  get estaLogado(): boolean {
    return this._usuarioLogado() !== null;
  }
}
