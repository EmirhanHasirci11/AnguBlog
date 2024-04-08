import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { editCategoryRequest } from '../models/edit-category-request.model';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSub?: Subscription
  category?: Category
  editPromise?:Subscription
  constructor(private router: ActivatedRoute, private service: CategoryService, private route: Router) {

  }
  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe()
    this.editPromise?.unsubscribe();
  }
  ngOnInit(): void {
    this.paramsSub = this.router.paramMap.subscribe({
      next: (params) => {
        this.id = params.get("id");

        if (this.id) {
          this.service.getById(this.id).subscribe({
            next: (response) => {
              this.category = response;
            }
          })
        }
      }
    })

  }
  onFormSubmit() {
    const editRequest: editCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    };
    if (this.id) {
     this.editPromise= this.service.editCategory(this.id, editRequest)
        .subscribe({
          next: (response) => {
            this.route.navigateByUrl('/Admin/Categories')
          }
        });
    }
  }

}
