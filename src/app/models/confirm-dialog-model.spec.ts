import { ConfirmDialogModel } from './confirm-dialog-model';

describe('ConfirmDialogModel', () => {
  it('should create an instance', () => {
    expect(new ConfirmDialogModel('Test', 'Test message')).toBeTruthy();
  });
});
