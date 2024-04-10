import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { Observable, Subscription } from 'rxjs';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule, ImageSelectorComponent],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit, OnDestroy {
  closeImageSelector() {
    this.isImageSelectorVisible = false;
  }
  isImageSelectorVisible: boolean = false;
  openImageSelector() {
    this.isImageSelectorVisible = true;
  }
  model: AddBlogPost;
  categories$?: Observable<Category[]>;
  constructor(private service: BlogPostService,
    private router: Router,
    private catSer: CategoryService,
    private imageService: ImageService) {
    this.model = {
      title: '',
      shortDescription: '',
      content: '',
      urlHandle: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    }
  }
  ngOnDestroy(): void {
    this.imageSelectSub?.unsubscribe()
  }
  imageSelectSub?:Subscription
  ngOnInit(): void {
    this.categories$ = this.catSer.getAllCategories();
    this.imageSelectSub= this.imageService.onSelectImage().subscribe({next:(res)=>{
      if(this.model)
        this.model.featuredImageUrl=res.url
      this.isImageSelectorVisible=false;
    }})
  }
  onFormSubmit() {
    this.service.addBlogPost(this.model).subscribe({
      next: (res) => {
        this.router.navigateByUrl("/admin/blogposts");
        this.closeImageSelector()
      }
    });

  }
}
