import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/core/model/Order';
import { Person } from 'src/app/core/model/Person';
import { OrderService } from 'src/app/core/services/order.service';
import { PersonService } from 'src/app/core/services/person.service';

@Component({
  selector: 'app-dialog-checkout',
  templateUrl: './dialog-checkout.component.html',
  styleUrls: ['./dialog-checkout.component.scss']
})
export class DialogCheckoutComponent implements OnInit {

  public person: Person = {};
  public form: FormGroup;
  public controlArea: FormControl = new FormControl();
  public order: Order;

  public loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogCheckoutComponent>,
    private orderService: OrderService,
    private personService: PersonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.getPersonalInformation();
    this.initForm();
    this.setInformationForm();
  }

  private setInformationForm() {
    this.form.get('name').setValue(this.person.name);
    this.form.get('lastname').setValue(this.person.lastname);
    this.form.get('email').setValue(this.person.email);
    this.form.get('phone').setValue(this.person.phone);
    this.form.get('document').setValue(this.person.document);
  }

  get f() { return this.form.controls; }
  private initForm() {
    this.form = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.maxLength(40),
      Validators.pattern(/^[^0-9]{1,40}$/)]),
      'lastname': new FormControl('', [Validators.required, Validators.maxLength(40),
      Validators.pattern(/^[^0-9]{1,40}$/)]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl('', Validators.required),
      'document': new FormControl('', Validators.required),
    });
  }

  keyPressMobil($event, flag) {
    const textInput = $event.target.value.toString();
    const text = textInput.replace(/[^a-zA-ZÀ-ÿ\u00f1\u00d1\u0020\u0027]/g, '');
    if (flag == 'name') {
      this.form.patchValue({ name: text });
    } else if (flag = 'lastname') {
      this.form.patchValue({ lastname: text });
    }

  }

  public async sendOrder() {
    if (this.form.invalid) return;
    if (!this.loading) {
      this.loading = true;
      this.person = this.form.value;
      this.order = { user: this.person, order_details: this.factoryOrderDetails() }
      this.savePersonalInformation();
      await this.orderService.sendOrder(this.order);
      this.dialogRef.close();
    }
  }

  private factoryOrderDetails() {
    const order_details = [];
    this.data.forEach(item => {
      order_details.push({
        productId: item.product.id,
        quantity: item.quantity,
        productName: item.product.name,
        productPrice: item.product.price
      });
    });
    return order_details;
  }


  private savePersonalInformation() {
    this.personService.savePersonalInformation(this.person);
  }

  private getPersonalInformation() {
    this.person = this.personService.getPersonalInformation();
  }
}
