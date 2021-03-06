import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  protected navigateTo = async (url: string) => {
    await this.page.goto(url);
  };

  protected click = async (selector: string) => {
    await this.page.click(selector);
  };

  protected type = async (selector: string, keys: any) => {
    await this.page.type(selector, keys);
  };

  protected waitForElement = async (selector: string) => {
    await this.page.waitForSelector(selector);
  };

  protected waitForDomLoadState = async (selector: string) => {
    await this.page.waitForLoadState('domcontentloaded');
  };

  protected getText = async (selector: string) => {
    return await this.page.innerText(selector);
  };

  protected reloadPage = async () => {
    await this.page.reload();
  };

  protected isVisible = async (selector: string) => {
    await this.page.isVisible(selector);
  };
}
