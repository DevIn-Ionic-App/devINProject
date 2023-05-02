import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditArticlePage } from './edit-article.page';

describe('EditArticlePage', () => {
  let component: EditArticlePage;
  let fixture: ComponentFixture<EditArticlePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
