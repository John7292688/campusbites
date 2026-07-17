const register = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
  return res.status(400).json({
    success: false,
    message: "Email and password are required"
  });
}

if (password.length < 8) {
  return res.status(400).json({
    success: false,
    message: "Password must be at least 8 characters long"
  });
}

  console.log("Registration Request:", req.body);

  res.status(201).json({
  success: true,
  message: "Student registered successfully"
});
};

module.exports = {
  register
};