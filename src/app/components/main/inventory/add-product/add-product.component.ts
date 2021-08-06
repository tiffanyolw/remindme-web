import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/data/constants';
import { Category } from 'src/app/interfaces/category';
import { Location } from 'src/app/interfaces/location';
import { Product, Status } from 'src/app/interfaces/product';
import { Unit } from 'src/app/interfaces/unit';
import { DataLookupService } from 'src/app/services/data-lookup.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  categories: Category[] = [];
  locations: Location[] = [];
  units: Unit[] = [];

  // alerts
  showGetError: boolean = false;
  showCouldNotAddError: boolean  = false;

  constructor(private _builder: FormBuilder, private _router: Router,
    private _productService: ProductService, private _dataLookupService: DataLookupService) {
    
      this.addProductForm = this._builder.group({
      name: ["", [Validators.required]],
      quantity: [1, [Validators.required]],
      unitId: [Constants.NoUnitId, [Validators.required]],
      purchaseDate: [],
      expiryDate: [],
      categoryId: [Constants.NoCategoryId, [Validators.required]],
      locationStoredId: [Constants.NoLocationId, [Validators.required]],
      notes: []
    });

    // only call API if no categories
    if (this._dataLookupService.categories.length > 0) {
      this.categories = this._dataLookupService.categories;
    } else {
      this._dataLookupService.getCategories().subscribe((result) => {
        this.categories = result;
      }, () => {
        this.showGetError = true;
      });
    }

    // only call API if no locations
    if (this._dataLookupService.locations.length > 0) {
      this.locations = this._dataLookupService.locations;
    } else {
      this._dataLookupService.getLocations().subscribe((result) => {
        this.locations = result;
      }, () => {
        this.showGetError = true;
      });
    }

    // only call API if no units
    if (this._dataLookupService.units.length > 0) {
      this.units = this._dataLookupService.units;
    } else {
      this._dataLookupService.getUnits().subscribe((result) => {
        this.units = result;
      }, () => {
        this.showGetError = true;
      });
    }
  }

  onSubmit() {
    let form: Product = this.addProductForm.value;
    form.status = Status.Ready;
    form.quantityConsumed = 0;
    form.quantityTrashed = 0;
    form.onExpiryNotify = false;
    form.purchaseDate = form.purchaseDate ? new Date(form.purchaseDate) : undefined;
    form.expiryDate = form.expiryDate ? new Date(form.expiryDate) : undefined;

    this._productService.addProduct(form).subscribe(() => {
      this._router.navigate(["inventory"]);
    }, () => {
      this.showCouldNotAddError = true;
    });
  }

  ngOnInit(): void {
  }

}
