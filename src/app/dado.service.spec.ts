import { TestBed } from '@angular/core/testing';

import { DadoService } from './dado.service';

describe('DadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DadoService = TestBed.get(DadoService);
    expect(service).toBeTruthy();
  });
});
