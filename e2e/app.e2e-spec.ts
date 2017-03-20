import { EquationCloudFrontEndPage } from './app.po';

describe('equation-cloud-front-end App', () => {
  let page: EquationCloudFrontEndPage;

  beforeEach(() => {
    page = new EquationCloudFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
