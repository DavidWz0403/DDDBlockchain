export const calculateWithdrawBalance = (amount, withdrawBalance) => {
    withdrawBalance -= amount;
    return withdrawBalance; 
}