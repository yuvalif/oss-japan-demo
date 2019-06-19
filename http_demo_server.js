var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var shell = require('shelljs');

if (!shell.which('s3cmd')) {
      shell.echo('Sorry, this script requires w3cmd');
      shell.exit(1);
}

http.createServer(function (req, res) {
    if (req.url == '/dogupload') {
        var form = new formidable.IncomingForm();
        var bucket = 'dogbasket'
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = '/tmp/' + files.filetoupload.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                var cmd = 's3cmd put --config=./s3cfg ' + newpath + ' s3://' + bucket
                if (shell.exec(cmd).code !== 0) {
                      res.write('Error: "' + cmd + '" failed')
                } else {
                    res.write('<h1>File "' + newpath + '" uploaded to Ceph</h1>');
                }
                res.end();
            });
        });
    } else if (req.url == '/catupload') {
        var form = new formidable.IncomingForm();
        var bucket = 'catbasket'
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var newpath = '/tmp/' + files.filetoupload.name;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                var cmd = 's3cmd put --config=./s3cfg ' + newpath + ' s3://' + bucket
                if (shell.exec(cmd).code !== 0) {
                      res.write('Error: "' + cmd + '" failed')
                } else {
                    res.write('<h1>File "' + newpath + '" uploaded to Ceph</h1>');
                }
                res.end();
            });
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Upload your dog\'s photo</h1>')
        res.write('<form action="dogupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        res.write('<h1>Upload your cat\'s photo</h1>')
        res.write('<form action="catupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(3001);

