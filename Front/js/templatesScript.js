
const listDiv = document.getElementById('tempBoard');

window.onload = () => {

    createTemplatesList()
    document.getElementById('createNewTemp').addEventListener('click', () => window.location = 'http://localhost:3000/TemplatesForm.html');
    setTimeout(zoomOutFrames, 100);

}

async function createTemplatesList (){
    await fetch('http://localhost:3000/templates',
        {method: 'GET', mode: `cors`, headers: {'Accept': `application/json`}}
    ).then((res) => res.json())
        .then((data) => {
            data.forEach(function (obj) {
                const boxOuter = document.createElement("div");
                boxOuter.classList.add('templateBox');
                boxOuter.appendChild(createTemplateElem(obj))
                listDiv.appendChild(boxOuter);
            })
        })
}


function addButtons(template) {

    const send = document.createElement('a');
    send.classList.add('btn', 'btn-primary', 'btn-sm', 'mg');
    send.innerHTML = 'Send';
    send.setAttribute("data-toggle", "modal");
    send.setAttribute("data-target", "#compose-modal");
    send.addEventListener('click', ()=>{
        document.getElementById('email_message').value = template.html;
    })

    const del = document.createElement('a')
    del.classList.add('btn', 'btn-danger', 'btn-sm', 'mg');
    del.innerHTML = 'Delete';
    del.addEventListener('click', () => {
        const delTempConfirm = confirm(`Are you sure you want to delete ${template.name} ?`)
        if (delTempConfirm) {
            fetch('http://localhost:3000/templates',
                {
                    method: 'DELETE',
                    mode: `cors`,
                    headers: {'Accept': `application/json`},
                    body: JSON.stringify({"template_id": template.template_id})
                }).then((response) => {
                    alert(`Template ${template.name} deleted successfully`)
                    window.location.reload();
                }
            );
        }
    })
    const edit = document.createElement('a');
    edit.classList.add('btn', 'btn-warning', 'btn-sm', 'mg');
    edit.href = `http://localhost:3000/TemplatesForm.html?id=${template.template_id}`
    edit.innerHTML = 'Edit';

    const btnsDiv = document.createElement('div');
    btnsDiv.classList.add('flexBox', 'flexCol')
    btnsDiv.appendChild(send);
    btnsDiv.appendChild(edit);
    btnsDiv.appendChild(del);

    return btnsDiv;

}


function createTemplateElem(template) {
    const elem = document.createElement(`div`);



    const frame = document.createElement('iframe');
    frame.srcdoc = template.html;
    frame.classList.add("frameScale");



    const details = document.createElement('div');
    details.classList.add('tempDetails');
    details.innerHTML = `<ul style="padding-right: 25px">
                            <li> <b>Name: </b> ${template.name}</li>
                            <li> <b>Creator: </b> ${template.creator}</li>
                            <li> <b>Time modified:</b> ${template.date}</li>
                         </ul>`

    elem.appendChild(frame);

    const detailsBtnsDiv = document.createElement('div');
    detailsBtnsDiv.classList.add('flexBox', 'frame');
    detailsBtnsDiv.appendChild(details);
    detailsBtnsDiv.appendChild(addButtons(template));

    elem.appendChild(detailsBtnsDiv);
    return elem
}
zoomOutFrames = () =>{
    const frames = document.querySelectorAll('iframe');
    frames.forEach((obj) => {
        obj.contentWindow.document.body.style ='zoom: 0.4;';
    });
}
