// window.onload = function () {
//     // // alert('test');
//     const homeId = document.getElementById('homeId');
//     // alert(homeId);
//     // homeId.innerHTML = 'hi homeId, Hello World!!'

//     // // const navId = document.getElementById('navId');
//     // // alert(navId);
//     // // navId.innerHTML = 'hi navId, navvvvvvvvvvv';

//     const navId = document.querySelector('#navId');
//     // alert(navId);
//     // navId.innerHTML = 'hi navId, navvvvvvvvvvv';
//     // alert(app.home(homeId.id));
//     //alert(app.home(navId.id));
//     console.log(app);
//     app.innerHTML(homeId);
//     app.innerHTML(navId);

//     // alert();
//     console.log(app2);
//     console.log(app2.home(homeId.id));
//     console.log(app2.home(navId.id));
//     app2.innerHTML(homeId);
//     app2.innerHTML(navId);

// }
// const app2 = {
//     home: function (id) {
//         return id + 'is this app2';
//     }
//     , innerHTML: function (obj) {
//         obj.innerHTML = obj.id + " is this app2";
//     }
// };
// const app = (function() {
//     /* 실행코드 */
//     const home = function (id) {
//         return id + 'is this';
//     }
//     const innerHTML = (obj) => {
//         obj.innerHTML = obj.id + " is this";
//     }
//     return {home, alert, innerHTML};
// }());