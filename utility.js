function appendFromTo(oldParent,newParent)
{
    while (oldParent.childNodes.length > 0) 
    {
        newParent.appendChild(oldParent.childNodes[0]);
    }
}

function doThingWithClassIfContains(element,className,callback)
{
    if (element.classList.contains(className))
    {
        callback();
    }
}

function doThingWithClassIfNotContains(element,className,callback)
{
    if (!element.classList.contains(className))
    {
        callback();
    }
}