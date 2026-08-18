import { validateSettings } from './validation.mjs';

const form = document.querySelector('#customer-settings');
const fieldNames = ['fullName', 'email', 'phone', 'currentPassword', 'newPassword', 'confirmPassword'];
const status = document.querySelector('#form-status');

function valuesFromForm() {
  return Object.fromEntries(new FormData(form));
}

function renderErrors(errors) {
  fieldNames.forEach((name) => {
    const input = form.elements[name];
    const error = document.querySelector(`#${name}-error`);
    const message = errors[name] || '';
    input.setAttribute('aria-invalid', String(Boolean(message)));
    error.textContent = message;
  });
}

function validateAndRender() {
  const errors = validateSettings(valuesFromForm());
  renderErrors(errors);
  return errors;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const errors = validateAndRender();
  const firstInvalid = fieldNames.find((name) => errors[name]);
  if (firstInvalid) {
    status.textContent = 'Please correct the highlighted fields.';
    status.classList.add('is-error');
    form.elements[firstInvalid].focus();
    return;
  }
  status.textContent = 'Your settings have been saved successfully.';
  status.classList.remove('is-error');
});

fieldNames.forEach((name) => form.elements[name].addEventListener('input', () => {
  if (form.elements[name].getAttribute('aria-invalid') === 'true') validateAndRender();
}));

document.querySelectorAll('[data-password-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const input = document.querySelector(`#${button.dataset.passwordToggle}`);
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    button.textContent = isHidden ? 'Hide' : 'Show';
    button.setAttribute('aria-label', `${isHidden ? 'Hide' : 'Show'} ${input.labels[0].textContent.trim()}`);
  });
});
