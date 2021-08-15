import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { ShoppingItem } from 'src/app/interfaces/shopping-item';
import { Unit } from 'src/app/interfaces/unit';
import { DataLookupService } from 'src/app/services/data-lookup.service';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  item?: ShoppingItem;
  updateItemForm?: FormGroup;
  categories: Category[] = [];
  units: Unit[] = [];

  constructor(private _activatedRoute: ActivatedRoute, private _builder: FormBuilder, private _router: Router,
    private _service: ShoppingService, private _dataLookupService: DataLookupService) {
    // only call API if no categories
    if (this._dataLookupService.categories.length > 0) {
      this.categories = this._dataLookupService.categories;
    } else {
      this._dataLookupService.getCategories().subscribe((result) => {
        this.categories = result;
      }, () => {
        // error
      });
    }

    // only call API if no units
    if (this._dataLookupService.units.length > 0) {
      this.units = this._dataLookupService.units;
    } else {
      this._dataLookupService.getUnits().subscribe((result) => {
        this.units = result;
      }, () => {
        // error
      });
    }

    this._activatedRoute.paramMap.subscribe((params) => {
      this._service.getItemById(parseInt(params.get("id") || "")).subscribe((result) => {
        this.item = result;

        this.updateItemForm = this._builder.group({
          name: [this.item.name, [Validators.required]],
          quantity: [this.item.quantity],
          unitId: [this.item.unitId],
          categoryId: [this.item.categoryId, [Validators.required]],
          price: [this.item.price],
          storeName: [this.item.storeName],
          notes: [this.item.notes]
        });
      }, () => {
        // error
      });
    });
  }

  onUpdate() {
    let body = this.updateItemForm?.value;
    body.cleared = this.item?.cleared || false;
    body.bought = this.item?.bought || false;

    this._service.updateItems(this.item?.id || 0, body).subscribe((result) => {
      this._router.navigate(["shopping-list"]);
    }, () => {
      // error
    });
  }

  ngOnInit(): void {
  }

}
