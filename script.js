function validateValues(lenPassword, pattern) {
    if (pattern.length > 0 && ((pattern.length > lenPassword) || (pattern.length === lenPassword))) {
        alert('Pattern is bigger or equal password length!');
        return false;
    } else if (lenPassword < 4 || lenPassword > 12) {
        document.getElementById('lenPassword').reset;
        alert('Please enter a value between 4 and 12');
    }
    return true;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genPassword(lenPassword, pattern) {
    const keys = ['lowercase', 'uppercase', 'numbers', 'symbols'];
    const haveToRender = keys.filter((item) => {
        if (document.getElementById(item).checked) {
            return item;
        }
    })
    console.log(haveToRender)
    
    const canRender = [
        { name: 'symbols', range: {start: 33, end: 47}},      // symbols
        { name: 'numbers', range: {start: 48, end: 57}},     // numbers
        { name: 'uppercase', range: {start: 65, end: 90}},     // uppercase
        { name: 'lowercase', range: {start: 97, end: 122}}      // lowercase
    ]

    let encodedPassword = "";

    for (let i = 0; i < lenPassword; i++) {
        const char = haveToRender[Math.floor(Math.random() * haveToRender.length)];
        const objChar = canRender.find((item) => {
            if (item.name === char) {
                return item;
            }
        });
        console.log(objChar.name, objChar.range);

        encodedPassword += getRandomInt(objChar.range.start, objChar.range.end);
        if (i != lenPassword -1) {
            encodedPassword += ',';
        }
    }
    console.log(encodedPassword);
    const password = encodedPassword// convert to string, ignore this if it's already a string
    .split(',') // split to array
    .map(String.fromCharCode) // convert to char code
    .join(''); // convert back to string

    document.getElementById('password').textContent = password;
}

function retrievePassword() {
    const lenPassword = parseInt(document.getElementById('lenPassword').value);
    const pattern = document.getElementById('pattern').value;

    if(validateValues(lenPassword, pattern)) {
        genPassword(lenPassword, pattern);
    }
}