let loader = '<p>Loading doggos from the web...</p>';
document.getElementById('output').innerHTML = loader;

const fetchData = async () => {
    try {
        const resp = await fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=dog&api_key=795e25298b0974e961992509b8830632&format=json');

        const data = await resp.text();

        const photoList = JSON.parse(data.slice(14, -1)).photos.photo

        Object.keys(photoList).forEach(photo => {
            output += `
            <img width="100%" height="*" src="https://farm${photoList[photo].farm}.staticflickr.com/${photoList[photo].server}/${photoList[photo].id}_${photoList[photo].secret}.jpg">
            `;
        });
        document.getElementById('output').innerHTML = output;
    } catch(err){
        console.error(err, 'hmmm something happened');
        loader = '<p>No doggos found :( </p>';
        document.getElementById('output').innerHTML = loader;
    }
}

fetchData()