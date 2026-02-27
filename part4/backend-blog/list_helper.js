const logger = require('./utils/logger')
const dummy = (array) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    return !array.length ? 1 : (reduce(reducer, 0) / array.length)
}

const totalLikes = (array) => {
    const reducer = (sum, item) => sum + item.likes
    return array.length ? array.reduce(reducer, 0) : 0
}

const favoriteBlog = (array) => {
    if (!array.length) {
        return 0;
    }
    let blogMax = array[0];

    for (let i = 0; i < array.length; i++) {
        array[i].likes > blogMax.likes ? blogMax = array[i] : blogMax;
    }
    return blogMax;
}

const mostBlog = (array) => {
    let better;
    let maxFrequency = 0;
    let frequency;
    let temp;
    for (let i = 0; i < array.length; i++) {
        temp = array[i];
        frequency = 0;
        for (let j = 0; j < array.length; j++) {
            if (temp.author === array[j].author) {
                frequency++;
            }
        }
        if (frequency > maxFrequency) {
            maxFrequency = frequency;
            better = temp;
        }
    }
    logger.info("BETTER: \n",better, "MAXFRECUENCY: \n",maxFrequency);
    return {
        author:better.author,
        blogs: maxFrequency,
    }
}

const mostLikes = (array)=>{
    let maxFrequency = 0;
    let frequency;
    let better;
    let temp;
    for(let i=0;i<array.length;i++){
        temp = array[i];
        frequency = 0;
        for(let j=0;j<array.length;j++){
            if(array[j].author === temp.author){
                frequency += array[j].likes;
            }
        }
        if(frequency > maxFrequency){
            maxFrequency = frequency;
            better=temp;
        }
    }
    return {
        author:better.author,
        likes:maxFrequency,
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog,
    mostLikes,
}