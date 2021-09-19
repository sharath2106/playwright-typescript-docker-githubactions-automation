import { Page, test } from '@playwright/test';
import { ProjectsPage } from '../pages/projectsPage';
import { LoginPage } from '../pages/loginPage';
import { KeysPage } from '../pages/keysPage';
import {
  createKey,
  createProject,
  deleteProjects,
} from '../utils/projectUtils';
import { KeyType } from '../utils/constants';

let page: Page;
test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  const loginPage = new LoginPage(page);
  await loginPage.login();
});

test.describe('Projects test - Create first empty project for the user', () => {
  test('Test', async () => {
    const projectPage = new ProjectsPage(page);
    await projectPage.createFirstProject();
    await projectPage.verifyProjectLandingPage();
    await projectPage.verifyProjectTitle();
    await projectPage.verifyNumberOfProjectTileInProjectsPage(1);
  });
});

test.describe(
  'Projects test - Add plain key in the project for the user',
  () => {
    test.beforeEach(async () => {
      await createProject();
    });
    test('Add plain key to the project', async () => {
      const keyPage = new KeysPage(page);
      const projectPage = new ProjectsPage(page);
      await projectPage.selectProject();
      await keyPage.clickAddKey();
      await keyPage.enterInitialKeyDetails();
      await keyPage.saveKey();
      await keyPage.verifyKeyInProjectsPage();
    });
  }
);

test.describe(
  'Keys test - Add translation for the plain key in the project for the user',
  () => {
    test.beforeEach(async () => {
      await createProject();
      await createKey(KeyType.PLAIN_KEY);
    });
    test('Add translation to the plain key', async () => {
      const keyPage = new KeysPage(page);
      const projectPage = new ProjectsPage(page);
      await projectPage.selectProject();
      await keyPage.addTranslationForKey();
      await keyPage.verifyCompletionOfKeyTranslation();
    });
  }
);

test.describe(
  'Keys test - Add translation for the plural key in the project for the user',
  () => {
    test.beforeEach(async () => {
      await createProject();
      await createKey(KeyType.PLURAL_KEY);
    });
    test('Add translation to the plural key', async () => {
      const keyPage = new KeysPage(page);
      const projectPage = new ProjectsPage(page);
      await projectPage.selectProject();
      await keyPage.addTranslationForKey();
      await keyPage.verifyCompletionOfKeyTranslation();
    });
  }
);

test.afterEach(async () => {
  await deleteProjects();
});
