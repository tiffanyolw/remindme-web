import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { AddProductComponent } from './components/main/inventory/add-product/add-product.component';
import { EditProductComponent } from './components/main/inventory/edit-product/edit-product.component';
import { InventoryComponent } from './components/main/inventory/inventory.component';
import { AuthguardService } from './services/account/authguard.service';

const routes: Routes = [
  //{ path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "inventory", component: InventoryComponent, canActivate: [AuthguardService] },
  { path: "inventory/add-product", component: AddProductComponent, canActivate: [AuthguardService] },
  { path: "inventory/edit-product/:id", component: EditProductComponent, canActivate: [AuthguardService] },
  //{ path: "history", component: , canActivate: [AuthguardService] }
  //{ path: "history/view-product", component: , canActivate: [AuthguardService] }
  //{ path: "shopping-list", component: , canActivate: [AuthguardService] }
  //{ path: "shopping-list/add-item", component: , canActivate: [AuthguardService] }
  //{ path: "shopping-list/edit-item", component: , canActivate: [AuthguardService] }
  //{ path: "account/settings", component: , canActivate: [AuthguardService] }
  //{ path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
