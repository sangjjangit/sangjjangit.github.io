window.onload = function () {



    // nav click event
    const navElements = document.querySelectorAll('[data-nav-name]');
    for(let i =0; i < navElements.length; i++){
        navElements[i].addEventListener('click', app.asideToggle);

//app.asideToggle(navElements[i]);
    };



    // aside menu click event
    const elements = document.querySelectorAll('[data-aside-name]');
    for(let i =0; i < elements.length; i++){
        elements[i].addEventListener('click', app.toggleList);
    };

    document.querySelector('.menu-trigger').addEventListener('click', app.menuTrigger);
}

const app = {

asideToggle : function (event) {


        const navName = event.target.dataset.navName;

document.querySelectorAll('[data-aside-group]').forEach(function (obj, idx) {
                if(navName !== obj.dataset.asideGroup){
                    obj.style.display = "none";
                }else{
                    obj.style.display = "block";
                }
            });
},


    toggleList : function (event) {
        const asideName = event.target.dataset.asideName;
        if( asideName === "ALL"){
            document.querySelectorAll('[data-list-name]').forEach(function (obj, idx) {
                obj.style.display = "block";
            });
        }else{
            document.querySelectorAll('[data-list-name]').forEach(function (obj, idx) {
                if(asideName !== obj.dataset.listName){
                    obj.style.display = "none";
                }else{
                    obj.style.display = "block";
                }
            });
        }
    },
    menuTrigger : function (event) {
        console.log(document.querySelector('main').style.width)
        const mainWidth = document.querySelector('main').style.width;
        if(mainWidth === '' || mainWidth === '80%'){
            document.querySelector('main').style.width = '100%'
            document.querySelector('aside').style.width = '0%'
            document.querySelector('aside').style.padding = '0px'
        }else{
            document.querySelector('main').style.width = '80%'
            document.querySelector('aside').style.width = '20%'
            document.querySelector('aside').style.padding = '20px'
        }
    }
}