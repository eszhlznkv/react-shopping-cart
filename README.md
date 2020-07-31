Few steps for deploy to Ubuntu 

# 1. Install mongodb
sudo apt install -y mongodb
sudo service start mongodb
mongo

# 2. Node.js v14.x:
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Install npm
sudo apt-get install npm

# 4. Install PM2 for background processes
npm install pm2 -g

---------------------
In root folder of project..

pm2 start server.js
pm2 start npm -- start

---------------------
