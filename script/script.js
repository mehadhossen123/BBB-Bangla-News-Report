const categoryParent = document.getElementById("categoryparent");
const newsContainer = document.getElementById("news-container");
const bookMarkContainer = document.getElementById("markContainer");
const bookCount = document.getElementById("bookMarkCount");
let bookMarks=[];

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
        showLoad()
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
    .catch((err)=>{
        showError(err);
        
    })

}
const showArticles=(articles)=>{
   if(articles.length===0){
     emptyMessage();
     return;
   }
    newsContainer.innerHTML="";
    
   articles.forEach(element=>{
   
     newsContainer.innerHTML += `
     <div class=" border border-gray-200 rounded-xl shadow-sm py-3"> 
      <div>
   <img src="${element.image.srcset[5].url}" alt=""/>
     </div>
    
    <div id="${element.id}" class="text-sm mt-2 mx-3">
     <h1 class="font-bold ">${element.title}</h1>
     <p>${element.time}</p>
     <button class="btn">Bookmarks</button>
    </div>
    
      </div>

     `;

   });

};
newsContainer.addEventListener('click',(e)=>{
   if(e.target.innerText==='Bookmarks'){
    const button=e.target;
    const textTitle=button.parentNode.children[0].innerText;
     const id=e.target.parentNode.id;
     bookMarks.push({
        title:textTitle,
        id:id


     })
    showBookmarsk(bookMarks);
    
     
      
   }
})
const showBookmarsk=(bookMarks)=>{
    bookCount.innerText=bookMarks.length;
    bookMarkContainer.innerHTML="";
   bookMarks.forEach(book=>{
      bookMarkContainer.innerHTML += `
      <div class="border py-2 mb-2"> <h1>${book.title}</h1>
      <button onclick="handleBookMark('${book.id}')" class="btn-xs btn">Delete</button>

      </div>
     
     
     `;
   })
    
}
const handleBookMark=(bookMarkId)=>{
    const filterBookMarks=bookMarks.filter(bookMark=>bookMark.id!==bookMarkId)
    bookMarks=filterBookMarks;
    showBookmarsk(bookMarks);
};
const showLoad=()=>{
    newsContainer.innerHTML = `
     <div class="text-red-500">Loading....</div>


    `;

}
const showError=()=>{
     newsContainer.innerHTML = `
     <div class="text-red-500">Something went wrong ....</div>


    `;
}
const emptyMessage=()=>{

 newsContainer.innerHTML = `
     <div class="text-red-500">No News found here  ....</div>


    `;
}

loadFunction();
loadNews("main");