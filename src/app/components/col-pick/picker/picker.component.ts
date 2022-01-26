import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.scss']
})
export class PickerComponent implements OnInit, AfterViewInit{

  @ViewChild('canvas') 
  canvas!:ElementRef<HTMLCanvasElement>;
  public color:string='';
  @Input() r!:number;
  @Input() g!:number;
  @Input() b!:number;
  image:any;

  private context!:CanvasRenderingContext2D;
  constructor() { }
  

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //first element  
    this.context = <CanvasRenderingContext2D>this.canvas.nativeElement.getContext('2d');
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    const grad = this.context.createLinearGradient(0, 0, 0, this.canvas.nativeElement.height);
 
   //couleur de mon canvas
    grad.addColorStop(0,"rgb(255,0,0)");
    grad.addColorStop(0.17,"rgb(255,255,0)");
    grad.addColorStop(0.33,"rgb(0,255,0)");
    grad.addColorStop(0.52,"rgb(0,255,255)");
    grad.addColorStop(0.66,"rgb(0,0,255)");
    grad.addColorStop(0.85,"rgb(255,0,255)");
    grad.addColorStop(1,"rgb(255,0,0)");

    this.context.beginPath();
    this.context.rect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.context.fillStyle  = grad;
    this.context.fill();
    this.context.closePath();
  }

  onMouseDown(evt:MouseEvent){
   this.image= this.context.getImageData(0, evt.offsetY,1,1).data;
    this.r = this.image[0];
    this.g= this.image[1];
    this.b = this.image[2];
    let hue:number;
    hue = this.rgb2hue(this.r,this.g,this.b);

    this.color =  '{hsl('+ Math.round(hue)+'%' +','+ 100+'%'+','+ 50+'%'+')}';
    console.log(this.color);
    return this.color;
  }


/**
 * Permet de converir rgb en hsl
 * @param r 
 * @param g 
 * @param b 
 * @returns 
 */
rgb2hue(r:number, g:number, b:number) {
  r /= 255;
  g /= 255;
  b /= 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var c   = max - min;
  var hue!:number;
  if (c == 0) {
    hue = 0;
  } else {
    switch(max) {
      case r:
        var segment = (g - b) / c;
        var shift   = 0 / 60;       // R° / (360° / hex sides)
        if (segment < 0) {          // hue > 180, full rotation
          shift = 360 / 60;         // R° / (360° / hex sides)
        }
        hue = segment + shift;
        break;
      case g:
        var segment = (b - r) / c;
        var shift   = 120 / 60;     // G° / (360° / hex sides)
        hue = segment + shift;
        break;
      case b:
        var segment = (r - g) / c;
        var shift   = 240 / 60;     // B° / (360° / hex sides)
        hue = segment + shift;
        break;
    }
  }
  
  return hue * 60; // hue is in [0,6], scale it up
}

}
