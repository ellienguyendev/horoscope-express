var like = document.getElementById("like");
var trash = document.getElementsByClassName("delete");


like.onclick = updateLike;

function updateLike() {
  const name = this.parentNode.childNodes[1].innerText
  const month = this.parentNode.childNodes[3].innerText
  const day = this.parentNode.childNodes[5].innerText


  fetch('like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'month': month,
        'day': day,
        'color': "B22E28"
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
}


Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function() {
    const name = this.parentNode.childNodes[1].innerText
    const month = this.parentNode.childNodes[3].innerText
    const day = this.parentNode.childNodes[5].innerText
    console.log(name);
    console.log(month);
    console.log(day);

    fetch('delete', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': name,
          'month': month,
          'day': day
        })
      })
      .then(function(response) {
        window.location.reload()
      })
  });
});
