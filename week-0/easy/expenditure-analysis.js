/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {

  let categoryTotals = [];

  transactions.forEach(transaction => {
    let { category, price } = transaction;

    let isCategory = false; // To check if the current category exists in categoryTotals or not
    categoryTotals.forEach(obj => {
      if (obj.category === category) {
        obj.totalSpent += price;
        isCategory = true;
      }
    })

    // If the category is not present in categoryTotals
    if(!isCategory){
      categoryTotals.push({ category: category, totalSpent: price });
    }

  });

  return categoryTotals;

}

module.exports = calculateTotalSpentByCategory;
