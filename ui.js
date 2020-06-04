window.onload = function initialize()
{
    let barHeight = document.getElementById('header').offsetHeight;
    let content = document.getElementById('content');
    content.style.marginTop =  + barHeight+'px';
    document.documentElement.style.setProperty('--header-height', barHeight+'px');
    console.log(barHeight);

    resizing();
};

window.onresize = resizing;

function resizing()
{
    let menuIcon = document.getElementById('menu-icon');
    if (window.innerWidth >= 1024)
    {
        oldParent = document.getElementById('nav-outer-holder');
        newParent = document.getElementById('nav-inner-holder');
        appendFromTo(oldParent,newParent);
        doThingWithClassIfContains(menuIcon,'active',function() {menuIcon.classList.toggle('active');});
        doThingWithClassIfContains(oldParent,'active',function() {oldParent.classList.toggle('active');});
    }
    else
    {
        oldParent = document.getElementById('nav-inner-holder');
        newParent = document.getElementById('nav-outer-holder');
        appendFromTo(oldParent,newParent);
        doThingWithClassIfNotContains(menuIcon,'active',function() {menuIcon.classList.toggle('active');});
    }
};

function toggleNav()
{
    let nav = document.getElementById('nav-outer-holder');
    nav.classList.toggle('active');
}