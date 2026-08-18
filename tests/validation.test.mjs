import test from 'node:test';
import assert from 'node:assert/strict';
import { validateSettings } from '../validation.mjs';

const validValues = { fullName: 'Jordan Okafor', email: 'jordan@example.com', phone: '', country: '', currentPassword: '', newPassword: '', confirmPassword: '' };
const validate = (overrides = {}) => validateSettings({ ...validValues, ...overrides });

test('requires full name and email', () => {
  const errors = validate({ fullName: ' ', email: ' ' });
  assert.equal(errors.fullName, 'Enter your full name.');
  assert.equal(errors.email, 'Enter your email address.');
});

test('rejects malformed email addresses', () => {
  assert.equal(validate({ email: 'not-an-email' }).email, 'Enter a valid email address.');
  assert.deepEqual(validate({ email: 'jordan@example.com' }), {});
});

test('allows an empty phone number and validates a supplied one', () => {
  assert.equal(validate().phone, undefined);
  assert.equal(validate({ phone: 'abc' }).phone, 'Enter a valid phone number.');
  assert.equal(validate({ phone: '+234 800 000 0000' }).phone, undefined);
});

test('allows a password change to be omitted', () => {
  assert.deepEqual(validate(), {});
});

test('requires current password, a sufficiently long password, and confirmation when changing password', () => {
  const errors = validate({ newPassword: 'short', confirmPassword: 'different' });
  assert.equal(errors.currentPassword, 'Enter your current password to change it.');
  assert.equal(errors.newPassword, 'Use at least 8 characters.');
  assert.equal(errors.confirmPassword, 'Passwords do not match.');
});

test('requires confirmation and accepts matching valid passwords', () => {
  assert.equal(validate({ currentPassword: 'old-password', newPassword: 'new-password', confirmPassword: '' }).confirmPassword, 'Confirm your new password.');
  assert.deepEqual(validate({ currentPassword: 'old-password', newPassword: 'new-password', confirmPassword: 'new-password' }), {});
});
