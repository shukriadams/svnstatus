#!/usr/bin/env bash
sudo apt-get update

#install node js
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install nodejs  -y

sudo apt-get install subversion -y

# docker
sudo apt install docker.io -y
sudo apt install docker-compose -y
sudo usermod -aG docker vagrant

# force startup folder to vagrant project
echo "cd /vagrant/src" >> /home/vagrant/.bashrc

# set hostname, makes console easier to identify
sudo echo "svnstatus" > /etc/hostname
sudo echo "127.0.0.1 svnstatus" >> /etc/hosts
