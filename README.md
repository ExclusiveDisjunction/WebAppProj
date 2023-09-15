# To Connect to Web Server

Use the following command to access the server from the PowerShell:

```PowerShell
ssh -i "web-prod-heh.pem" ec2-user@ec2-3-145-69-127.us-east-2.compute.amazonaws.com
```

Please ensure that your active directory contains the `web-prod-heh.pem` file. Additionally, please make sure that your `.pem` file is locked using `icacles.exe`. 

For your individual access keys to the console, please see the folder called `Access`. This contains `csv` files with your name's on them. Use the link, username, and password to access the console. However, when you first sign in, AWS console will prompt you for a new password.  

Furthermore, please review the folder called guides for more information about the ec2 server & how to use it.