import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  Categories?:Category[];
  constructor(private categoryService:CategoryService){

  }
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe({next:(response)=>{
      this.Categories=response;
    }})
  }

}
