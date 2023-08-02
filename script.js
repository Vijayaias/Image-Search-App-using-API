const accessKey="mVfWEe0Pa5OSYMHDwPtoqSUjLKJmK08KKhuzXNl0GxxAsZVk3oteiEwQ";


const input = document.querySelector("input")
const search_btn = document.querySelector(".search_button")
const showMore = document.querySelector(".show-more-button")

let inputData = ""
let page = 1;
let search = false;

input.addEventListener("input",(event)=>{
    event.preventDefault();
    inputData=event.target.value;
})
search_btn.addEventListener("click",()=>{
    if(input.value==="")
    {
        alert("Please enter the some text")
        return;
    }
cleargallery();
search=true;
searchImages(inputData,page);
})

function cleargallery(){
    document.querySelector(".display_images").innerHTML="";
    page=1;
}
async function CuratedPhotos(page){
    // fetch the data from api
    const data=await fetch(`https://api.pexels.com/v1/curated?page=${page}`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: accessKey,         //use the apikey you have generated
        },
    });
    const response=await data.json();     //convert the response to json 
    console.log(response);

    display_images(response);            // call the display_images method to display the images on page
}

function display_images(response){
    //use forEach loop to iterate on each item
    response.photos.forEach((image) => {
        const photo=document.createElement("div");
        photo.innerHTML=`<img src=${image.src.large}>
        <figcaption> Photo By: ${image.photographer}📸</figcaption>`;
        document.querySelector(".display_images").appendChild(photo);
    });
}

async function searchImages(query,page){
    
    const url = await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page}`, 
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: accessKey,
        },
    } );
    
   
    const response = await url.json();
    console.log(response)
    display_images(response);
}
showMore.addEventListener("click", ()=>
{
    if(!search){
        page++;
        CuratedPhotos(page)
    }
    else{
        if(inputData.value==="")
        return;
        page++;
        searchImages(inputData,page);
    }
})
CuratedPhotos(page);