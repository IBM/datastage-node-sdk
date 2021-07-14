set -x
#!/bin/bash

node -v

npm cache clean -f
sudo npm install -g n
sudo n stable
sudo n latest
PATH=$PATH:/usr/local/bin/node

node -v
