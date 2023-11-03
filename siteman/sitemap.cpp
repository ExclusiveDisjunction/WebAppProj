#include <iostream>
#include <string>
#include <time.h>
#include <fstream>
#include <filesystem>
#include <vector>

#ifdef __linux__
#include <unistd.h>
#elif defined(_WIN32) || defined(_WIN64) || defined(__MINGW32__)
#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <direct.h>
#endif

#include <limits.h>

using namespace std;

int main()
{
    char* cwd;
    size_t cwd_size;
    #ifdef __linux__
    cwd_size = PATH_MAX;    
    #elif defined(_WIN32) || defined(_WIN64) || defined(__MINGW32__)
    cwd_size = MAX_PATH;
    #endif

    cwd = new char[cwd_size];
    cwd = getcwd(cwd, cwd_size);

    if (cwd != nullptr)
        cout << "The current working directory is \"" << cwd << "\"" << endl;
    else
    {
        cout << "Error with getcwd(), cannot continue." << endl;
        return 1;
    }

    filesystem::path SitemapPath;
    vector<string> Urls;
    string DateStr;

    //Determine the Url from the url.txt file.
    {
        filesystem::path CurrentPath(cwd);
        if (CurrentPath.filename() == "siteman")
            CurrentPath = CurrentPath.parent_path();
        filesystem::path UrlDestFile;

        UrlDestFile = CurrentPath / "siteman/url.txt";   
        SitemapPath = CurrentPath / "sitemap.xml";

        cout << "Finding url file at " << UrlDestFile << endl << 
                "Finding Sitemap file at " << SitemapPath << endl;
        ifstream UrlPath(UrlDestFile);
        if (!UrlPath)
        {
            cout << "Error with reading url file, please check that siteman/url.txt exists." << endl;
            return 1; 
        }

        string Url;

        while (!UrlPath.eof())
        {
            getline(UrlPath, Url);
            cout << "URL for website found to be " << Url << endl;
            Urls.push_back(Url);
        }
        UrlPath.close();
    }

    //Determine the date string.
    {
        time_t CurrentTime = time(nullptr);
        tm CurrentLocalTime = *localtime(&CurrentTime);
        DateStr = to_string(CurrentLocalTime.tm_year + 1900) + "-" + to_string(CurrentLocalTime.tm_mon + 1) + "-" + string(CurrentLocalTime.tm_mday < 10 ? "0" : "") + to_string(CurrentLocalTime.tm_mday);
    }

    ofstream OutFile(SitemapPath);
    if (!OutFile)
    {
        cout << "Could not open the sitemap file provided." << endl;
        return 1;
    }

    OutFile <<  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" << endl << 
                "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">" << endl;
    for (string& Url : Urls)
    {
        OutFile <<  "\t<url>" << endl <<
                    "\t\t<loc>" << Url << "</loc>" << endl << 
                    "\t\t<lastmod>" << DateStr << "</lastmod>" << endl <<
                    "\t</url>" << endl;
    }
                
    OutFile << "</urlset>" << endl;

    cout << "The sitemap url's have been updated, and their timestap set to " << DateStr << "." << endl;
    OutFile.close();

    return 0;
}