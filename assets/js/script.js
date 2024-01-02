// window.onload = function () {
//     this.addEventListener('hashchange', function () {
//         console.log('hashchange')
//         const pathname = window.location.search;
//         console.log(pathname)
//     }, false);
// }

// window.onload = function () {
//     document.querySelectorAll('#searchParam').forEach((obj, idx) => {
//         obj.addEventListener('keyup', (e) => {
//             console.log(e)
//             if(e.key === "Enter"){
//                 localStorage.setItem("search", document.getElementById('searchParam').value);
//                 //location.href = '/search?param='+document.getElementById('searchParam').value
//                 location.href = '/search';
//             }
//         });
//     });

//     const pathname = window.location.pathname;
//     console.log(pathname)
//     if( pathname.endsWith('search')){

//         const searchParam = localStorage.getItem('search');
//         document.getElementById('search-input').value = searchParam;
//         document.getElementById('search-input').focus();

//         window.simpleJekyllSearch.search(searchParam);

//         localStorage.clear();

//     }
// }

// console.log('aa')
// window.onload = function () {
//     // console.log('onload', window.location.href)
//     // console.log('onload', window.location.hostname)
//     // console.log('onload', window.location.pathname)
//     // console.log('onload', window.location.protocal)
//     // console.log('onload', window.location.assign)

//     const pathname = window.location.pathname;
//     if( pathname.endsWith('search')){
//         console.log('search page');
//         const searchParam = localStorage.getItem('search');
//         console.log(searchParam);
//         document.getElementById('searchKey').value = searchParam;
//         document.getElementById('searchKey').focus();
//         window.simpleJekyllSearch.search(document.getElementById('searchKey').value);
//         localStorage.clear();
//     }

//     document.getElementById('searchParam').addEventListener('keyup', (e) => {
//         console.log(e)
//         if(e.key === "Enter"){
//             localStorage.setItem("search", document.getElementById('searchParam').value);
//             //location.href = '/search?param='+document.getElementById('searchParam').value
//             location.href = '/search';
//         }
//     });

    

//     // common
//     // document.querySelectorAll('[data-value]').forEach((obj, idx) => {
//     //     obj.addEventListener('click', (e) => {
//     //         const value = e.target.dataset.value;
//     //         console.log(value);
//     //         test.setDataValue(value);

//     //         document.querySelectorAll('[data-list]').forEach((obj, idx) => {
//     //             const list = obj.dataset.list;
//     //             console.log(list);
//     //             if(value === list) {
//     //                 obj.style.display = "block"
//     //             }else{
//     //                 obj.style.display = "none"
//     //             }
//     //         });
//     //     });
//     // });
//     // document.querySelectorAll('[data-value]').forEach((obj, idx) => {
//     //     obj.addEventListener('click', (e) => {
//     //         const value = e.target.dataset.value;
//     //         test.setDataValue(value);
//     //         localStorage.setItem("value", value)
//     //     });
//     // });
// }