```
# oss-japan-demo

- make sure that s3cmd is installed on the machine (e.g. sudo dnf install s3cmd)
- make sure than npm is installed on the machine (e.g. sudo dnf install npm)

- install dependencies:
$ npm install

- update missing values in 's3cfg' configuration file from RGW: host_base, host_bucket, access_key, secret_key

- make sure that port 3001 is open for incominf traffic. E.g.
$ firewall-cmd --zone=FedoraServer --add-port=3001/tcp
$ firewall-cmd --permanent --zone=FedoraServer --add-port=3001/tcp

- run the server:
$ node --inspect http_demo_server.js

- make sure that the following two buckets exists on ceph:
$ s3cmd mb --config=./s3cfg s3://dogbasket
$ s3cmd mb --config=./s3cfg s3://catbasket

- access the server from a browser at: http://<hostname>:3001
```
