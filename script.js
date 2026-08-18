const form = document.querySelector('#settings-form');
const passwordButton = document.querySelector('#show-password');
const passwordFields = document.querySelector('#password-fields');
const formMessage = document.querySelector('#form-message');

const validators = {
  firstName: value => value.trim() ? '' : 'Please enter your first name.',
  lastName: value => value.trim() ? '' : 'Please enter your last name.',
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address.',
  phone: value => !value.trim() || /^[+\d][\d\s()-]{6,}$/.test(value) ? '' : 'Enter a valid phone number.',
  newPassword: value => !passwordFields.hidden && !/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value) ? 'Use at least 8 characters, including a letter and number.' : '',
  confirmPassword: value => !passwordFields.hidden && value !== form.newPassword.value ? 'Passwords do not match.' : ''
};

function validateField(input) {
  const error = validators[input.name]?.(input.value) || '';
  const errorNode = document.querySelector(`#${input.name}-error`);
  if (errorNode) errorNode.textContent = error;
  input.setAttribute('aria-invalid', Boolean(error));
  return !error;
}

Object.keys(validators).forEach(name => {
  const input = form.elements[name];
  input.addEventListener('blur', () => validateField(input));
  input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true') validateField(input);
    formMessage.textContent = '';
  });
});

passwordButton.addEventListener('click', () => {
  passwordFields.hidden = !passwordFields.hidden;
  passwordButton.innerHTML = passwordFields.hidden ? 'Change password <span aria-hidden="true">→</span>' : 'Cancel password change <span aria-hidden="true">×</span>';
  if (!passwordFields.hidden) form.newPassword.focus();
});

document.querySelector('.reveal-password').addEventListener('click', event => {
  const input = form.newPassword;
  const reveal = input.type === 'password';
  input.type = reveal ? 'text' : 'password';
  event.currentTarget.textContent = reveal ? 'Hide' : 'Show';
  event.currentTarget.setAttribute('aria-label', reveal ? 'Hide password' : 'Show password');
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const isValid = Object.keys(validators).every(name => validateField(form.elements[name]));
  if (!isValid) {
    formMessage.textContent = 'Please correct the highlighted fields.';
    form.querySelector('[aria-invalid="true"]').focus();
    return;
  }
  formMessage.textContent = 'Your settings have been saved.';
  if (!passwordFields.hidden) {
    form.newPassword.value = '';
    form.confirmPassword.value = '';
    passwordFields.hidden = true;
    passwordButton.innerHTML = 'Change password <span aria-hidden="true">→</span>';
  }
});
