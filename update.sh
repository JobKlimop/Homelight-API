#Stop service for update
sudo systemctl stop homelight-api

#Update the API by running this script
git pull origin master --rebase

#Give update script persmission
sudo chmod +x update.sh

#Install update
echo "Installing API Update"
sudo npm install --save
chmod +x ~/server.js

# Copy homelight-api.service to boot at start
echo "Copy Homelight-API.service"
sudo cp homelight-api.service /etc/systemd/system/
sudo systemctl daemon-reload

# start service
echo "Start service"
sudo systemctl start homelight-api
sudo systemctl enable homelight-api
