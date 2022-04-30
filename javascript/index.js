const API_KEY = 'dfedc326b45bf08db4593a892a7523d7';
const BASE_URL ='https://api.themoviedb.org/';
const LANGUAGE='en-US';
const btn = document.querySelector('.header_search_btn');
const currentPageText = document.querySelector('.currentPage');
let paramSearch = document.querySelector('.header_search_Input');
let content = document.querySelector('.content_container');
let htmlContent='';
let page = 1;

const scrollHandler = async (e)=>{
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight)<10){
       await paramSearch.value == '' ? getContent('a',page+=1) : getContent(paramSearch.value,page+=1)
    }
} 

const getContent = async(query='a',page=1)=>{
    try{
        const requset =await fetch(BASE_URL+`/3/search/collection?api_key=${API_KEY}&query=${query}&language=${LANGUAGE}&page=${page}`);
        const response =await requset.json();
        if (response.results.length == 0) {
            htmlContent=`<span class='NoItem'>Ничего не найдено...</span>`
        } 
        if (response.total_pages <= page){
            return htmlContent
        }
         else {
            response.results.map(({name,poster_path,overview}) => {         
                htmlContent+=`<div class="content_item">
                            <h2 class="name">${name}</h2>
                            <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${name}" class="img">
                            <div><p class="description">${overview}</p></div>
                        </div>`
            });     
        }   
        content.innerHTML = htmlContent;
    }
    catch(error){
        console.error(error.message);
    }
}
function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
function Input(){
    htmlContent='';
    valueSearch();
}

const NewContent = debounce(() => Input());
  
function valueSearch(){
    if (paramSearch.value == ''){
        getContent()
    } else {
        getContent(paramSearch.value)
    }
}
valueSearch();

btn.addEventListener('click',valueSearch);
document.addEventListener('scroll',scrollHandler);
btn.removeEventListener('click',valueSearch);
document.removeEventListener('scroll',scrollHandler)