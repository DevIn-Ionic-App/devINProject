import { NowPipe } from './now.pipe';

describe('NowPipe', () => {
  it('create an instance', () => {
    const pipe = new NowPipe();
    expect(pipe).toBeTruthy();
  });
});
