export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};

export const departmentValidator = department => {
  if (!department || department.length <= 0) return 'Department cannot be empty.';

  return '';
};

export const registrationNumberValidator = registrationNumber => {
  if (!registrationNumber) return 'Registration Number cannot be empty.';
  if(registrationNumber.length < 7 || registrationNumber.length > 8) return 'Please enter valid 7 digit registration number'
  return '';
};
  export const locationNameValidator = locationName => {
    if (!locationName) return 'Please enter valid location.';
    return '';
};