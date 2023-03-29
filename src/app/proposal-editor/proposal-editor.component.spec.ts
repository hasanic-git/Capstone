import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalEditorComponent } from './proposal-editor.component';

describe('ProposalEditorComponent', () => {
  let component: ProposalEditorComponent;
  let fixture: ComponentFixture<ProposalEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
