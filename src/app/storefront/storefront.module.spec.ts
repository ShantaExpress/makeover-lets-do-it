import { StorefrontModule } from './storefront.module';

describe('StorefrontModule', () => {
  let storefrontModule: StorefrontModule;

  beforeEach(() => {
    storefrontModule = new StorefrontModule();
  });

  it('should create an instance', () => {
    expect(storefrontModule).toBeTruthy();
  });
});
