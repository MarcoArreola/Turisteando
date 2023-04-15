import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-blocks-specs',
  templateUrl: './blocks-specs.component.html',
  styleUrls: ['./blocks-specs.component.css']
})
export class BlocksSpecsComponent implements OnInit{

  @Input() imageId: string = '0';
  @Output() newId = new EventEmitter<string>();
  ngOnInit(): void {
    
  }
  
  closeSpecs(){
    this.imageId = '0';
    this.newId.emit(this.imageId);
  }

}
