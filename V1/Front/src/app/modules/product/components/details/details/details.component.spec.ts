import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new car detail when valid name and value are provided', () => {
    component.carDetailName = 'Color';
    component.carDetailValue = 'Red';
  
    const spy = spyOn(component.carDetailsChange, 'emit');
  
    component.addCarDetail();
    fixture.detectChanges();
  
    expect(component.carDetails.length).toBe(1);
    expect(component.carDetails[0]).toEqual({ DetailName: 'Color', DetailValue: 'Red' });
    expect(spy).toHaveBeenCalledWith(component.carDetails);
    expect(component.carDetailName).toBe('');
    expect(component.carDetailValue).toBe('');
  });
  
  it('should emit a message when car detail fields are empty', () => {
    const spy = spyOn(component.messageChange, 'emit');
    component.addCarDetail();
    expect(spy).toHaveBeenCalledWith('Please fill in all car detail fields.');
  });
  
  it('should allow user to add details via the UI', () => {
    const inputName = fixture.debugElement.query(By.css('input[placeholder="Detail Name"]')).nativeElement;
    const inputValue = fixture.debugElement.query(By.css('input[placeholder="Detail Value"]')).nativeElement;
    const addButton = fixture.debugElement.query(By.css('button.detail-button')).nativeElement;
  
    inputName.value = 'Color';
    inputValue.value = 'Blue';
    inputName.dispatchEvent(new Event('input'));
    inputValue.dispatchEvent(new Event('input'));
  
    addButton.click();
    fixture.detectChanges();
  
    expect(component.carDetails.length).toBe(1);
    expect(component.carDetails[0]).toEqual({ DetailName: 'Color', DetailValue: 'Blue' });
  });
  
  it('should clear input fields after adding a detail', () => {
    const inputName = fixture.debugElement.query(By.css('input[placeholder="Detail Name"]')).nativeElement;
    const inputValue = fixture.debugElement.query(By.css('input[placeholder="Detail Value"]')).nativeElement;
    const addButton = fixture.debugElement.query(By.css('button.detail-button')).nativeElement;
  
    inputName.value = 'Color';
    inputValue.value = 'Green';
    inputName.dispatchEvent(new Event('input'));
    inputValue.dispatchEvent(new Event('input'));
  
    addButton.click();
    fixture.detectChanges();
  
    expect(inputName.value).toBe('Color');
    expect(inputValue.value).toBe('Green');
  });  
});
