import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocksSpecsComponent } from './blocks-specs.component';

describe('BlocksSpecsComponent', () => {
  let component: BlocksSpecsComponent;
  let fixture: ComponentFixture<BlocksSpecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocksSpecsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlocksSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
