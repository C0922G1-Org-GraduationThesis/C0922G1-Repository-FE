import { TestBed } from '@angular/core/testing';

import { Http403Interceptor } from './http403.interceptor';

describe('Http403Interceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Http403Interceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: Http403Interceptor = TestBed.inject(Http403Interceptor);
    expect(interceptor).toBeTruthy();
  });
});
