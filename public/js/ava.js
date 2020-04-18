// Get screen width and height
var sWidth = screen.width;
var sHeight = screen.height;
var pixelRatio = window.devicePixelRatio

// set avatar pixel size
var avatarPixel = 200;

// calcualte total avatars can fit in a row, setting avatar image to 200px*200px
var rCount = Math.floor((sWidth * pixelRatio) / avatarPixel);

// calculate number of avatar rows to display on each load/scroll, setting to 1.5X screen height
var hCount = Math.floor((sHeight * pixelRatio) / avatarPixel);

// calculate total number of avatars to fetch from server
var aCount = (rCount) * hCount;

// global variable to hold all fetched avatar details from server
var avatars = [];

// global throttle variable, ideally should be in closure.
var throttle = true;

var loadingEle = document.getElementById('loading');
var unAvbEle = document.getElementById('error');

// Load avatars on intial load
window.addEventListener('load', function () {
    fetchAvatarsEmail(aCount);
});

// Fetch random generated email from server
async function fetchAvatarsEmail(count) {
    loadingEle.style.display = 'flex';
    throttle = false;
    var res = await fetch(`/api/list?count=${count}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            loadingEle.style.display = 'none';
            return data;
        });
    if (res['status']) {
        // Add fetched avatars to global list
        unAvbEle.style.display = 'none';
        avatars.push(res.avatars);
        appenedAvatarsToDOM(res.avatars);
    } else {
        unAvbEle.style.display = 'block';
        avatars.push(res.avatars);
        appenedAvatarsToDOM(res.avatars);
    }
    throttle = true;
}

// Append avatars to DOM
function appenedAvatarsToDOM(avatarEmails) {
    for (var avatar of avatarEmails) {
        var avatarsElement = document.querySelector('#avatars');
        var div = document.createElement('div');
        div.id = avatar['hash'];
        div.className = 'avatar';
        var image = document.createElement('img');
        image.src = `./images/${avatar['hash']}.png`;
        image.onerror = function (event) {
            this.src = './images/default/0.png';
        }
        image.className = 'avatar_image';
        image.style.display = 'block';
        div.appendChild(image);
        var detail = document.createElement('div');
        detail.innerHTML = avatar['email'];
        detail.className = 'avatar_detail';
        detail.style.display = 'none';
        div.appendChild(detail);
        avatarsElement.appendChild(div);
    }
}

// Global varialble to hold selected avatar
var selectedAvatar = null;

// Event listener for for showing details
document.getElementById('avatars').addEventListener('click', toggleDetails)

// event listener action function
function toggleDetails(e) {
    var parentElement = e.target.parentElement;
    if (!selectedAvatar) {
        selectedAvatar = parentElement;
        toggleTile(selectedAvatar);
    }
    else if (parentElement.className == 'avatar' && parentElement != selectedAvatar) {
        toggleTile(selectedAvatar);
        selectedAvatar = parentElement;
        toggleTile(selectedAvatar);
    }
    else if (selectedAvatar) {
        toggleTile(selectedAvatar);
        selectedAvatar = null;
    }
}

// toggle function
function toggleTile(element) {
    var cNodes = element.childNodes;
    toggle(cNodes[0]);
    toggle(cNodes[1]);

}

function toggle(element) {
    if (element.style.display == 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none'
    }
}

// Throttling and load more functions

window.onscroll = function () {
    var rootEle = document.documentElement;
    var offset = rootEle.scrollTop + window.innerHeight;
    var height = rootEle.offsetHeight;
    if (offset >= height) {
        if (throttle) {
            fetchAvatarsEmail(Math.floor(aCount/10)*3);
        }
    }
};