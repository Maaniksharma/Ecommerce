export function validate(email, password, username, numbers) {
  // Regex for username (any string of 1-50 alphanumeric characters, spaces, or hyphens)
  const usernameRegex = /^[a-zA-Z0-9 -]{1,50}$/;

  // Regex for email (any string that looks like an email address)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Regex for password (any string that contains at least one non-space character)
  const passwordRegex = /^(?=.*\S).+$/;

  // Regex for numbers (any string that contains only numbers)
  const numbersRegex = /^\d+$/;

  // Validate username
  if (!usernameRegex.test(username)) {
    return false;
  }

  // Validate email, password, and numbers if they are provided
  if (email && !emailRegex.test(email)) {
    return false;
  }
  if (password && !passwordRegex.test(password)) {
    return false;
  }
  if (numbers && !numbersRegex.test(numbers)) {
    return false;
  }

  // If all validations pass, return true
  return true;
}
