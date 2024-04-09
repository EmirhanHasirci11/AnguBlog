import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent {
  model: AddBlogPost;
  constructor(private service:BlogPostService,private router:Router) {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      urlHandle: '',
      featuredImageUrl: '',
      author: '',
      isVisible:true,
      publishedDate: new Date()
    }
  }
  onFormSubmit(){
    this.service.addBlogPost(this.model).subscribe({
      next:(res)=>{
        this.router.navigateByUrl("/admin/blogposts");
      }
    });
    
  }
}
