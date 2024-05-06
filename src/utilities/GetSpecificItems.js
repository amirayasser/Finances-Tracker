// Function to get the latest 3 items
export const getLatestItems = (items, itemsNums = 3)=>{
    return items.slice(0,itemsNums)
}


// Function to filter items for today
export const getTodayItems = (items)=>{

    const today = new Date().toISOString().split('T')[0];
    /*
    .split("T") splits the string at the "T" character,
    resulting in an array with two elements: ["2024-04-30", "12:00:00.000Z"].
    dateParts[0] accesses the first element of the dateParts array,
    which contains the date part of the ISO string("2024-04-30").
        
    So, [0] is used to access the first element of an array.
    */
    
        console.log(today)

    return items.filter(item => item.date === today)
}