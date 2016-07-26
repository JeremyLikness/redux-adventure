import { ReduxAdventurePage } from './app.po';

describe('redux-adventure App', function() {
  let page: ReduxAdventurePage;

  beforeEach(() => {
    page = new ReduxAdventurePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('redux-adventure works!');
  });
});
