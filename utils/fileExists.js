const fs = require('fs');

const doesFileExist = async (name, dir) => {
  const files = await fs.promises.readdir(dir);
  return files.includes(name);
}

const getIndexedName = async (name, dir) => {
  const files = await fs.promises.readdir(dir);
  let exist = true
  let index = 0;
  while (exist) {
    let fileName = `${name}.json`
    if (index > 0) {
      fileName = `${name}(${index}).json`
    }
    if (files.includes(fileName)) {
      index += 1;
    } else {
      exist = false;
    }
  }

  return index > 0 ? `${name}(${index})` : `${name}`;
}

module.exports = {
  doesFileExist,
  getIndexedName,
}