import { Movie } from './movie';

describe('Movie', () => {
  it('should create an instance', () => {
    expect(new Movie("FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF", "b")).toBeTruthy();
  });
});
