##REVIEW
Questing:
<ul>
    <li>What is base.js</li>
</ul>

Fruits is static var. We can parse element from list and get attr
For example
```js
const frouties = elements => {
    let fr = {};
    for (let index in  elements){
        const element = elements[index];
        fr['id'] = idex + 1;
        fr['title'] = element.getAttribute('data-title');
        fr['price'] = element.getAttribute('data-price');
        fr['img'] = element.getAttribute('data-img');
    }
    return fr;
};
```


Global var $ is cant be conflicted with global plugin jQuery


Function a:
<ul>
  <li>render()</li>    
  <li>toHTML()</li>    
  <li>document.addEventListener('click', ....)</li>
</ul>
Add initillization function to module

Recomendation not use event.preventDefault();
Better is ``return false`` in the end function;


In file ``modal.js``

Is empty function 
``
function noop() {
}
``
Using in line 29
``$btn.onclick = btn.handler || noop``
Better
``$btn.onclick = btn.handler || () => {}``



Constant ``const DEFAULT_WIDTH``
Must be on the top file

Global function
``Element.prototype.appendAfter = function (element) {
      element.parentNode.insertBefore(this, element.nextSibling);
  }``
  
Better user as anonymous function