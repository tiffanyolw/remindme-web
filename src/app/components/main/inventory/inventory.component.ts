import { Component, Injector, OnInit } from '@angular/core';
import { Constants } from 'src/app/data/constants';
import { Order, Ordering } from 'src/app/interfaces/order';
import { Product, Status } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConsumeModalComponent } from './modals/consume-modal/consume-modal.component';
import { TrashModalComponent } from './modals/trash-modal/trash-modal.component';
import { ProductFilterComponent } from '../filters/product-filter/product-filter.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  allProducts?: Product[];
  productsList?: Product[];
  expiredList?: Product[];
  selectedList: string = "all";

  // filtered selections
  categories: number[] = [];
  locations: number[] = [];
  order: Order = {
    orderBy: "expiryDate",
    ordering: Ordering.ASC
  };

  // error alert
  showErrorAlert: boolean = false;
  showDeleteError: boolean = false;

  constructor(private _service: ProductService, private _modal: NgbModal) {
    this.loadAll();
  }

  private loadAll() {
    this._service.getProducts(Status.Ready, undefined, this.categories, this.locations, this.order)
      .subscribe((result) => {
        this.allProducts = result;
      }, () => {
        this.showErrorAlert = true;
        this.allProducts = [];
      });

    this._service.getProducts(Status.Ready, false, this.categories, this.locations, this.order)
      .subscribe((result) => {
        this.productsList = result;
      }, () => {
        this.showErrorAlert = true;
        this.productsList = [];
      });

    this._service.getProducts(Status.Ready, true, this.categories, this.locations, this.order)
      .subscribe((result) => {
        this.expiredList = result;
      }, () => {
        this.showErrorAlert = true;
        this.expiredList = [];
      });
  }

  getList(): Product[] {
    if (this.selectedList === "all") {
      return this.allProducts || [];
    } else if (this.selectedList === "products") {
      return this.productsList || [];
    } else if (this.selectedList === "expired") {
      return this.expiredList || [];
    }
    return [];
  }

  getQuantity(product: Product): string {
    let str = product.quantity;
    if (product.unitId === Constants.NoUnitId) {
      return str + "";
    } else if (product.quantity === 1) {
      return `${str} ${product.unit?.name}`;
    }
    return `${str} ${(product.unit?.pluralName || product.unit?.name)}`;
  }

  onDelete(product: Product) {
    this._service.deleteProduct(product.id || 0).subscribe(() => {
      this.loadAll();
      this.showDeleteError = false;
    }, () => {
      this.showDeleteError = true;
    });
  }

  openConsumeModal(product: Product) {
    const modalRef = this._modal.open(ConsumeModalComponent);
    modalRef.componentInstance.product = product;
  }

  openTrashModal(product: Product) {
    const modalRef = this._modal.open(TrashModalComponent);
    modalRef.componentInstance.product = product;
  }

  presentFilter() {
    const modalRef = this._modal.open(ProductFilterComponent, {
      injector: Injector.create({
        providers: [
          { provide: "categories", useValue: this.categories },
          { provide: "locations", useValue: this.locations },
          { provide: "order", useValue: this.order },
        ]
      })
    });
    modalRef.result.then((result) => {
      if (result) {
        this.categories = result.categories;
        this.locations = result.locations;
        this.order = result.order;
      }
      this.loadAll();
    }, () => {
      // modal dismissed
    });
  }

  ngOnInit(): void {
  }

}
