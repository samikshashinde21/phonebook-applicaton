function isValidPhone(phone) {
  return /^\d{10}$/.test(phone);
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

module.exports = {
  isValidPhone,
  isValidEmail
};
