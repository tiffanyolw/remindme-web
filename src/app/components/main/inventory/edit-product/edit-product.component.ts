import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Location } from 'src/app/interfaces/location';
import { Product, Status } from 'src/app/interfaces/product';
import { Unit } from 'src/app/interfaces/unit';
import { DataLookupService } from 'src/app/services/data-lookup.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product?: Product;
  updateProductForm?: FormGroup;
  categories: Category[] = [];
  locations: Location[] = [];
  units: Unit[] = [];

  // alerts
  showGetError: boolean = false;
  showCouldNotUpdateError: boolean = false;

  constructor(private _activatedRoute: ActivatedRoute, private _builder: FormBuilder, private _router: Router,
    private _service: ProductService, private _dataLookupService: DataLookupService) {
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

    this._activatedRoute.paramMap.subscribe((params) => {
      this._service.getProductById(parseInt(params.get("id") || "")).subscribe((result) => {
        this.product = result;

        this.updateProductForm = this._builder.group({
          name: [this.product.name, [Validators.required]],
          quantity: [this.product.quantity, [Validators.required]],
          unitId: [this.product.unitId, [Validators.required]],
          purchaseDate: [this.product.purchaseDate ? new Date(this.product.purchaseDate).toISOString().slice(0, 10) : undefined],
          expiryDate: [this.product.expiryDate ? new Date(this.product.expiryDate).toISOString().slice(0, 10) : undefined],
          categoryId: [this.product.categoryId, [Validators.required]],
          locationStoredId: [this.product.locationStoredId, [Validators.required]],
          notes: [this.product.notes]
        });
      }, () => {
        this.showGetError = true;
      });
    });
  }

  onUpdate() {
    let data: Product = this.updateProductForm?.value;
    data.status = this.product?.status || Status.Ready;
    data.quantityConsumed = this.product?.quantityConsumed || 0;
    data.quantityTrashed = this.product?.quantityTrashed || 0;
    data.onExpiryNotify = this.product?.onExpiryNotify || false;
    data.daysBeforeNotify = this.product?.daysBeforeNotify;
    data.daysAfterNotify = this.product?.daysAfterNotify;
    
    data.expiryDate = data?.expiryDate ? new Date(data.expiryDate) : undefined;
    data.purchaseDate = data?.purchaseDate ? new Date(data.purchaseDate) : undefined;

    this._service.updateProduct((this.product?.id || 0), data).subscribe(() => {
      this._router.navigate(["inventory"]);
    }, () => {
      this.showCouldNotUpdateError = true;
    });
  }

  ngOnInit(): void {
  }

}
