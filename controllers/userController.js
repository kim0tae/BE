export const getJoin = (req, res) => {};

export const postJoin = (req, res) => {
  const { name, email, password } = req.body;
  console.log(name);
  //return res.send(name);
};

export const logout = (req, res) => {};
