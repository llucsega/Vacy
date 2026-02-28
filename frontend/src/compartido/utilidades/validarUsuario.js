export const validateUsername = (username) => {
  const regex = /^[a-z0-9_]{3,}$/;
  
  if (!username || username.trim() === "") {
    return { isValid: false, message: "El nombre de usuario es obligatorio." };
  }
  if (username.length < 3) {
    return { isValid: false, message: "Mínimo 3 caracteres." };
  }
  if (!regex.test(username)) {
    return { isValid: false, message: "Solo letras, números o guiones bajos." };
  }
  
  return { isValid: true, message: "" };
};