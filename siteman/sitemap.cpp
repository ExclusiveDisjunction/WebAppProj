#include <iostream>
#include <string>
#include <time.h>
#include <fstream>
#include <filesystem>

#include <unistd.h>
#include <limits.h>

using namespace std;

int main()
{
    char cwd[PATH_MAX];
    if (getcwd(cwd, sizeof(cwd)) != nullptr)
        cout << "The current working directory is \"" << cwd << "\"" << endl;
    else
    {
        cout << "Error with getcwd(), cannot continue." << endl;
        return 1;
    }

    string SitemapPath;
    cout << "Please enter the path of the sitemap: ";
    getline(cin, SitemapPath);

    cout << endl;

    string Url, DateStr;

    //Determine the Url from the url.txt file.
    {
        filesystem::path CurrentPath(cwd);
        filesystem::path ActiveDirectoryName = CurrentPath.filename();
        filesystem::path UrlDestFile;
        if (ActiveDirectoryName != "siteman")
            UrlDestFile = CurrentPath / "siteman/url.txt";
        else
            UrlDestFile = CurrentPath / "url.txt";

        cout << "Finding url file at " << UrlDestFile << endl;
        ifstream UrlPath(UrlDestFile);
        if (!UrlPath)
        {
            cout << "Error with reading url file, please check that siteman/url.txt exists." << endl;
            return 1; 
        }

        getline(UrlPath, Url);
        Url += "index.html";
        UrlPath.close();
    }

    //Determine the date string.
    {
        time_t CurrentTime = time(nullptr);
        tm CurrentLocalTime = *localtime(&CurrentTime);
        DateStr = to_string(CurrentLocalTime.tm_year + 1900) + "-" + to_string(CurrentLocalTime.tm_mon + 1) + "-" + to_string(CurrentLocalTime.tm_mday);
    }

    ofstream OutFile(SitemapPath);
    if (!OutFile)
    {
        cout << "Could not open the sitemap file provided." << endl;
        return 1;
    }

    OutFile <<  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" << endl << 
                "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">" << endl << 
                "\t<url>" << endl <<
                "\t\t<loc>" << Url << "</loc>" << endl << 
                "\t\t<lastmod>" << DateStr << "</lastmod>" << endl <<
                "\t</url>" << endl <<
                "</urlset>" << endl;

    cout << "The file has been updated to have url \"" << Url << "\" and timestamp " << DateStr << "." << endl;
    OutFile.close();

    return 0;
}