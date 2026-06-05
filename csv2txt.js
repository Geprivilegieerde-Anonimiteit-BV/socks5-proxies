const fs = require("fs");

const data = fs.readFileSync(process.argv[2], "utf8");

const lines = data.split("\n").filter(Boolean);
const header = lines.shift().split(",");

const statusIndex = header.indexOf("Status");
const ipIndex = header.indexOf("IP");
const portIndex = header.indexOf("Port");

const proxies = lines
  .map(line => line.split(","))
  .filter(cols => cols[statusIndex] === "Success")
  .map(cols => `${cols[ipIndex]}:${cols[portIndex]}`);

const output = proxies.join("\n");

fs.writeFileSync("proxies.txt", output, "utf8");

console.log(`Saved ${proxies.length} proxies to proxies.txt`);
