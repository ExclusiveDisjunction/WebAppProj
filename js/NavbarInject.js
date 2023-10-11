var request = new XMLHttpRequest();
request.open('GET', 'http://glitterglides.com/header.xml', true);
request.responseType = 'blob';
request.onload = function()
{
    var reader = new FileReader();
    reader.readAsText(request.response);
    reader.onload = function(e)
    {        
        const template = document.createElement('template');
        template.innerHTML = e.target.result;
        var Header = document.getElementsByTagName("header");
        if (Header.length != 1)
        {
            alert("Error, could not find header.");
        }

        Header.item(0).appendChild(template);
    }
}

try
{
    request.send();
}
catch (excpt)
{
    alert('Error with request sending occured.');
}
