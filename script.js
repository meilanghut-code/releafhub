/* ================================================
   RELEAF HUB — script.js
   Minor functions only:
   1. Mobile nav toggle
   2. Register form validation
   3. Email subscribe
   4. Contact form
   ================================================ */

/* ── 1. MOBILE NAV TOGGLE ── */
var navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
  navToggle.addEventListener('click', function () {
    document.querySelector('.nav-links').classList.toggle('open');
  });
}

/* ── 2. REGISTER FORM VALIDATION ── */
function validateForm() {
  var valid = true;

  var fields = [
    { id: 'firstName',  errId: 'firstNameErr',  check: function(v){ return v.trim() !== ''; },                           msg: 'First name is required.' },
    { id: 'lastName',   errId: 'lastNameErr',   check: function(v){ return v.trim() !== ''; },                           msg: 'Last name is required.' },
    { id: 'regEmail',   errId: 'emailErr',      check: function(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); },     msg: 'Enter a valid email address.' },
    { id: 'age',        errId: 'ageErr',        check: function(v){ return v !== ''; },                                  msg: 'Please select your age range.' },
    { id: 'motivation', errId: 'motivationErr', check: function(v){ return v.trim().length >= 20; },                     msg: 'Please write at least a sentence.' }
  ];

  fields.forEach(function(field) {
    var input = document.getElementById(field.id);
    var error = document.getElementById(field.errId);
    if (!input || !error) return;

    if (!field.check(input.value)) {
      input.classList.add('is-invalid');
      error.textContent = field.msg;
      error.classList.add('show');
      valid = false;
    } else {
      input.classList.remove('is-invalid');
      error.classList.remove('show');
    }
  });

  if (valid) {
    document.getElementById('formSuccess').classList.add('show');
    fields.forEach(function(f) {
      var el = document.getElementById(f.id);
      if (el) el.value = '';
    });
    setTimeout(function() {
      document.getElementById('formSuccess').classList.remove('show');
    }, 5000);
  }

  return false;
}

/* clear error as user types */
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(function(el) {
  el.addEventListener('input', function() {
    this.classList.remove('is-invalid');
    var err = document.getElementById(this.id + 'Err');
    if (err) err.classList.remove('show');
  });
});

/* ── 3. EMAIL SUBSCRIBE ── */
var subscribeBtn = document.getElementById('subscribeBtn');
if (subscribeBtn) {
  subscribeBtn.addEventListener('click', function() {
    var input = document.getElementById('subscribeEmail');
    var msg   = document.getElementById('subscribeMsg');
    if (!input || !msg) return;

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
      msg.textContent = "You're on the list!";
      msg.style.color = 'var(--green-mid)';
      input.value = '';
    } else {
      msg.textContent = 'Please enter a valid email.';
      msg.style.color = '#dc3545';
    }
    msg.style.display = 'block';
    setTimeout(function() { msg.style.display = 'none'; }, 4000);
  });
}

/* ── 4. CONTACT FORM ── */
var contactBtn = document.getElementById('contactSubmitBtn');
if (contactBtn) {
  contactBtn.addEventListener('click', function() {
    var name  = document.getElementById('contactName');
    var email = document.getElementById('contactEmail');
    var msg   = document.getElementById('contactMessage');
    var resp  = document.getElementById('contactResponse');
    if (!name || !email || !msg || !resp) return;

    var allFilled = name.value.trim() && msg.value.trim();
    var emailOk   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

    if (allFilled && emailOk) {
      resp.textContent = "Message sent! We'll get back to you within 2–3 business days.";
      resp.style.color = 'var(--green-mid)';
      name.value = ''; email.value = ''; msg.value = '';
    } else {
      resp.textContent = 'Please fill in all fields with a valid email.';
      resp.style.color = '#dc3545';
    }
    resp.style.display = 'block';
    setTimeout(function() { resp.style.display = 'none'; }, 4000);
  });
}
