const listDiv = document.getElementById('dynamic_list');
window.onload = () => {

createTemplatesList();


};



createTemplatesList = () => {




    fetch('http://localhost:8080/templates',
         {method : 'GET', mode: `cors`, headers: {'Accept':`application/json`}}
    ).then((res) => res.json())
        .then((data) => {
            data.forEach(function (obj) {
                const boxOuter = document.createElement("div");
                boxOuter.classList.add("col-sm-4" ,"col-md-3" ,"box-product-outer");
                console.log(createTemplateElement(obj));
                boxOuter.appendChild(createTemplateElement(obj))
                listDiv.appendChild(boxOuter);
            })
        })


}

createTemplateElement = (template) => {
    console.log(template)

    let box = document.createElement(`div`);
    box.classList.add("box-product");

    let wrapper = document.createElement("div");

    wrapper.classList.add("img-wrapper");

    let frame = document.createElement(`iframe`);
    frame.srcdoc = template.html;

    let details = document.createElement(`div`);
    details.classList.add("tags");

    let creator = createDetailElement(template.creator,"danger");
    let name = createDetailElement(template.name,"info");
    let date = createDetailElement(template.date,"warning");
    details.appendChild(creator);
    details.appendChild(name);
    details.appendChild(date);
    wrapper.appendChild(frame);
    wrapper.appendChild(details);
    box.appendChild(wrapper);

    return box;


}

function createDetailElement(detail, className){
    console.log(detail);
    let element = document.createElement("span")
    let elementDetails = document.createElement("span")
    element.classList.add("label-tags");
    elementDetails.classList.add(`label`, `label-${className}`);
    elementDetails.innerHTML = detail;
    element.appendChild(elementDetails);
    return element;
}