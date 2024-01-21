url = "http://localhost:8989/users"
fetch(url)
  .then(res => res.json())
  .then(res => {
    console.log(res)

    output = ""
    for(let i=0; i< res.length; i++) {
        output += `
        <tr>
        <td>${res[i]['name']}</td>
        <td>${res[i]['age']}</td>
        <td>${res[i]['city']}</td>
        <td>
           <a href="edit.html?id=${res[i]['_id']}" class="btn btn-dark" onclick="">edit</a> &nbsp  &nbsp &nbsp
           <button class="btn btn-danger" onclick="delete_user('${res[i]['_id']}')">delete</button>    
        </td>
    </tr>
        `
    }

    document.getElementById("tbody").innerHTML = output

  })

  function delete_user(id) {
       d_url = url + '?id=' + id
 
       fetch(d_url, {method: "DELETE"})
       .then(res => res.json())
       .then (
        window.location.reload()
        )
    }

    function putData(){
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');

      var data = {
        "id":id,
        "name":document.getElementById("name").value,
        "age":document.getElementById("age").value,
        "city":document.getElementById("city").value
      }

      fetch(url, {
        method:"PUT", 
        headers: {
          'Accept': 'applications/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => {
        window.location.href="listing.html"
      })

    }

    function fetchUser() {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      console.log(id)

      get_url = url + "/" + id

      fetch(get_url)
      .then(res => res.json())
      .then(res => {
        document.getElementById("name").value = res['name']
        document.getElementById("age").value = res['age']
        document.getElementById("city").value = res['city']

      })
    }
 