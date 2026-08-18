export const MIN_PASSWORD_LENGTH = 8;

export function validateSettings(values) {
  const errors = {};
  const fullName = values.fullName.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const currentPassword = values.currentPassword;
  const newPassword = values.newPassword;
  const confirmPassword = values.confirmPassword;

  if (!fullName) errors.fullName = 'Enter your full name.';
  if (!email) errors.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  if (phone && !/^\+?[0-9][0-9 ()-]{6,19}$/.test(phone)) errors.phone = 'Enter a valid phone number.';

  const passwordChangeStarted = Boolean(currentPassword || newPassword || confirmPassword);
  if (passwordChangeStarted) {
    if (!currentPassword) errors.currentPassword = 'Enter your current password to change it.';
    if (!newPassword) errors.newPassword = 'Enter a new password.';
    else if (newPassword.length < MIN_PASSWORD_LENGTH) errors.newPassword = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
    if (!confirmPassword) errors.confirmPassword = 'Confirm your new password.';
    else if (newPassword !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';
  }
  return errors;
}
