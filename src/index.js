class passwordGenerated {
    constructor(key, login, service) {
        this.key = key;
        this.login = login;
        this.service = service;

        this.l33tTable = new Map().set('1', 'i').set('4', 'a').set('3', 'E').set('2', 'u').set('5', 'S').set('7', 't').set('0', 'o');
    }

    convertAsciiToNum(str) {
        str = String(str) || '00';

        if(str.length == 1) {
            str += str;
        }

        return str.split('').map(x => x.charCodeAt());
    }

    getLong(key) {
        let [a, b] = this.convertAsciiToNum(key);
        let r = a + b;
        let n = Number(String(a)[0]);

        while(r <= 12 ) {
            r += Math.floor(n / 2);
        }

        while(r >= 20) {
            r -= n;
        }
        
        return r;
    }

    stringTol33t(str) {
        str = str.join('');

        for(let [k, v] of this.l33tTable.entries()) {
            str = str.replace(RegExp(k, 'g'), v);
        }

        return str;
    }

    getFirstPasswordPart(strLogin) {
        let reverseString = strLogin.split("").reverse().join("");
        let reverseStringToCharCode = this.convertAsciiToNum(reverseString);
        
        return this.stringTol33t(reverseStringToCharCode);
    }

    getSecondPasswordPart(strService) {
        let strToCharCode = this.convertAsciiToNum(strService);

        return this.stringTol33t(strToCharCode);
    }

    finalPassword() {
        let halfLongitude = this.getLong(this.key) / 2;
        let pw1 = this.getFirstPasswordPart(this.login);
        let pw2 = this.getSecondPasswordPart(this.service);

        return pw1.substring(0, halfLongitude) + pw2.substring(0, halfLongitude);
    }
}

let pw = new passwordGenerated('12', '1GiRzz', 'battl1e.net')
console.log(pw.finalPassword())

