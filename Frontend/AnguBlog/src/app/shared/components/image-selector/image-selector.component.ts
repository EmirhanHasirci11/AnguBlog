import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImageService } from './image.service';
import { Observable, Subscription } from 'rxjs';
import { BlogImage } from './models/blog-image.model';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnDestroy, OnInit {
  selectImage(image: BlogImage) {
    this.service.selectImage(image)
  }
  private file?: File;
  fileName: string = '';
  title: string = '';
  imageServiceSub?: Subscription
  images$?: Observable<BlogImage[]>

  constructor(private service: ImageService) {

  }
  @ViewChild('form', { static: false }) imageUploadForm?: NgForm
  ngOnInit(): void {
    this.getImages()
  }
  ngOnDestroy(): void {
    this.imageServiceSub?.unsubscribe();
  }

  onUploadImage() {
    if (this.file && this.title !== '' && this.fileName !== '') {
      this.imageServiceSub = this.service.uploadImage(this.file, this.fileName, this.title).subscribe({
        next: (res) => {
          this.imageUploadForm?.resetForm();
          this.getImages()
        }
      })
    }
  }
  private getImages() {
    this.images$ = this.service.getAllImages();
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement
    this.file = element.files?.[0];
  }

}
