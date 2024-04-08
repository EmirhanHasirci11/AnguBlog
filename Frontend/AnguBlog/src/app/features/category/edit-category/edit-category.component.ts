import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit,OnDestroy {

  id:string|null=null;
  paramsSub?:Subscription
  constructor(private router:ActivatedRoute) {
    
  }
  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe()
  }
  ngOnInit(): void {
   this.paramsSub= this.router.paramMap.subscribe({
      next:(params)=>{
        this.id=params.get("id");
      }
    })
  }

}
