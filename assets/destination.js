const params=new URLSearchParams(window.location.search);
document.getElementById('title').innerHTML=params.get('place');