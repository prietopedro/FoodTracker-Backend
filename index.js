const server = require("./app");
const port = 5000 || process.env.PORT;
server.listen(5000, () => console.log(`Server listening on port ${5000}`));
