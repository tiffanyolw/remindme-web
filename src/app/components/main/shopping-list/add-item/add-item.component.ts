import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/data/constants';
import { Category } from 'src/app/interfaces/category';
import { ShoppingItem } from 'src/app/interfaces/shopping-item';
import { Unit } from 'src/app/interfaces/unit';
import { DataLookupService } from 'src/app/services/data-lookup.service';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  addItemForm: FormGroup;
  categories: Category[] = [];
  units: Unit[] = [];

  constructor(private _builder: FormBuilder, private _router: Router,
    private _shoppingService: ShoppingService, private _dataLookupService: DataLookupService) {

    this.addItemForm = this._builder.group({
      name: ["", [Validators.required]],
      quantity: [],
      unitId: [],
      categoryId: [Constants.NoCategoryId, [Validators.required]],
      price: [],
      storeName: [],
      notes: []
    });

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
  }

  onSubmit() {
    let form: ShoppingItem = this.addItemForm.value;
    form.bought = false;
    form.cleared = false;

    this._shoppingService.addItem(form).subscribe((result) => {
      this._router.navigate(["shopping-list"]);
    }, () => {
      // error
    });
  }

  ngOnInit(): void {
  }

}
