const fetch = require('cross-fetch');
// console.log(typeof fetch);

fetch('https://dummyapi.io/data/v1/post?limit=1000', {
    headers: {
        'app-id': '6292241aa0ee027ca530816c'
    }
})
    .then(response => response.json())
    .then(data => getMax(data))
    .catch(error => console.error(error))

function getMax(data) {
    // how many likes did the most liked post get?
    const maxLikes = Math.max(...data.data.map(data => data.likes))
    console.log(`The max number of likes on a post is: ${maxLikes}`)

    const sortByFrequency = (array) => {
        var frequency = {}
        array.forEach(function (value) { frequency[value] = 0 })
        var unique = array.filter(function (value) {
            return ++frequency[value] == 1
        })
        return unique.sort(function (a, b) {
            const y = frequency[b] - frequency[a]
            return y
        })
    }

    // what are the top 5 tags used?
    const tagArray = data.data.map(data => data.tags)
    const flatArray = tagArray.flat()
    const topFiveTags = sortByFrequency(flatArray).slice(0, 5)
    console.log('The top five tags are', topFiveTags)

    // who had the most posts?
    const authorArray = data.data.map(data => `${data.owner.firstName} ${data.owner.lastName}`)
    const topAuthor = sortByFrequency(authorArray).slice(0, 1)
    console.log(`The author with the most posts is: ${topAuthor}`)

    // which day had the most posts?
    const publishDateArray = data.data.map(data => data.publishDate)
    const publishDateSplit = []

    for (var i = 0; i < publishDateArray.length; i++) {
        var split = publishDateArray[i].split("T");
        publishDateSplit.push(split[0])
    }
    const topPublishDate = sortByFrequency(publishDateSplit).slice(0, 1)
    console.log(`The date with the most published posts is: ${topPublishDate}`)

}