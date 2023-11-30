# Welcome to the 2023 Web App Project
**Group Members: Hollan S, Hannah F, Emilio D**

This is the work for our 2023 Web App Development project. 

## File Structure
### Directories
1. /img/ - All images for the project
2. /js/  - All JavaScript files for the project
3. /siteman/ - A site management utility. The sitemap.win.exe command will update the sitemap.xml file based off of the contents of the url.txt file.
4. /styles/ - All CSS style sheets.

### Pages
1. About Page: http://glitterglides.com/about.html
    1. /about.html
    2. /styles/about.css
    3. /styles/MainStyles.css
2. Blog Page: http://glitterglides.com/blog.html
    1. /blog.html
    2. /styles/blog.css
    3. /styles/MainStyles.css
3. Home Page: http://glitterglides.com/
    1. /index.html
    2. /styles/MainStyles.css
    3. /styles/orderOnlineBase.css
    4. /styles/socialMediaBase.css
4. Membership Page: http://glitterglides.com/membership.html
    1. /membership.html
    2. /styles/MainStyles.css
    3. /styles/membership.css
    4. /js/membershipForm.js
5. OrderOnline Page http://glitterglides.com/orderonline.html
    1. /orderonline.html
    2. /styles/MainStyles.css
    3. /styles/orderOnlineBase.css
    4. /styles/orderonline.css
    5. /js/orderonline.js

### Site Management and SEO:
1. robots.txt: Contains allow and disallow
2. sitemap.xml: Contains the information about the pages of the website
3. /siteman/ : Contains utilities for updating the sitemap.xml file.
    1. sitemap.cpp - Source code for sitemap.win.exe
    2. sitemap.win.exe - Command to update the sitemap.xml file when invoked, updates for the URLs present in the URL.txt file
    3. url.txt - A file containing the URLs to be included in the sitemap.xml file.
