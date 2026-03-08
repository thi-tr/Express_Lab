const express = require('express');
const router = express.Router();
const {readFile, writeFile} = require('fs').promises; //Destructuring

router.get('/', (req, res)=>{
    res.send('Word Homepage');
});

router.get('/wotd', async (req, res)=>{
    let wordArray = await getWordFromDictionary();
    let [word, part, definition] = wordArray;
    res.render('wotd', {word:word, part:part, definition:definition});
});

router.get('/allwords', async (req,res)=>{
    let allWordArray = await getAllWordsFromDictionary();
    res.render('allwords', {word: allWordArray});
});

let getWordFromDictionary = async ()=>{
    try{
        const data = await readFile('resources/allwords.txt', 'utf8');
        let lines = data.split('\n');
        let randomNumber = parseInt(Math.random()*lines.length);
        let randomLine = lines[randomNumber];
        let wordArray = randomLine.split('\t');
        console.log(wordArray);
        return wordArray;
    } catch(err){
        console.log("There was an error reading the file:", err);
    }
};

let getAllWordsFromDictionary = async ()=>{
    try{
        const data = await readFile('resources/allwords.txt', 'utf8');
        let lines = data.split('\n');

        //allWordArray to prevent reference error
        let allWordArray = [];
        for(let i = 0; i < lines.length; i++){
            let wordArray = lines[i].split('\t');
            console.log(wordArray);
            allWordArray.push(wordArray);
        }
        return allWordArray;
    } catch(err){
        console.log("There was an error reading the file:", err);
    }
};

module.exports = router;