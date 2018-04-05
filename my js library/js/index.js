var slide=document.getElementsByClassName('mySlides');
var number_text=document.getElementsByClassName('numbertext');
var dots=document.getElementsByClassName('dot');
var initilaIndex=-1;
var flag=false;
showIndex();
function showIndex()
{   initilaIndex++;
    console.log(initilaIndex)
    if(initilaIndex>=slide.length) initilaIndex=0;
    for(var i=0;i<slide.length;i++)
    {
        slide[i].style.display='none';
        
    }
    for(var i=0;i<dots.length;i++)
    {
        if(dots[i].classList.contains('active'))
        {
            dots[i].classList.remove('active');
        }
    }
    slide[initilaIndex].style.display='block';
    dots[initilaIndex].classList.add('active');
    setTimeout(showIndex, 5000);
}
function plusSlides(incrementvalue) {
    flag=true;
    //console.log(incrementvalue+'   '+initilaIndex);

    if((initilaIndex+incrementvalue)>=slide.length)
    {
        initilaIndex=-1;
        
        showIndex();
    }
    else if((initilaIndex+incrementvalue)<0)
    {
        initilaIndex=slide.length-2;
        
        showIndex();
    }
    else
    {
        initilaIndex+=incrementvalue;
        showIndex();

    }
}