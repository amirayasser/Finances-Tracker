// Function to calculate total income
export const calculateTotalIncome = (items) => {
 return items.reduce((total, item)=>{
    if(item.type === 'income'){
        return total + item.amount;
    }
    return total;
 },0)

}


// Function to calculate total expenses
export const calculateTotalExpenses = (items) => {
    return items.reduce((total, item) => {
        if (item.type === "expense") {
            return total + item.amount;
        }
        return total;
    }, 0);
};


// Function to calculate the income to expenses ratio
export const calculateRatio = (income, expenses) => {
    // if (expenses === 0) {
    //     return income > 0 ? income : 0;
    // }
    return Math.abs(expenses) / income;
};