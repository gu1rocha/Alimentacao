var backParabens = document.querySelector('#backParabens')
var refresh = backParabens.querySelector('.refresh')
var boxInputs = document.querySelector('.boxInputs')


let array = ["arroz","carne","doces","feijao","frutas","pizza","refrigerante","sorvete","suco","verdura"]

let obj = [
  { name: 'arroz', status: "saudavel"},
  { name: 'carne', status: "saudavel"},
  { name: 'doces', status: "naoSaudavel"},
  { name: 'feijao', status: "saudavel"},
  { name: 'frutas', status: "saudavel"},
  { name: 'pizza', status: "naoSaudavel"},
  { name: 'refrigerente', status: "naoSaudavel"},
  { name: 'sorvete', status: "naoSaudavel"},
  { name: 'suco', status: "saudavel"},
  { name: 'verduras', status: "saudavel"}
]

let EmbaralharArray = newArray => { 
    for(let i = newArray.length -1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray
}

let gerarElementos = () =>{
    let classes = EmbaralharArray(obj);
    for(let i = 0; i < classes.length; i++){

        let div = document.createElement("div");
        boxInputs.appendChild(div)
        div.classList.add(classes[i].name);
        div.classList.add(classes[i].status);

	   let img = document.createElement("img");
	   img.src = `assets/img/${classes[i].name}.png`
	   div.appendChild(img);

       let inputSaudavel = document.createElement("input")
       inputSaudavel.type = "radio"
       inputSaudavel.value = "saudavel"
       inputSaudavel.name = classes[i].name
       inputSaudavel.id = classes[i].name+"saudavel"
	   div.appendChild(inputSaudavel);

       let labelSaudavel = document.createElement("label")
       labelSaudavel.htmlFor = classes[i].name+"saudavel";
       labelSaudavel.classList.add("saudavel");
	   div.appendChild(labelSaudavel);

       let inputNaoSaudavel = document.createElement("input")
       inputNaoSaudavel.type = "radio"
       inputNaoSaudavel.value = "naoSaudavel"
       inputNaoSaudavel.name = classes[i].name
       inputNaoSaudavel.id = classes[i].name+"naoSaudavel"
	   div.appendChild(inputNaoSaudavel);

       let labelNaoSaudavel = document.createElement("label")
       labelNaoSaudavel.htmlFor = classes[i].name+"naoSaudavel";
       labelNaoSaudavel.classList.add("naoSaudavel");
	   div.appendChild(labelNaoSaudavel);
    }
}

gerarElementos()

var labels = document.querySelectorAll("label");
var inputs = boxInputs.querySelectorAll("input");


refresh.addEventListener('click',()=>{
    document.querySelector("#audioComemorando").pause();
    document.querySelector("#audioComemorando").currentTime = 0;
    for(let label of labels){
        label.classList.remove("pequeno");
        label.classList.remove("medio");
        label.classList.remove("grande");
        label.classList.remove("acerto");
        label.classList.remove("erro");
    }
    backParabens.removeAttribute("style")
    gerarElementos();
})

let finalizar = () =>{
    backParabens.style.display = 'flex'
}

for(let input of inputs){
    input.addEventListener('click',(el)=>{
        document.querySelector("#audioErro").pause();
        document.querySelector("#audioErro").currentTime = 0;
        document.querySelector("#audioComemorando").pause();
        document.querySelector("#audioComemorando").currentTime = 0;
        el.path[1].querySelectorAll("label")[0].classList.add('respondido')
        el.path[1].querySelectorAll("label")[1].classList.add('respondido')
        if(el.path[1].classList[1] === el.target.value){
            document.querySelector(`label[for='${el.target.id}']`).classList.add('acerto')
            document.querySelector("#audioComemorando").play()
        }else{
            document.querySelector(`label[for='${el.target.id}']`).classList.add('erro')
            document.querySelector("#audioErro").play()
        }
    });
}