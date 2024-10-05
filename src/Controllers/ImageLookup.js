const fs = require("fs");
const { logger } = require("../Logger");

class ImageLookup {
get(req, res) {
  /* File Traversal exploit */
  /* Can read any file in the server by passing the filename (image) in the query params */
  /* ex: http GET http://localhost:8089/api/v1/image-lookup image=="package.json" */
  let sanitizedFileName = req.query.image.replace(/[^a-z0-9\\.]+/gi, ''); // sanitize file name
  try {
    const fileContent = fs.readFileSync(`./uploads/${sanitizedFileName}`).toString();
    // logger.debug(fileContent); // commented out due to potential exposure of sensitive info
    res.send(fileContent);
  } catch (error) {
    logger.error(error);
    res.status(500).send('An error occurred while trying to read the file.');
  }
}

}

module.exports = ImageLookup;

