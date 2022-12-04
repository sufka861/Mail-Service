const id = new URL(document.location).searchParams.get("id");
window.onload = () => {
  if (id) {
    document
      .getElementById("tempForm")
      .addEventListener("submit", (event) =>
        editTemplate(event).then(() => alert("Template Edited!"))
      );
    injectDataToForm();
  } else {
    document
      .getElementById("tempForm")
      .addEventListener("submit", (event) =>
        createTemplate(event).then(() => alert("Template Created!"))
      );
  }
};

function getDataFromForm(event) {
  const tempFormData = new FormData(event.target);
  console.log(tempFormData);
  const data = Object.fromEntries(tempFormData.entries());
  return data;
}

async function editTemplate(event) {
  event.preventDefault();
  const editedTemp = getDataFromForm(event);
  await fetch(`http://localhost:3000/template/id?id=${id}`, {
    method: "PUT",
    mode: "cors",
    headers: { Accept: `application/json` },
    body: JSON.stringify(editedTemp),
  }).then(
    () => (window.location.href = "http://localhost:3000/Templates.html")
  );
}

async function injectDataToForm() {
  await fetch(`http://localhost:3000/template/id?id=${id}`, {
    method: "GET",
    mode: "cors",
    headers: { Accept: `application/json` },
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
  await fetch(`http://localhost:3000/template`, {
    method: "POST",
    mode: "cors",
    headers: { Accept: `application/json` },
    body: JSON.stringify(newTemp),
  }).then((res) => {
    if (res.status === 200) {
      alert(`New template: ${newTemp.name} created`);
      window.location.href = "http://localhost:3000/Templates.html";
    }
  });
}
