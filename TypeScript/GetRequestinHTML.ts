import { request } from 'http';
import { createWriteStream } from 'fs';
 
const fileStream = createWriteStream('./file.txt');

const req = request(
  {
    host: 'example.com',
    path: '/api/v1/transactions?operation=TRANSFER&asset_id=4957744b3ac54434b8270f2c854cc1040228c82ea4e72d66d2887a4d3e30b317',
    method: 'GET',
  },
  response => {
    response.pipe(fileStream);
  }
);

req.end();
