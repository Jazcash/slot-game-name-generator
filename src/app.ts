import "styles.scss";

import adjectives from "../data/adjectives.json";
import Animals from "animals";
import pluralize from "pluralize";

const btnGenerate = document.getElementById("btnGenerate");
const txtName = document.getElementById("txtName");
const animals = Animals.words;

btnGenerate.addEventListener("click", () => generateName());

generateName();

function generateName(){
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const letter = adjective[0];
    const possibleAnimals = animals.filter(animal => animal[0] === letter);

    if (possibleAnimals.length === 0){
        generateName();
        return;
    }

    const animal = possibleAnimals[Math.floor(Math.random() * possibleAnimals.length)];
    const pluralAnimal = pluralize(animal);

    txtName.innerHTML = `${toTitleCase(adjective)} ${toTitleCase(pluralAnimal)}`;
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}