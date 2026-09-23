import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CestaComponent } from './cesta/cesta.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { ListaPedidosComponent } from './lista-pedidos/lista-pedidos.component';
import { LoginComponent } from './login/login.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ReenvioComponent } from './reenvio/reenvio.component';
import { ResultaBuscaComponent } from './resulta-busca/resulta-busca.component';
import { VitrineComponent } from './vitrine/vitrine.component';

export const routes: Routes = [
    {path:"cadastro", component:CadastroComponent},
    {path:"cesta", component:CestaComponent},
    {path:"detalhe", component:DetalheComponent}, 
    {path:"lista-pedidos", component:ListaPedidosComponent},
    {path:"login", component:LoginComponent}, 
    {path:"pedido", component:PedidoComponent},
    {path:"reenvio",component:ReenvioComponent}, 
    {path:"resultado-busca", component:ResultaBuscaComponent},
    {path:"vitrine",component:VitrineComponent}, 
    {path:"", component:VitrineComponent}
];
