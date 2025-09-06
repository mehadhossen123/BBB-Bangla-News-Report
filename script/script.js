const categoryParent = document.getElementById("categoryparent");
const newsContainer = document.getElementById("news-container");

const loadFunction=()=>{
    const url = "https://news-api-fs.vercel.app/api/categories";
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        const category=data.categories;
        // console.log(category);
      
        showDisplay(category);
        
        
    });
};

const showDisplay = (category) => {
  category.forEach((element) => {
    const titles = element.title;
    categoryParent.innerHTML += `
         <li id="${element.id}" class="hover:border-b-4 hover:border-blue-400 cursor-pointer">${titles}</li>
        `;
  });

  categoryParent.addEventListener("click",(e)=>{
    // console.log(e.target.id);
    
    const allLi=document.querySelectorAll("li");
    allLi.forEach(li=>{
        li.classList.remove('border-b-4');
    })
  
    
    if(e.target.localName=="li"){
        e.target.classList.add('border-b-4');
        loadNews(e.target.id);

        
    }
   
     
  });

};
const loadNews=(newsId)=>{
    // console.log(newsId);
    const url =`https://news-api-fs.vercel.app/api/categories/${newsId}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        showArticles(data.articles);
       

    })

}
const showArticles=(articles)=>{
    newsContainer.innerHTML="";
    
   articles.forEach(element=>{
   
     newsContainer.innerHTML += `
     <div> 
      <div>
   <img src="${element.image.srcset[5].url}" alt=""/>
     </div>
     <h1>${element.title}</h1>
    
      </div>

     `;

   });

};

loadFunction();