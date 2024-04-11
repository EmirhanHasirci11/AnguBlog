import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../../blog-post/services/blog-post.service';
import { BlogPost } from '../../blog-post/models/blog-post.model';
import { MarkdownComponent } from 'ngx-markdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [MarkdownComponent,CommonModule],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit,OnDestroy {
  url:string| null =null;
  routerSub?:Subscription
  blogPost$?:Observable<BlogPost>
constructor(private router:ActivatedRoute,private blogPostService:BlogPostService){

}
  ngOnDestroy(): void {
    this.routerSub?.unsubscribe()
  }
  ngOnInit(): void {
    this.routerSub= this.router.paramMap.subscribe({next:(res)=>{
      this.url=res.get('url')
    }})
    if(this.url){
      this.blogPost$= this.blogPostService.getByUrl(this.url)
    }
  }
}
