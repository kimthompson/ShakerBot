// TODO: Just find the number codes of these and save those directly for speed

const roles = [
  {
    command: "tank",
    name: "Tank",
    id: "571447943673020416"
  },
  {
    command: "healer",
    name: "Healer",
    id: "571448509685825536"
  },
  {
    command: "dps",
    name: "DPS",
    id: "571449972340555776"
  },
  {
    command: "tankmain",
    name: "Tank Main",
    id: "571453467261009978"
  },
  {
    command: "healermain",
    name: "Healer Main",
    id: "571453596411887617"
  },
  {
    command: "dpsmain",
    name: "DPS Main",
    id: "571453677965934628"
  },
  {
    command: "journal",
    name: "Journal",
    id: "572123320904843276"
  },
  {
    command: "cactpot",
    name: "Cactpot",
    id: "572123648282984470"
  },
  {
    command: "treasure",
    name: "Treasure",
    id: "572215317569339413"
  }
];

const validCommands = [
  "tank",
  "healer",
  "dps",
  "treasure",
  "journal",
  "cactpot",
  "tankmain",
  "healermain",
  "dpsmain",
  "roles",
  "sleep"
];

const basicCommands = [
  "tank",
  "healer",
  "dps",
  "treasure",
  "journal",
  "cactpot"
];

const mainCommands = ["tankmain", "healermain", "dpsmain"];

module.exports = {
  getRoles,
  validCommands,
  basicCommands,
  mainCommands
};
