import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-creation',
  templateUrl: './image-creation.component.html',
  styleUrls: ['./image-creation.component.scss']
})
export class ImageCreationComponent {
  @Output() selectedImagesEmit = new EventEmitter<File[]>();
  @Output() imageRemovedIndex = new EventEmitter<number>();
  @Output() message = new EventEmitter<string>();
  @Input() imagePreviews: string[] = [];
  selectedImages: File[] = [];
  tracker: number = 0;



  onImagesSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    let files = element.files;
    if (files && files.length <= 10 && (this.imagePreviews.length + files.length) <= 10) {
      this.selectedImages.push(...Array.from(files));
      this.selectedImagesEmit.emit(this.selectedImages);
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    } else {
      this.message.emit("A maximum of 10 images allowed!");
    }
  }

  removeImage(index: number): void {
    if (index >= 0 && index < this.imagePreviews.length) {
      this.imagePreviews.splice(index, 1);
      this.selectedImages.splice(index, 1);
      this.imageRemovedIndex.emit(index);
    }
  }
}