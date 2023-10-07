const express = require('express');
const fs = require('fs');

const app = express();

const { isValidJsonData, toJson } = require('./utils/isValidJsonData');
const { doesFileExist, getIndexedName } = require('./utils/fileExists');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // support encoded bodies

app.get('/', async (req, res) => {
  const files = await fs.promises.readdir(`${__dirname}/public`);
  console.log(files);
  res.send('SFL Hiring test task');
})

app.get('/files', async (req, res) => {
  const files = await fs.promises.readdir(`${__dirname}/public`);
  const fileNames = files.map((name) => ({
    name
  }))

  res.json(fileNames).end();
})

app.get('/file/:filename', async (req, res) => {
  const { filename } = req.params;
  const doesExist = await doesFileExist(`${filename}.json`, `${__dirname}/public/`)

  if (doesExist) {
    const content = await fs.promises.readFile(`${__dirname}/public/${filename}.json`, 'utf8');
    return res.json(JSON.parse(content)).end();
  }

   res.status(500).send('File not found').end();
})

app.post('/file/create', async (req, res) => {
  const { content, name } = req.body;
  const isJson = isValidJsonData(content);
  let fileName = name;
  if (isJson) {
    const doesExist = doesFileExist(`${name}.json`, `${__dirname}/public/`)
    if (doesExist) {
      fileName = await getIndexedName(name, `${__dirname}/public`);
    }
    try {
      await fs.promises.writeFile(`${__dirname}/public/${fileName}.json`, toJson(content));
    } catch (err) {
      console.log(err);
    }
    return res.send('File Created').end();
  }

  res.status(500).send('Invalid Data!').end();
})

app.put('/file/:filename', async (req, res) => {
  const { filename } = req.params;
  const { content } = req.body
  const doesExist = await doesFileExist(`${filename}.json`, `${__dirname}/public/`)
  if (doesExist) {
    if (!content || !isValidJsonData(content)) {
      return res.status(500).send('Invalid content').end();
    }
    await fs.promises.writeFile(`${__dirname}/public/${filename}.json`, toJson(content));
  } else {
    return res.status(500).send('File not found').end();
  }

  res.send('File updated').end();
})

app.delete('/file/:filename', async (req, res) => {
  const { filename } = req.params;
  const doesExist = await doesFileExist(`${filename}.json`, `${__dirname}/public/`)
  if (doesExist) {

    await fs.promises.unlink(`${__dirname}/public/${filename}.json`);
    return res.send('File deleted').end();
  }
  res.status(500).send('File not found').end();
})

app.listen(3000, () => console.log('File System app is listening on port 3000.'));