import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageService } from './image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnDestroy {
  private file?: File;
  fileName: string = '';
  title: string = '';
  imageServiceSub?:Subscription
  
  constructor(private service:ImageService){

  }
  ngOnDestroy(): void {
    this.imageServiceSub?.unsubscribe();
  }
  
  onUploadImage() {
    if(this.file && this.title !== '' && this.fileName !== ''){
      this.imageServiceSub=this.service.uploadImage(this.file,this.fileName,this.title).subscribe({next:(res)=>{
        console.log(Response);
        
      }})
    }
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement
    this.file = element.files?.[0];
  }

}
