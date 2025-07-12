const apiUrlBooks = 'http://localhost:8080/show/books'; // 书籍后端API地址
const apiUrlMovies = 'http://localhost:8080/show/films'; // 电影后端API地址
const apiUrlSearchMovies = 'http://localhost:8080/show/searchMovies' //搜索api地址
const apiUrlSearchBooks = 'http://localhost:8080/show/searchBooks'
const apiUrlsbNumber ='http://localhost:8080/show/searchBooksNumber'
const apiUrlsfNumber = 'http://localhost:8080/show/searchFilmsNumber'
let currentPage = 1;
const itemsPerPage = 9;
let currentApiUrl = apiUrlBooks; // 默认展示书籍

document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.getElementById('items-container');
    const searchBtn = document.getElementById('search-btn');
    const searchType = document.getElementById('search-type');
    const searchBar = document.getElementById('search-bar');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const booksBtn = document.getElementById('books-btn');
    const moviesBtn = document.getElementById('movies-btn');
    var searchQuery = document.getElementById('search-bar');
    let pageNumber
    let FpageNumber
    axios.get(`/show/filmsNumber`).then(result=>{
            FpageNumber=result.data.data;
    });
    let BpageNumber
    axios.get(`/show/booksNumber`).then(result=>{
        BpageNumber=result.data.data;
    });
    let SFpageNumber
    let SBpageNumber

    const fetchData = async (page = 1, query = '', apiUrl = currentApiUrl) => {
        try {
            const response = await axios.get(`${apiUrl}?page=${page}&filmName=${query}`);
            // const response = await axios.get(apiUrl,{
            //     params:{
            //         page: page,
            //         size: 10,
            //         query: query//搜索栏传参
            //     }
            // })
           if(apiUrl === apiUrlSearchMovies){
               // axios({
               //     method : "get",
               //     url : "http://localhost:8080/show/searchFilmsNumber",
               //     filmName1: query
               // }).then(result=>{
               //     SFpageNumber = result.data.data;
               // })
               axios.get(`http://localhost:8080/show/searchFilmsNumber?filmName1=${query}`).then(result=>{
                   SFpageNumber = result.data.data;
                   pageNumber = SFpageNumber;
               })
           }
           else if(apiUrl === apiUrlSearchMovies){
               axios.get(`http://localhost:8080/show/searchBooksNumber?filmName1=${query}`).then(result=>{
                   SBpageNumber = result.data.data;
                   pageNumber = SBpageNumber;
               })
           }
            // console.log(query);
            const  data  = response.data.data;
            // console.log(page);
            // console.log(response.data);
            // console.log(currentApiUrl);
            itemsContainer.innerHTML = '';
            for(let i = 0 ;i< data.length;i++){
                let item= data[i];
                const itemElement = document.createElement('div');
                itemElement.classList.add('item');

                // console.log(item);
                if(apiUrl === apiUrlMovies){
                itemElement.innerHTML = `
                    <img src="${item.filmImg}" alt="${item.filmName}">
                    <h3>${item.filmName}</h3>
                `;
                }
                else if(apiUrl === apiUrlBooks){
                    itemElement.innerHTML = `
                    <img src="${item.bookImg}" alt="${item.bookName}">
                    <h3>${item.bookName}</h3>
                `;
                }
                else if(apiUrl === apiUrlSearchMovies){
                    itemElement.innerHTML = `
                    <img src="${item.filmImg}" alt="${item.filmName}">
                    <h3>${item.filmName}</h3>
                `;
                }
                else if(apiUrl === apiUrlSearchBooks){
                    itemElement.innerHTML = `
                    <img src="${item.bookImg}" alt="${item.bookName}">
                    <h3>${item.bookName}</h3>
                `;
                }

                itemsContainer.appendChild(itemElement);

                itemElement.addEventListener("click", function ()
                    {
                        if(apiUrl === apiUrlMovies){
                            sessionStorage.setItem("classify","Film");
                            sessionStorage.setItem("resourceId",item.filmId);
                        }
                        else if(apiUrl===apiUrlBooks){
                        sessionStorage.setItem("classify","Book");
                        sessionStorage.setItem("resourceId",item.bookId);
                        }
                        else if(apiUrl===apiUrlSearchBooks){
                            sessionStorage.setItem("classify","Book");
                            sessionStorage.setItem("resourceId",item.bookId);
                        }
                        else if(apiUrl===apiUrlSearchMovies){
                            sessionStorage.setItem("classify","Film");
                            sessionStorage.setItem("resourceId",item.filmId);
                        }
                        window.location.href = "detailstage.html";
                    }
                )
                if(apiUrl === apiUrlMovies){
                    pageNumber = FpageNumber;
                }
                else if(apiUrl === apiUrlBooks){
                    pageNumber = BpageNumber;
                }
                else if(apiUrl === apiUrlSearchMovies){
                    pageNumber = SFpageNumber;
                }
                else if(apiUrl === apiUrlSearchBooks){
                    pageNumber = SBpageNumber;
                }
            }
            // console.log(query);
            // console.log(currentApiUrl);
            // console.log(pageNumber);
            prevPageBtn.disabled = page === 1;
            nextPageBtn.disabled = page === Math.ceil((pageNumber)/10);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // 初次加载数据
    fetchData(currentPage);

    // 分页按钮点击事件
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchData(currentPage, searchBar.value);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if(currentPage< Math.ceil(pageNumber/10))
        currentPage++;
        fetchData(currentPage, searchBar.value);

    });

    // 搜索栏输入事件
    searchBtn.addEventListener('click', () => {
        currentPage = 1;
        currentApiUrl = searchType.value === 'books' ? apiUrlSearchBooks : apiUrlSearchMovies;
        fetchData(currentPage, searchBar.value, currentApiUrl);
    });
    // 书籍按钮点击事件
    booksBtn.addEventListener('click', () => {
        currentApiUrl = apiUrlBooks;
        currentPage = 1;

        fetchData(currentPage, searchBar.value, currentApiUrl);
    });

    // 电影按钮点击事件
    moviesBtn.addEventListener('click', () => {
        currentApiUrl = apiUrlMovies;
        currentPage = 1;
        fetchData(currentPage, searchBar.value, currentApiUrl);
    });
});
