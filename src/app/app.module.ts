import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/account/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/account/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { InventoryComponent } from './components/main/inventory/inventory.component';
import { AddProductComponent } from './components/main/inventory/add-product/add-product.component';
import { EditProductComponent } from './components/main/inventory/edit-product/edit-product.component';
import { HistoryComponent } from './components/main/history/history.component';
import { ShoppingListComponent } from './components/main/shopping-list/shopping-list.component';
import { ConsumeModalComponent } from './components/main/inventory/modals/consume-modal/consume-modal.component';
import { TrashModalComponent } from './components/main/inventory/modals/trash-modal/trash-modal.component';
import { ProductFilterComponent } from './components/main/filters/product-filter/product-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InventoryComponent,
    AddProductComponent,
    EditProductComponent,
    HistoryComponent,
    ShoppingListComponent,
    ConsumeModalComponent,
    TrashModalComponent,
    ProductFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
