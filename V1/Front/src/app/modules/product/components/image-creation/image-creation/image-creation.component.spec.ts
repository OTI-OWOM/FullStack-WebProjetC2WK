import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageCreationComponent } from './image-creation.component';
import { By } from '@angular/platform-browser';

describe('ImageCreationComponent', () => {
  let component: ImageCreationComponent;
  let fixture: ComponentFixture<ImageCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle image file selection and emit selected images', () => {
    const file = new File([''], 'filename', { type: 'image/jpeg' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
  
    const event = new Event('change', { bubbles: true });
    Object.defineProperty(event, 'target', { writable: false, value: { files: dataTransfer.files } });
  
    spyOn(component.selectedImagesEmit, 'emit');
  
    // Mock FileReader's use within the component
    const mockFileReaderInstance = {
      readAsDataURL: function() {},
      onload: null as any,
      result: 'data:image/jpeg;base64,'
    };
    spyOn(window, 'FileReader').and.returnValue(mockFileReaderInstance as any);
    spyOn(mockFileReaderInstance, 'readAsDataURL').and.callFake(function(this: typeof mockFileReaderInstance) {
      if (this.onload) {
        const progressEvent = new ProgressEvent('load');
        // Simulate the setting of the result property before onload is called
        Object.defineProperty(progressEvent, 'target', {
          writable: false,
          value: { result: 'data:image/jpeg;base64,example' }
        });
        this.onload(progressEvent);
      }
    });
  
    component.onImagesSelected(event as any);
  
    expect(component.selectedImagesEmit.emit).toHaveBeenCalledWith([file]);
    expect(component.imagePreviews.length).toEqual(1);  // Assuming FileReader's onload has been simulated
  });
  
  it('should emit an error message when trying to add more than 10 images', () => {
    // Assume there are already 10 images
    component.imagePreviews = new Array(10).fill('dummy_data_url');
    fixture.detectChanges();
  
    // Check that the file input is correctly hidden
    const inputElement = fixture.debugElement.query(By.css('input[type="file"]'));
    expect(inputElement).toBeNull();
  
    // Simulate the condition of trying to add another image
    if (!inputElement) {
      spyOn(component.message, 'emit');
  
      // Since the input is not present, we simulate the condition that would lead to an error
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(new File([], 'test.jpg', { type: 'image/jpeg' }));
      const event = new Event('change', { bubbles: true });
      Object.defineProperty(event, 'target', { value: { files: dataTransfer.files }, enumerable: true });
  
      component.onImagesSelected(event as any);
      fixture.detectChanges();
  
      expect(component.message.emit).toHaveBeenCalledWith("A maximum of 10 images allowed!");
    } else {
      fail("Input field for adding images is still present when it should not be.");
    }
  });
  
  it('should remove an image and emit the index of the removed image', () => {
    component.imagePreviews = ['data:image/jpeg;base64,example1', 'data:image/jpeg;base64,example2'];
    component.selectedImages = [new File([], 'image1.jpg'), new File([], 'image2.jpg')];
  
    expect(component.imagePreviews.length).toBe(2);  // Initial condition
    expect(component.selectedImages.length).toBe(2); // Initial condition
  
    spyOn(component.imageRemovedIndex, 'emit');
  
    component.removeImage(0);  // Attempt to remove the first image
    fixture.detectChanges();
  
    expect(component.imagePreviews.length).toBe(1, 'imagePreviews length should decrease');
    expect(component.selectedImages.length).toBe(1, 'selectedImages length should decrease');
    expect(component.imageRemovedIndex.emit).toHaveBeenCalledWith(0);
  });  
});
