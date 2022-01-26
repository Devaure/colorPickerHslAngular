import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PickerComponent } from './components/col-pick/picker/picker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements AfterViewInit{

  title = 'colorPicker';
  @ViewChild(PickerComponent)
  myPickerComponent!: PickerComponent;

  ngAfterViewInit(){
    console.log(this.myPickerComponent.color)
  }
  onMouseDown(evt:MouseEvent){
   console.log(this.myPickerComponent.color);
   
    
  }
}
