import { Component, Injector, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from 'src/app/data/constants';
import { Order, Ordering } from 'src/app/interfaces/order';
import { ShoppingItem } from 'src/app/interfaces/shopping-item';
import { ShoppingService } from 'src/app/services/shopping.service';
import { ShoppingFilterComponent } from '../filters/shopping-filter/shopping-filter.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingList?: ShoppingItem[];
  clearedItems?: ShoppingItem[];
  selectedList: string = "tobuy";

  // filtered selections
  categories: number[] = [];
  stores: string[] = [];
  isBought?: boolean = undefined;
  order: Order = {
    orderBy: "createdAt",
    ordering: Ordering.DESC
  }

  constructor(private _service: ShoppingService, private _modal: NgbModal) {
    this.loadAll();
  }

  private loadAll() {
    this._service.getItems(this.isBought, false, this.categories, this.stores, this.order)
      .subscribe((result) => {
        this.shoppingList = result;
      }, () => {
        // error
      });

    this._service.getItems(this.isBought, true, this.categories, this.stores, this.order)
      .subscribe((result) => {
        this.clearedItems = result;
      }, () => {
        // error
      });
  }

  toggleStatus(item: ShoppingItem) {
    this._service.updateItems(item.id || 0, item).subscribe(() => { },
      () => {
        // error
      });
  }

  presentFilter() {
    const modalRef = this._modal.open(ShoppingFilterComponent, {
      injector: Injector.create({
        providers: [
          { provide: "categories", useValue: this.categories },
          { provide: "order", useValue: this.order },
        ]
      })
    });
    modalRef.result.then((result) => {
      if (result) {
        this.categories = result.categories;
        this.order = result.order;
      }
      this.loadAll();
    }, () => {
      // modal dismissed
    });
  }

  getList(): ShoppingItem[] {
    if (this.selectedList === "tobuy") {
      return this.shoppingList || [];
    } else if (this.selectedList === "archive") {
      return this.clearedItems || [];
    }
    return [];
  }

  getQuantity(item: ShoppingItem): string {
    let str = item.quantity;
    if (item.unitId === Constants.NoUnitId) {
      return str + "";
    } else if (item.quantity === 1) {
      return `${str} ${item.itemUnit?.name}`;
    }
    return `${str} ${(item.itemUnit?.pluralName || item.itemUnit?.name)}`;
  }

  onDelete(item: ShoppingItem) {
    this._service.deleteItems(item.id || 0).subscribe(() => {
      this.loadAll();
    }, () => {
      // error
    });
  }

  clearList() {
    this.shoppingList?.forEach((item) => {
      if (item.id) {
        item.cleared = true;
        this._service.updateItems(item.id, item)
          .subscribe(() => {
            this.loadAll();
          }, () => {
            // error
          });
      }
    });
  }

  ngOnInit(): void {
  }

}
