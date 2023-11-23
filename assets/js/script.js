window.onload = function () {
}

const app = {
}

// common
document.querySelectorAll('span[data-name]').forEach((obj, idx) => {
    obj.addEventListener('click', (e) => {
        const name = e.target.dataset.name;
        console.log(name);

        document.querySelectorAll('li[data-list]').forEach((obj, idx) => {
            const list = obj.dataset.list;
            console.log(list);
            if(name === "ALL"){
                obj.style.display = "block"
            }else{
                if(list.indexOf(name) !== -1) {
                    obj.style.display = "block"
                }else{
                    obj.style.display = "none"
                }
            }
        });
    });
});