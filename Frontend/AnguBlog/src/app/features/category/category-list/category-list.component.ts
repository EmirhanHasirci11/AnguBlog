import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories$?:Observable<Category[]>;
  deletePromise?:Subscription
  constructor(private categoryService:CategoryService){

  }
  ngOnDestroy(): void {
    this.deletePromise?.unsubscribe();
  }
  ngOnInit(): void {
    this.categories$= this.categoryService.getAllCategories();
    
  }
  onDelete(id:string){
    if(id){
      this.deletePromise= this.categoryService.deleteCategory(id).subscribe({
        next:(res)=>{
          this.categories$=this.categoryService.getAllCategories();
        }
      })
    }
  }

}
