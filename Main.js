const Cont=document.getElementById("Cont")
const searchbtn=document.getElementById("Searchbtn")

const wel=document.getElementById("wel")
const searchdata=document.getElementById('Search');
let favlist=[]
let searchlist=[]
const favbtn=document.getElementById('Favbtn')
const inst=document.getElementById("Notice_container")
console.log(inst)
function first(data)
{
    
    let Moviedata=[]
    Moviedata=data.Search;
    //inst.style.visibility="hidden";
    inst.hidden=true
    const moviecontainer=document.getElementById("Movies")
    let c="";
    const nowal="https://cdn-icons-png.flaticon.com/512/2576/2576762.png";
    for(let i=0;i<Moviedata.length;i++)
    {
      const backg=Moviedata[i].Poster!=="N/A"?Moviedata[i].Poster:nowal 
      c+=`<div class="card">
        <div class="imgcard">
        
        <img src="${backg}" alt="Avatar" style="width:300px; height:300px;">
        </div>
        <div class="container">
          <h5>${Moviedata[i].Title}</h5>
         
          
        </div>
        
        <div class="footer">
        
        <a href="Details.html?id=${Moviedata[i].imdbID}"> <img  class=${"Btns"} id="${Moviedata[i].imdbID}" src="https://cdn-icons-png.flaticon.com/512/3272/3272548.png" style="width:30px; height:30px;"></a><br/>
       
        <img class=${"Favbtns"} id="${Moviedata[i].imdbID+"fav"}"src="https://cdn-icons-png.flaticon.com/512/2107/2107845.png" style="width:30px; height:30px;">
        </div>
     
      </div>`
    }
    moviecontainer.innerHTML=c;
    const btns=document.querySelectorAll(".Btns");
    btns.forEach((element)=>{element.addEventListener('click',()=>{localStorage.setItem("CurrentMovie",element.id); Movie();})})

    const favs=document.querySelectorAll(".Favbtns")
    favs.forEach((ele)=>{ele.addEventListener('click',()=>{fid=ele.id.slice(0,-3); console.log(searchlist); searchlist.forEach((i)=>{if(i.imdbID==fid){favlist.push(i)}}); console.log(favlist);localStorage.setItem("favlist",JSON.stringify(favlist));   })})
  //searchlist.forEach((i)=>{if(i.imdbID==fid){favlist.push(i)}}); console.log(favlist);localStorage.setItem("Favlist",JSON.string(favlist));  

    
}

async function search()
{
 
  
  const url = `https://www.omdbapi.com/?s=${(searchdata.value).trim()}&page=1&apikey=2a30dab7`
  const res = await fetch(`${url}`);
  const data = await res.json();
 

  if(data.Search.length>0)
  {
    searchlist=data.Search
    first(data);
  }
 
 
  

}
function renderfavlist()
{
let list=localStorage.getItem("favlist");

  const favcont=document.getElementById("FavCont")
  let favcards=""
  console.log(typeof(list))
  list=JSON.parse(list)
  const nowal="https://cdn-icons-png.flaticon.com/512/2576/2576762.png";
for(let i=0;i<list.length;i++)
  {
    const backg=list[i].Poster!=="N/A"?list[i].Poster:nowal 
    favcards+=`<div class="card">
    <div class="imgcard">
    <img src="${backg}" alt="Avatar" style="width:300px; height:300px;">
    </div>
    <div class="container">
      <h5>${list[i].Title}</h5>
     
      
    </div>
    
    <div class="footer">
    
    <a href="Details.html?id=${list[i].imdbID}"> <img  class=${"Btns"} id="${list[i].imdbID}" src="https://cdn-icons-png.flaticon.com/512/3272/3272548.png" style="width:30px; height:30px;"></a><br/>
   
    <img class=${"unFavbtns"} id="${list[i].imdbID+"unfavs"}"src="https://cdn-icons-png.flaticon.com/512/6861/6861362.png" style="width:30px; height:30px;">
    </div>
 
  </div>`
  
  }
  favcont.innerHTML=favcards;
  const btns=document.querySelectorAll(".Btns");
  btns.forEach((element)=>{element.addEventListener('click',()=>{localStorage.setItem("CurrentMovie",element.id); Movie();})})

  const unfavs=document.querySelectorAll(".unFavbtns")
  unfavs.forEach((ele)=>{ele.addEventListener('click',()=>{fid=ele.id.slice(0,-6);   const newlist=list.filter((i)=>(i.imdbID!=fid)); localStorage.setItem("favlist",JSON.stringify(newlist)); renderfavlist();  })})

}

async function Movie()
{
   const id=localStorage.getItem("CurrentMovie")
   const url = `https://www.omdbapi.com/?i=${id}&apikey=2a30dab7`
   const res = await fetch(`${url}`);
   const data = await res.json();
   const nowal="https://cdn-icons-png.flaticon.com/512/2576/2576762.png";
   
   const DetCont=document.getElementById('DetCont');
   console.log(data.Poster)
   DetCont.style.backgroundImage=`url(${data.Poster})`
   const backg=data.Poster!=="N/A"?data.Poster:nowal;
  
  let rendereddata=`  <div class="movie-info">
  <img src=${backg} alt="Movie Title Poster">
  <div class="details">
      <h1>${data.Title}</h1> 
      <p><strong>Release Date:</strong>${data.Released}</p>
      <p><strong>Genre:</strong> ${data.Genre}</p>
      <p><strong>Director:</strong>${data.Director}</p>
      <p><strong>Cast:</strong>${data.Actors}</p>
      <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
     
    
     
  </div>
</div>

<div class="plot">
  <h2>Plot Summary</h2>
  <p>${data.Plot}</p>
  <h2>Awards and Nominations</h2>
  <div class="Awards">
       <div>
       <img src="https://cdn-icons-png.flaticon.com/512/3135/3135783.png" width="40px" height="40px" style={opacity:0}>
       </div>
       <div class="Am">
       <p>${data.Awards}</p>
       </div>
     </div>
</div>`;
 
  const maincont=document.getElementById('DetailsCont');
  console.log(maincont);
  maincont.innerHTML=rendereddata;
    
    
  
}
searchdata.addEventListener('input',search)
searchbtn.addEventListener('click',search)
favbtn.addEventListener('click',renderfavlist)



