// ROZWIAZANIE LABU 6,7
(function () {
    var submit_button = document.getElementById("submit_button");
    var from_el = document.getElementById("skad");
    var to_el = document.getElementById("dokad");
    var name_el = document.getElementById("imie");
    var surname_el = document.getElementById("nazwisko");
    var date_el = document.getElementById("data_lotu");
    document.querySelector(".content_container > form:nth-child(5)").addEventListener('input', function (ev) {
        var todays_date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        var input_date = new Date(date_el.value);
        if (from_el.value !== ""
            && to_el.value !== ""
            && name_el.value !== ""
            && surname_el.value !== ""
            && input_date >= todays_date) {
            submit_button.removeAttribute("disabled");
        }
        else {
            submit_button.setAttribute("disabled", "true");
        }
    });
    submit_button.addEventListener("click", function (ev) {
        ev.preventDefault();
        var el = document.createElement("div");
        el.setAttribute("id", "potwierdzenie_rezerwacji");
        el.innerHTML =
            name_el.value +
                " " +
                surname_el.value +
                ": rezerwacja dokonana na dzień " +
                date_el.valueAsDate;
        document.querySelector("body").appendChild(el);
    });
})();
// ----------------------------------------------------------------------
/*

type Pilot = string;
interface ILotnisko {
    [nazwa: string]: [string, number[]];
}
interface ILiniaLotnicza {
    piloci: Pilot[];
    lotniska: ILotnisko; // juz mapa wiec tablica par
}
let jsonString: string = `{

    "piloci": [

        "Pirx",

        "Exupery",

        "Idzikowski",

        "Główczewski"

    ],

    "lotniska": {

        "WAW": ["Warszawa", [3690, 2800]],

        "NRT": ["Narita", [4000, 2500]],

        "BQH": ["Biggin Hill", [1802, 792]],

        "LBG": ["Paris-Le Bourget", [2665, 3000, 1845]]

    }

}`;

let jsonZły: string = `{

    "lotniska": {

        "WAW": ["Warszawa", [3690, 2800]],

        "NRT": ["Narita", [4000, 2500]],

        "BQH": ["Biggin Hill", [1802, 792]],

        "LBG": ["Paris-Le Bourget", [2665, 3000, 1845]]

    }

}`;

function sprawdzDaneLotniska(arg: any): arg is ILotnisko {
    if(typeof(arg) !== "object") {
        return false;
    }
    // tslint:disable-next-line: forin
    for(const nazwa in arg) { // po kluczach
        if(typeof(nazwa) !== "string"
            || !Array.isArray(arg[nazwa])
            || arg[nazwa].length !== 2
            || typeof(arg[nazwa][0] !== "string"
            || Array.isArray(arg[nazwa][1]))) {
            return false;
        }
        const tablica = arg[nazwa][1];
        for(const numerek of tablica) {
            if(typeof(numerek) !== "number") return false;
        }
    }
    return true;
}

function sprawdzDaneLinii(dane: any): boolean {
    if(typeof(dane) !== "object"){
        return false;
    }

    if(dane.piloci && Array.isArray(dane.piloci)){
        for (const pilot of dane.piloci) { // po wartosciach
            if(typeof(pilot) !== "string"){
               return false;
            }
        }
    }else{
        return false;
    }
    if(dane.lotniska) return sprawdzDaneLotniska(dane.lotniska);
    return false;
}



let daneLiniiLotniczej: ILiniaLotnicza = JSON.parse(jsonString);
if(sprawdzDaneLinii(daneLiniiLotniczej)) {
    const juzNaPewnoDaneLinii = daneLiniiLotniczej;
    console.log(juzNaPewnoDaneLinii);
    console.log(juzNaPewnoDaneLinii.piloci.length);
} else {
    console.log("odrzucono poprawny input");
}

let złeDane: ILiniaLotnicza = JSON.parse(jsonZły);
if(sprawdzDaneLinii(złeDane)) {
    const niePowinno = złeDane;
    console.log(niePowinno);
    console.log(niePowinno.piloci.length);
} else {
    console.log("rozponano poprawnie zły inputt");
}



function zaloguj(...komunikaty: string[]) {

    console.log("Ależ skomplikowany program!", ...komunikaty);

}
zaloguj("Ja", "cię", "nie", "mogę");


function wait(ms: number) {
    return new Promise((resolve, reject) => {
        window.setTimeout(resolve, ms);
    });
}

async function teczoweKolory5(el: HTMLElement) {
    const colors = ['red', 'blue', 'orange'];
    for(const color of colors) {
        await wait(1000);
        console.log(color);
        el.style.backgroundColor = color;
    }
}



'use strict';
let opoznienie = document.getElementById("opoznienia");
let rezerwacje = document.getElementById("reservation_form");
opoznienie.addEventListener('click', pokoloruj);
rezerwacje.addEventListener('click', pokoloruj);

function pokoloruj(ev: MouseEvent) {
    let target = ev.target;
    let elem = this as HTMLElement;

    console.log(elem, target);

    let currentColor = window.getComputedStyle(elem).getPropertyValue('background-color');
    let [_,...colorsAsText] = /rgb\((\d+),[^0-9]*(\d+),[^0-9]*(\d+)\)/.exec(currentColor);
    let colors: number[] = [];
    for(let i = 0; i < 3; i++) colors[i] = (parseInt(colorsAsText[i]) + 0x20) % 256;
    elem.style.backgroundColor = `rgb(${colors[0]},${colors[1]},${colors[2]})`;
}

let logo = document.getElementById("logo");
logo.addEventListener('click', wywolywacz_fib);

function fib() {
    var a = 1;
    var b = 1;
    function next() {
        var tmp = b;
        b = a + b;
        a = tmp;
        return b;
    }
    return next
}
var f = fib();

function wywolywacz_fib(ev: MouseEvent) {
    console.log(f());
}
 */
