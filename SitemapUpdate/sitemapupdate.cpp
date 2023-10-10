#include <iostream>
#include <string>
#include <time.h>
#include <fstream>

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

    return 0;
}