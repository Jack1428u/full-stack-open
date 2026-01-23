const clean = (string) => {
        let new_string = "";
        for (let i = 0; i < string.length; i++) {
            if (string[i] != ' ') {
                new_string += string[i];
            }
        }
        return new_string.toLowerCase();
    }
export default clean