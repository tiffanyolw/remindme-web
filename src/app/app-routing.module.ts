import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { HistoryComponent } from './components/main/history/history.component';
import { ViewProductComponent } from './components/main/history/view-product/view-product.component';
import { AddProductComponent } from './components/main/inventory/add-product/add-product.component';
import { EditProductComponent } from './components/main/inventory/edit-product/edit-product.component';
import { InventoryComponent } from './components/main/inventory/inventory.component';
import { ShoppingListComponent } from './components/main/shopping-list/shopping-list.component';
import { AuthguardService } from './services/account/authguard.service';

const routes: Routes = [
  { path: "", redirectTo: "inventory", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "inventory", component: InventoryComponent, canActivate: [AuthguardService] },
  { path: "inventory/add-product", component: AddProductComponent, canActivate: [AuthguardService] },
  { path: "inventory/edit-product/:id", component: EditProductComponent, canActivate: [AuthguardService] },
  { path: "history", component: HistoryComponent, canActivate: [AuthguardService] },
  { path: "history/view-product/:id", component: ViewProductComponent, canActivate: [AuthguardService] },
  { path: "shopping-list", component: ShoppingListComponent, canActivate: [AuthguardService] },
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
