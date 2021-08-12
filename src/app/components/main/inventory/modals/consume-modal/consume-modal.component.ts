import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product, Status } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-consume-modal',
  templateUrl: './consume-modal.component.html',
  styleUrls: ['./consume-modal.component.css']
})
export class ConsumeModalComponent implements OnInit {
  @Input() product: Product | undefined;
  quantity: number = 0;

  constructor(public _activeModal: NgbActiveModal, private _service: ProductService) { }

  private update(status: Status, quantity: number) {
    if (this.product) {
      let body = this.product;
      body.status = status;
      body.quantityConsumed = this.product.quantityConsumed + quantity;
      body.quantity = this.product.quantity - quantity;

      this._service.updateProduct(this.product.id || 0, body).subscribe(() => {
        this._activeModal.dismiss();
      }, () => {
        // do something
      });
    }
  }

  onConsume() {
    if (this.quantity < 0) {
      return;
    } else if (this.product && this.quantity >= this.product.quantity) {
      this.update(Status.Consumed, this.product.quantity);
    } else if (this.product && this.quantity < this.product.quantity) {
      this.update(this.product.status, this.quantity);
    }
  }

  ngOnInit(): void {
  }

}
