import { TestBed } from '@angular/core/testing';

import { SessionExpiredInterceptor } from './session-expired.interceptor';

describe('SessionExpiredInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SessionExpiredInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SessionExpiredInterceptor = TestBed.inject(SessionExpiredInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
