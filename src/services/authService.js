const mockLogin = async (email, password) => {
  if (email === 'domelia@pagamentos.com' && password === 'password') {
    const userData = { name: 'Domélia', email: 'domelia@pagamentos.com' };
    localStorage.setItem('user', JSON.stringify(userData));
    return { success: true, token: 'token-jwt', user: userData };
  } else {
    return { success: false, error: 'Credenciais inválidas' };
  }
};

export { mockLogin };
