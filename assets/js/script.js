// const currentLocation = location.href;
// const navItems = document.querySelectorAll("nav a");

// navItems.forEach(item => {
//     if(item.href === currentLocation){
//         item.classList.add("active");
//     }
// });

SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '/assets/json/search.json',
    searchResultTemplate: '<li><a href="{url}" title="{desc}" target="_blank">{title}</a></li>',
    noResultsText: '검색결과가 존재하지 않습니다.',
    limit: 10000,
    fuzzy: false,
    exclude: ['Welcome']
});