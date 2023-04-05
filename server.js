

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload';


const { PORT = 5000 } = process.env;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(fileUpload());


app.use("/", express.static(path.join(__dirname, "public")));

// upload endpoint
app.post('/upload', (req, res) => {
  const { image } = req.files;

  // If no image submitted, exit
  if (!image) return res.sendStatus(400);

  
  const uploadsDir = __dirname + '/public/uploads/';
  // Create uploads directory if it doesn't exist
  if (!fs.existsSync(uploadsDir)){
      fs.mkdirSync(uploadsDir);
  }

  // Move image to uploads directory
  image.mv(uploadsDir + image.name);

  // Get image URL
  var port = req.app.settings.port || PORT;
  console.log(req.hostname)
  const imageUrl =  req.protocol + '://' + req.hostname  + ( port == 80 || port == 443 ? '' : ':'+port ) + '/uploads/' + image.name;

  // Send response
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ 
    success: true,
    url :  imageUrl,
    name: image.name,
    size: image.size,
    mimetype: image.mimetype
   }, null, 3));
   
});

// All other routes
app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
})

app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});