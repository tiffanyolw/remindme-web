import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from 'src/app/data/constants';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product?: Product;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _service: ProductService) {
    this._activatedRoute.paramMap.subscribe((params) => {
      this._service.getProductById(parseInt(params.get("id") || "")).subscribe((result) => {
        this.product = result;
      }, () => {
        // error
      });
    });
  }

  getUnit(quantity: number) {
    if (this.product?.unitId === Constants.NoUnitId) {
      return "";
    } else if (quantity === 1) {
      return this.product?.unit?.name;
    }
    return this.product?.unit?.pluralName || this.product?.unit?.name;
  }

  getConsumed(): string {
    let quantity = this.product?.quantityConsumed || 0;
    return `${quantity} ${this.getUnit(quantity)}`;
  }

  getTrashed() {
    let quantity = this.product?.quantityTrashed || 0;
    return `${quantity} ${this.getUnit(quantity)}`;
  }

  ngOnInit(): void {
  }

}
