import { adjectives, nouns } from "./Word"

export const generateSecret = () =>{
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}