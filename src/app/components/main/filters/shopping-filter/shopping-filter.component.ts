import { Component, Injector, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/interfaces/category';
import { Order, Ordering } from 'src/app/interfaces/order';
import { DataLookupService } from 'src/app/services/data-lookup.service';

@Component({
  selector: 'app-shopping-filter',
  templateUrl: './shopping-filter.component.html',
  styleUrls: ['./shopping-filter.component.css']
})
export class ShoppingFilterComponent implements OnInit {
  selectedCategoryIds: number[] = [];
  order: Order = {
    orderBy: "createdAt",
    ordering: Ordering.DESC
  };

  selectedCategories: any[] = [];
  categories: Category[] = [];

  constructor(public _activeModal: NgbActiveModal, private _injector: Injector, private _dataLookupService: DataLookupService) {
    this.selectedCategoryIds = this._injector.get<number[]>(<any>"categories");
    this.order = this._injector.get<Order>(<any>"order");

    // only call API if no categories
    if (this._dataLookupService.categories.length > 0) {
      this.categories = this._dataLookupService.categories;
      this.getSelectedCategoryData();
    } else {
      this._dataLookupService.getCategories().subscribe((result) => {
        this.categories = result;
        this.getSelectedCategoryData();
      }, () => {
        // error
      });
    }
  }

  private getSelectedCategoryData() {
    let categoryIds: number[] = this.selectedCategoryIds;
    this.categories.forEach((category) => {
      this.selectedCategories.push({
        id: category.id,
        name: category.name,
        isChecked: categoryIds.includes(category.id)
      });
    });
    // all checked if no filters set
    if (categoryIds.length === 0) {
      this.toggleAllCategories(true);
    }
  }

  isDescending() {
    return this.order.ordering === Ordering.DESC;
  }

  toggleOrdering() {
    if (this.order.ordering === Ordering.DESC) {
      this.order.ordering = Ordering.ASC;
    } else {
      this.order.ordering = Ordering.DESC;
    }
  }

  toggleAllCategories(checked: boolean) {
    this.selectedCategories.forEach((category) => {
      category.isChecked = checked;
    });
  }

  reset() {
    this.toggleAllCategories(false);
  }

  applyFilters() {
    let categoryIds: number[] = this.selectedCategories
      .filter(category => category.isChecked)
      .map(category => category.id);
    // no filters if all checked
    if (categoryIds.length === this.selectedCategories.length) {
      categoryIds = [];
    }

    this._activeModal.close({
      categories: categoryIds,
      order: this.order
    });
  }

  ngOnInit(): void {
  }

}
