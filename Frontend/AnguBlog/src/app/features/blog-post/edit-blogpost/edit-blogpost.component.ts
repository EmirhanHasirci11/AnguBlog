import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPost } from '../models/blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { EditBlogPost } from '../models/edit-blogpost.model';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownModule, ImageSelectorComponent],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  constructor(private blogService: BlogPostService, private catService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
  private imageService:ImageService) {

  }
  closeImageSelector() {
    this.isImageSelectorVisible = false;
  }
  isImageSelectorVisible: boolean = false;
  openImageSelector() {
    this.isImageSelectorVisible = true;
  }
  id: string | null = null;
  routeSub?: Subscription
  updateBlogSub?: Subscription
  getBlogSub?: Subscription
  imageSelectSub?: Subscription
  deleteBlogPostSub?: Subscription
  model?: BlogPost
  categories$?: Observable<Category[]>
  selectedCategories?: string[]
  
  onDelete(): void {
    if (this.id) {
      console.log(`inside of codeblock`);

      this.deleteBlogPostSub = this.blogService.deleteBlogPost(this.id).subscribe({
        next: (res) => {
          this.router.navigateByUrl("/admin/blogposts")
        }
      })
    }
  }
  onFormSubmit(): void {
    if (this.model && this.id) {
      var updatedBlog: EditBlogPost = {
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? []
      }
      this.blogService.editBlogpost(this.id, updatedBlog).subscribe({
        next: (res) => {
          this.router.navigateByUrl('/admin/blogposts')
        }
      })
    }
  }
  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.updateBlogSub?.unsubscribe();
    this.getBlogSub?.unsubscribe();
    this.deleteBlogPostSub?.unsubscribe();
    this.imageSelectSub?.unsubscribe();
  }


  ngOnInit(): void {
    this.categories$ = this.catService.getAllCategories();
    this.routeSub = this.route.paramMap.subscribe({
      next: (res) => {
        this.id = res.get('id');
        if (this.id) {
          this.getBlogSub = this.updateBlogSub = this.blogService.getById(this.id).subscribe({
            next: (response) => {
              this.selectedCategories = response.categories.map(x => x.id)
              this.model = response;
            }
          })
        }
      }
    })
   this.imageSelectSub= this.imageService.onSelectImage().subscribe({next:(res)=>{
      if(this.model)
        this.model.featuredImageUrl=res.url
      this.isImageSelectorVisible=false;
    }})
  }

}
