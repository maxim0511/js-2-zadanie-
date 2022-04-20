const API_KEY = 'dfedc326b45bf08db4593a892a7523d7';
const BASE_URL ='https://api.themoviedb.org/';
const LANGUAGE='en-US';
const btn = document.querySelector('.header_search_btn');
const pagination=document.querySelector('.pagination');
const currentPageText = document.querySelector('.currentPage');
let paramSearch = document.querySelector('.header_search_Input');
let content = document.querySelector('.content_container');
let htmlContent='';
let pagin='';
let page=0;

const getContent = async(query='a',page=1)=>{
    window.scrollTo(0,0);
    try{
        const requset =await fetch(BASE_URL+`/3/search/collection?api_key=${API_KEY}&query=${query}&language=${LANGUAGE}&page=${page}`);
        const response =await requset.json();
        htmlContent='';
        pagin='';
        currentPageText.innerHTML=`Выбранная страница:${page}`
        if (response.results.length == 0) {
            htmlContent=`<span class='NoItem'>Ничего не найдено...</span>`
        } 
        if (response.total_pages < page){
            return htmlContent
        }
         else {
            response.results.map(({name,poster_path,overview}) => {         
                htmlContent+=`<div class="content_item">
                            <h2 class="name">${name}</h2>
                            <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="" class="img">
                            <div><p class="description">${overview}</p></div>
                        </div>`
            });     
            for(let i=1;i<=(Math.ceil(response.total_results / response.results.length));i++){
                pagin+=`
                    <button class="pag_item" onclick="SetPage(${i})">${i}<button/>
                `
            }
        }   
        pagination.innerHTML=pagin
        content.innerHTML = htmlContent;
    }
    catch(error){
        console.log(error);
    }
}
function SetPage(currentPage){
    if (paramSearch.value == ''){
        getContent('a',page=currentPage)
    } else {
        getContent(paramSearch.value,page=currentPage)
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
btn.removeEventListener('click',valueSearch);