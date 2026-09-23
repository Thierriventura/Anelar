import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  email = '';
  senha = '';
  erroLogin = '';
  tentativas = 0;

  constructor(private authService: AuthService, private router: Router) {}

  entrar() {
    this.erroLogin = '';

    if (!this.email || !this.senha) {
      this.erroLogin = 'Preencha o e-mail e a senha para continuar.';
      return;
    }

    const sucesso = this.authService.login(this.email.trim(), this.senha);
    if (sucesso) {
      this.router.navigate(['/vitrine']);
    } else {
      this.tentativas++;
      if (this.tentativas >= 3) {
        this.erroLogin = 'Muitas tentativas incorretas. Verifique seus dados ou recupere sua senha.';
      } else {
        this.erroLogin = 'E-mail ou senha incorretos. Verifique e tente novamente.';
      }
    }
  }
}
