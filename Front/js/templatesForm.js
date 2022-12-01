const id = (new URL(document.location)).searchParams.get('id');
window.onload = () => {
    console.log(id);
    if (id) {

        document.getElementById('tempForm').addEventListener('submit', (event) => {

            const myFormData = new FormData(event.target);
            const editedTemp = Object.fromEntries(myFormData.entries());

            fetch(`http://localhost:3000/template/id?id=${id}`,
                {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {'Accept': `application/json`},
                    body: JSON.stringify(editedTemp)
                    }
            ).then( (response) => response);

            window.location.href = 'http://localhost:3000/Templates.html'
        });


        fetch(`http://localhost:3000/template/id?id=${id}`,
            {method: 'GET', mode: 'cors', headers: {'Accept': `application/json`}})
            .then((res) => res.json())
            .then((data) => {
                document.getElementById('tempName').value = data.name;
                document.getElementById('tempCreator').value = data.creator;
                document.getElementById('tempHTML').value = data.html;

            })
    } else {

        document.getElementById('tempForm').addEventListener('submit', (event) => {

            const myFormData = new FormData(event.target);
            const newTemp = Object.fromEntries(myFormData.entries());

            fetch(`http://localhost:3000/templates`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {'Accept': `application/json`},
                    body: JSON.stringify(newTemp)
                }
            ).then( (response) => response);

            alert(`New template: ${newTemp.name} created`);

            window.location.href = 'http://localhost:3000/Templates.html'
        });


    }

}