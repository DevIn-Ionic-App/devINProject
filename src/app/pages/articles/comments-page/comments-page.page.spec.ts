import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsPagePage } from './comments-page.page';

describe('CommentsPagePage', () => {
  let component: CommentsPagePage;
  let fixture: ComponentFixture<CommentsPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CommentsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
