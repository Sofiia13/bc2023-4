const http = require("http");
const fs = require('fs');
const {XMLParser, XMLBuilder} = require("fast-xml-parser");

const hostname = "127.0.0.1";
const port = 8000;
const server = http.createServer((req, res) => {

    fs.readFile("data.xml", (err, data) => {
        if(err === null) {
            const parser = new XMLParser();
            const obj = parser.parse(data);
            let MaxValue = 0;
            obj.exchange.currency.forEach(currency => {
                if(currency.rate > MaxValue) {
                    MaxValue = currency.rate;
                }
            });
            const builder = new XMLBuilder();
            const xmlStr = builder.build({data:{max_rate: MaxValue.toString()}});
            res.writeHead(200, { 'Content-Type': 'application/xml' });
            res.write(xmlStr);
            res.end();
        } else {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Invalid XML');
        }
    });

});

server.listen(port, hostname, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
});
