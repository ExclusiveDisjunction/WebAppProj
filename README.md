# Welcome to the 2023 Web App Project
**Group Members: Hollan S, Hannah F, Emilio D**

This is the work for our 2023 Web App Development project. 

## To Connect to Web Server

Use the following command to access the server from the PowerShell:

```PowerShell
ssh -i "web-prod-heh.pem" ec2-user@ec2-3-145-69-127.us-east-2.compute.amazonaws.com
```

Please ensure that your active directory contains the `web-prod-heh.pem` file. Additionally, please make sure that your `.pem` file is locked using `icacles.exe`. 

For your individual access keys to the console, please see the folder called `Access`. This contains `csv` files with your name's on them. Use the link, username, and password to access the console. However, when you first sign in, AWS console will prompt you for a new password.  

Furthermore, please review the folder called guides for more information about the ec2 server & how to use it.

## Using Git

To use git to update the information on the server & sync code changes, you must do the following steps:
    1. Commit changes on local computer
    2. Push changes to git by running `git push` in the current directory (assumes that you have git running on the current directory)
    3. Using the server's command line (either though SSH (described above)) or online, in the /var/www/html folder, run `git pull origin`.
    4. If you are viewing the website online, refresh the website.