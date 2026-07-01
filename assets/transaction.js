
let data=
JSON.parse(localStorage.getItem('booking'))||[];

let html='';

data.forEach((item,index)=>{

html+=`
<tr>
<td>${index+1}</td>
<td>${item.nama}</td>
<td>${item.email}</td>
<td>${item.telepon}</td>
<td>${item.destinasi}</td>
<td>${item.tiket}</td>
<td>${item.tanggal}</td>
</tr>
`;

});

document.getElementById('tbody').innerHTML=html;