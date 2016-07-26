export class ReduxAdventurePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('redux-adventure-app h1')).getText();
  }
}
