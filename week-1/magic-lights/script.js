window.addEventListener("click", function(){
	const randomColor = Math.floor(Math.random()*16777215).toString(16);
	const elementsToChange = document.querySelectorAll(".circle");
	for(let i=0; i<elementsToChange.length; i++) {
		const currentElement = elementsToChange[i];
		currentElement.style.background = "#" + randomColor;
	}
});