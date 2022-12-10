import {APIpaths} from "./APIpaths.js";

const id = new URL(document.location).searchParams.get("id");
window.onload = () => {
    if (id) {
        document
            .getElementById("tempForm")
            .addEventListener("submit", (event) =>
                editTemplate(event).then(() => alert("Template Edited!"))
            );
        injectDataToForm().next();
    } else {
        document
            .getElementById("tempForm")
            .addEventListener("submit", (event) =>
                createTemplate(event).then(
                    () => (window.location.href = "http://localhost:3000/Templates.html")
                )
            );
    }
};

function getDataFromForm(event) {
    const tempFormData = new FormData(event.target);
    return Object.fromEntries(tempFormData.entries());
}

async function editTemplate(event) {
    event.preventDefault();
    const editedTemp = getDataFromForm(event);
    await fetch(APIpaths["editTemplate"] + `/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {"Content-Type": `application/json`},
        cache: "no-cache",
        body: JSON.stringify(editedTemp),
    }).then(
        () => (window.location.href = "http://localhost:3000/Templates.html")
    );
}

async function injectDataToForm() {
    await fetch(APIpaths["templateById"] + `/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {Accept: `application/json`},
    })
        .then((res) => res.json())
        .then((data) => {
            document.getElementById("tempName").value = data.name;
            document.getElementById("tempCreator").value = data.creator;
            document.getElementById("tempHTML").value = data.html;
        });
}

async function createTemplate(event) {
    event.preventDefault();
    const newTemp = getDataFromForm(event);
    await fetch(APIpaths["createTemplate"], {
        method: "POST",
        mode: "cors",
        headers: {"Content-Type": `application/json`},
        cache: "no-cache",
        body: JSON.stringify(newTemp),
    }).then((res) => {
        if (res.status === 200) {
            alert(`New template: ${newTemp.name} created`);
        } else {
            alert(`Unable to create new template`);
        }
    });
}
