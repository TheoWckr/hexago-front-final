export const UtilsString = {
    /**
     *  Format string 'x ,y and z' to array [x,y,z]
     * @param formValue
     */
    formToArray(formValue : string): string[]{
       let splittedArrayAnd = formValue.split('and');
       let splittedArrayComa = splittedArrayAnd[0].split(',');
       if(splittedArrayAnd.length != 1)
           splittedArrayComa.push(splittedArrayAnd[1]);

        return splittedArrayComa;
    },
    /**
     * Format array [x,y,z] to 'x ,y and z'
     * @param arrayValue the array to transform
     */
    arrayToForm(arrayValue : string[]): string{
        let returnString ='';
        if (arrayValue.length == 1 ) return arrayValue[0];
        else if(arrayValue.length >=1 )
         arrayValue.forEach((value,index) => {
             returnString += value;
             if(index < arrayValue.length - 2)
                  returnString += ' ,';
             else if (index == arrayValue.length - 2 )
                 returnString += ' and ';
         } );
        return returnString;

    }
};
