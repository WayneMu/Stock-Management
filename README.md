

# DSO34BT DOCUMENTATION
Stock Tracking System Group A

# Install MySQL

https://dev.mysql.com/downloads/installer/


# Open mysql command prompt(as Administrator) and run the following command:-

create database warehousedb;

# Copy that sql file into this location (Your MySQL Server version could be different)

C:\Program Files\MySQL\MySQL Server 8.0\bin

# Now open command prompt(as Administrator) and execute following commands

cd "C:\Program Files\MySQL\MySQL Server 8.0\bin" mysql –u root –p warehousedb < warehousedb
*NOTE : UPDATED DATABASE MUST BE PROVIDED ON WHATSAAP GROUP
# Download and install node from here

https://nodejs.org/en/download/

** Clone the project (You can also download this project directly as a zip file by clicking on Code present on top of this page and then clicking Download Zip)**

git clone  https://github.com/WayneMu/DSO34BT.git

# Go to the project directory

cd DSO34BT

# Install dependencies

npm install

# Start the server (Please set up the environment variables before starting the server)

npm run start

# Type this is your browser to open the local version of the website

http://localhost:5000/

# always use *git pull* to get code that was updated by other team members
# use *git push* to push your current code on our main banch
*always create your own branch for pages that your still working on*

