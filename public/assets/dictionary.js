const fs = require("fs");

fs.readFile("sgb-words.txt", (err, data) => {
    if (err) throw err;

    const dictionary = data.toString().split("\n");
});