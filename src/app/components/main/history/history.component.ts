import { Component, Injector, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from 'src/app/data/constants';
import { Order, Ordering } from 'src/app/interfaces/order';
import { Product, Status } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductFilterComponent } from '../filters/product-filter/product-filter.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  productsList: Product[] | undefined;

  // filtered selections
  categories: number[] = [];
  locations: number[] = [];
  order: Order = {
    orderBy: "expiryDate",
    ordering: Ordering.ASC
  };


  constructor(private _service: ProductService, private _modalService: NgbModal) {
    this.loadAll();
  }

  private loadAll() {
    this._service.getProducts([Status.Consumed, Status.Trashed], undefined, this.categories, this.locations, this.order)
      .subscribe((result) => {
        this.productsList = result;
      }, () => {
        // error
      });
  }

  presentFilter() {
    const modalRef = this._modalService.open(ProductFilterComponent, {
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

  getUnit(product: Product, quantity: number) {
    if (product.unitId === Constants.NoUnitId) {
      return "";
    } else if (quantity === 1) {
      return product.unit?.name;
    }
    return product.unit?.pluralName || product.unit?.name;
  }

  getConsumed(product: Product): string {
    let quantity = product.quantityConsumed;
    return `${quantity} ${this.getUnit(product, quantity)}`;
  }

  getTrashed(product: Product) {
    let quantity = product.quantityTrashed;
    return `${quantity} ${this.getUnit(product, quantity)}`;
  }

  onDelete(product: Product) {
    this._service.deleteProduct(product.id || 0).subscribe(() => {
      this.loadAll();
    }, () => {
      // error
    });
  }

  ngOnInit(): void {
  }

}
