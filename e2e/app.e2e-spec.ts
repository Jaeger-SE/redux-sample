import { NgReduxDemoPage } from './app.po';

describe('ng-redux-demo App', () => {
  let page: NgReduxDemoPage;

  beforeEach(() => {
    page = new NgReduxDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
