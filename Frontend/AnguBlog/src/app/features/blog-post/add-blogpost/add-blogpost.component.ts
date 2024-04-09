import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit {
  model: AddBlogPost;
  categories$?:Observable<Category[]>;
  constructor(private service:BlogPostService,private router:Router,private catSer:CategoryService) {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      urlHandle: '',
      featuredImageUrl: '',
      author: '',
      isVisible:true,
      publishedDate: new Date(),
      categories:[]
    }
  }
  ngOnInit(): void {
    this.categories$=this.catSer.getAllCategories();
  }
  onFormSubmit(){
    this.service.addBlogPost(this.model).subscribe({
      next:(res)=>{
        this.router.navigateByUrl("/admin/blogposts");
      }
    });
    
  }
}
