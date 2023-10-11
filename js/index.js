var request = new XMLHttpRequest();
request.open('GET', 'http://glitterglides.com/header.html', true);
request.responseType = 'blob';
request.onload = function()
{
    var reader = new FileReader();
    reader.readAsDataURL(request.response);
    reader.onload = function(e)
    {
        console.log('DataURL:', e.target.result);
        
        const template = document.createElement('template');
        template.innerHTML = fr.readAsText(e.target.result);
        Header = document.getElementsByTagName("header");
        if (Header.length != 1)
        {
            alert("Error, could not find header.");
        }

        Header.item(0).appendChild(template);
    }
}

request.send();
