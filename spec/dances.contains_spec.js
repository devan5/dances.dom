describe("dances.contains", function(){
	it("basic", function(){
		var elem = document.createElement("div");
		elem.setAttribute("id", "j_forContainsTest");
		document.body.appendChild(elem);
		expect(new DOM(document.body).contains(elem)).toEqual(true);
		document.body.removeChild(elem);
	});
	it("TextNode", function(){
		var elem = document.createElement("div");
		var textNode = document.createTextNode("...some info");
		elem.appendChild(textNode);
		expect(new DOM(document.body).contains(textNode)).toEqual(null);
	});
});