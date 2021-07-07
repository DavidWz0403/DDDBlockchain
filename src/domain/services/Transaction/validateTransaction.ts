

export const validateTransaction = (amount, balance):boolean => {
    if(amount < balance){
        return true
    }
}