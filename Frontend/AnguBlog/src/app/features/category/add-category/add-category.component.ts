import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddCategoryRequest  } from '../models/add-category-request.model';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})

export class AddCategoryComponent {

  model:AddCategoryRequest

  constructor(){

    this.model={
      name:'Emirhan',
      urlHandle:''
    }  
  }
  clickBtn(){
    console.log(this.model.name);

    console.log(this.model.urlHandle);
  }
  onFormSubmit() {

  }
}
