import { Component, Injector, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/interfaces/category';
import { Location } from 'src/app/interfaces/location';
import { Order, Ordering } from 'src/app/interfaces/order';
import { DataLookupService } from 'src/app/services/data-lookup.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  selectedCategoryIds: number[] = [];
  selectedLocationIds: number[] = [];
  order: Order = {
    orderBy: "expiryDate",
    ordering: Ordering.ASC
  };

  selectedCategories: any[] = [];
  selectedLocations: any[] = [];

  categories: Category[] = [];
  locations: Location[] = [];

  constructor(public _activeModal: NgbActiveModal, private _injector: Injector, private _dataLookupService: DataLookupService) {
    this.selectedCategoryIds = this._injector.get<number[]>(<any>"categories");
    this.selectedLocationIds = this._injector.get<number[]>(<any>"locations");
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

    // only call API if no locations
    if (this._dataLookupService.locations.length > 0) {
      this.locations = this._dataLookupService.locations;
      this.getSelectedLocationData();
    } else {
      this._dataLookupService.getLocations().subscribe((result) => {
        this.locations = result;
        this.getSelectedLocationData();
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

  private getSelectedLocationData() {
    const locationIds: number[] = this.selectedLocationIds;
    this.locations.forEach((location) => {
      this.selectedLocations.push({
        id: location.id,
        name: location.name,
        isChecked: locationIds.includes(location.id)
      });
    });
    // all checked if no filters set
    if (locationIds.length === 0) {
      this.toggleAllLocations(true);
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

  toggleAllLocations(checked: boolean) {
    this.selectedLocations.forEach((location) => {
      location.isChecked = checked;
    });
  }

  reset() {
    this.toggleAllCategories(false);
    this.toggleAllLocations(false);
  }

  applyFilters() {
    let categoryIds: number[] = this.selectedCategories
      .filter(category => category.isChecked)
      .map(category => category.id);
    // no filters if all checked
    if (categoryIds.length === this.selectedCategories.length) {
      categoryIds = [];
    }
    let locationIds: number[] = this.selectedLocations
      .filter(location => location.isChecked)
      .map(location => location.id);
    // no filters if all checked
    if (locationIds.length === this.selectedLocations.length) {
      locationIds = [];
    }

    this._activeModal.close({
      categories: categoryIds,
      locations: locationIds,
      order: this.order
    });
  }

  ngOnInit(): void {
  }

}
