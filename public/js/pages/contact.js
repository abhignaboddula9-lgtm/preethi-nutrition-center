import { apiRequest } from '../api.js';

window.submitForm = async function(e) {
  e.preventDefault();
  
  const name = document.getElementById('contact-name').value;
  const phone = document.getElementById('contact-phone').value;
  const email = document.getElementById('contact-email').value;
  const service = document.getElementById('contact-service').value;
  const message = document.getElementById('contact-message').value;

  try {
    const res = await apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify({ name, phone, email, service, message })
    });
    
    if (res.success) {
      document.getElementById('contact-form').reset();
      const msg = document.getElementById('contact-success-msg');
      if (msg) {
        msg.style.display = 'block';
        setTimeout(() => {
          msg.style.display = 'none';
        }, 6000);
      }
    }
  } catch (error) {
    console.error(error);
    alert(error.message || 'Failed to submit contact request. Check server status.');
  }
};
