const container = document.querySelector('.add-item');
var inputValue = document.querySelector('.input');
const add = document.querySelector('.add');

let suggestions = [];

class item{
	constructor(name){
		this.createItem(name);
	}
    createItem(name){
    	var itemBox = document.createElement('div');
        itemBox.classList.add('item');

    	var input = document.createElement('a');
    	input.innerHTML = name;
    	input.classList.add('item_input');

    	container.appendChild(itemBox);

        itemBox.appendChild(input);

    }
}

add.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
	if(e.which == 13){
		check();
	}
})

function check(){
	if(inputValue.value != ""){
		new item(inputValue.value);
        suggestions.push(inputValue.value);
		inputValue.value = "";
	}
}


for (var v = 0 ; v < suggestions.length ; v++){
    new item(suggestions[v]);
}


