document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const name = document.getElementById('contactName');
  const email = document.getElementById('contactEmail');
  const message = document.getElementById('contactMessage');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Validación nombre alfanumérico
    const nameValue = name.value.trim();
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ]+$/.test(nameValue) || nameValue.length < 3) {
      nameError.textContent = 'Ingresá un nombre válido (alfanumérico, mínimo 3 caracteres).';
      valid = false;
    } else {
      nameError.textContent = '';
    }

    // Validación mail simple
    const emailValue = email.value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailValue)) {
      emailError.textContent = 'Ingresá un email válido.';
      valid = false;
    } else {
      emailError.textContent = '';
    }

    // Validación mensaje mínimo 6 caracteres
    const msgValue = message.value.trim();
    if (msgValue.length < 6) {
      messageError.textContent = 'El mensaje debe tener al menos 6 caracteres.';
      valid = false;
    } else {
      messageError.textContent = '';
    }

    // Si todo está ok, armar el mailto
    if (valid) {
      const mailto = `mailto:jeremiasbarrile@gmail.com?subject=Contacto%20Buscaminas&body=Nombre: ${encodeURIComponent(nameValue)}%0AEmail: ${encodeURIComponent(emailValue)}%0AMensaje: ${encodeURIComponent(msgValue)}`;
      window.location.href = mailto;
    }
  });
});
