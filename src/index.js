class passwordGenerated {
    constructor(key, login, service) {
        this.key = key,
            this.login = login,
            this.service = service
    }

    convertAsciiToNum(str) {
        let charsToNum = []
        for (let i = 0; i < str.length; i++) {
            charsToNum.push(str[i].charCodeAt(0))
        }
        return charsToNum
    }

    getLong(key) {
        let arrCharCodes = this.convertAsciiToNum(key)
        let charValueOne = arrCharCodes[0]
        let charValueTwo = arrCharCodes[1]
        let applyCharValues = charValueOne + charValueTwo
        if (applyCharValues < 12) {
            while (applyCharValues <= 12) {
                let numToStr = charValueOne.toString()[0]
                applyCharValues = applyCharValues + (parseInt(Math.floor(numToStr / 2)))
                //console.log(applyCharValues + " Sumando hasta que de el resultado optimo")
            }
        }
        if (applyCharValues >= 20) {
            let numToStr = parseInt(charValueOne.toString()[0])
            /*if (numToStr > 3) {
                numToStr = numToStr + 3
            }*/
            while (applyCharValues >= 20) {
                applyCharValues = applyCharValues - numToStr
                //console.log(applyCharValues + " Restando hasta que de el resultado optimo")
            }

        }
        return applyCharValues
    }

    stringTol33t(str) {
        let strToEdit = str
        let l33t = []
        let l33tTable = [{ "key": "1", "value": "i" }, { "key": "4", "value": "a" },{"key" : "3", "value" : "E"},{"key" : "2", "value" : "u"},{"key" : "5", "value" : "S"},{"key" : "7", "value" : "t"},{"key" : "0", "value" : "o"}]
        for (let i = 0; i < strToEdit.length; i++) {
            let strI = strToEdit[i].toString()
            for(let k = 0 ; k < strI.length; k++){
                for(let j = 0 ; j < l33tTable.length;j++){
                    if(strI[k] == l33tTable[j].key){
                        l33t.push(l33tTable[j].value)
                        break;
                    }else{
                        l33t.push(strI[k])
                        break;
                    }
                }
            }
        }
        return l33t.join('')
    }

    getFirstPasswordPart(strLogin) {
        let reverseString = strLogin.split("").reverse().join("");
        let reverseStringToCharCode = this.convertAsciiToNum(reverseString)
        
        return this.stringTol33t(reverseStringToCharCode);

    }

    getSecondPasswordPart(strService) {
        let serviceStr = strService.split("").join("");
        let strToCharCode = this.convertAsciiToNum(serviceStr)
        return this.stringTol33t(strToCharCode)
    }

    finalPassword() {
        let finalPasswordValue = ""
        let longitude = this.getLong(this.key)
        let pw1 = this.getFirstPasswordPart(this.login);
        let pw2 = this.getSecondPasswordPart(this.service);

        let halfLongitude = Math.floor(parseInt(longitude) / 2)

        for(let i = 0 ; i < halfLongitude - 1 ; i ++){
            finalPasswordValue = finalPasswordValue + pw1[i]
        }
        for(let i = 0 ; i < halfLongitude - 1 ; i ++){
            finalPasswordValue = finalPasswordValue + pw2[i]
        }

        return finalPasswordValue
    }
}

let pw = new passwordGenerated('12', '1GiRzz', 'battl1e.net')
console.log(pw.finalPassword())

