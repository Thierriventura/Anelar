import { Routes } from '@angular/router';
import { Cadastro } from './cadastro/cadastro';
import { Cesta } from './cesta/cesta';
import { Detalhe } from './detalhe/detalhe';
import { ListaPedidos } from './lista-pedidos/lista-pedidos';
import { Login } from './login/login';
import { Pedido } from './pedido/pedido';
import { Reenvio } from './reenvio/reenvio';
import { ResultaBusca } from './resulta-busca/resulta-busca';
import { Vitrine } from './vitrine/vitrine';

export const routes: Routes = [
    {path:"cadastro", component:Cadastro},{path:"cesta", component:Cesta},
    {path:"detalhe", component:Detalhe}, {path:"lista-pedidos", component:ListaPedidos},
    {path:"login", component:Login}, {path:"pedido", component:Pedido},
    {path:"reenvio",component:Reenvio}, {path:"resultado-busca", component:ResultaBusca},
    {path:"vitrine",component:Vitrine}, {path:"", component:Vitrine}
];
