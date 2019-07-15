const mongoose = require('mongoose');
const seed = require('../seedData');
const Product = mongoose.model('products');
const Retailer = mongoose.model('retailers');
const Customer = mongoose.model('customers');
const CustomerOrder = mongoose.model('customerOrders')
let data = seed[0];

module.exports = (app) => {
    
    app.get('/api/helperRandom', async (req,res) => {
        let customerOrders = await CustomerOrder.find({});
        await customerOrders.forEach(async customerOrder => {
            customerOrder.productsStatus = new Map()
            customerOrder.status = 'Processed'
            await customerOrder.products.forEach(p => {
                customerOrder.productsStatus.set(p.toString(),false)
            })
            await customerOrder.save()
        })
        res.send('Done bosss')
    })
    
    
    
    
    
    
    
    
    
    app.get('/api/seedProduct', async (req,res) => {
        let Retailers = await Retailer.find({});
        let maxRandomNumber = Retailers.length;
        let randomProductIndex = Math.floor(Math.random() * Math.floor(seed[0].length));
        let randomRetailerIndex = Math.floor(Math.random() * Math.floor(maxRandomNumber));
        let choosedRetailer = Retailers[randomRetailerIndex];
        let productData = seed[0][randomProductIndex];
        productData.retailer = choosedRetailer._id
        let product = await new Product(productData).save()
        choosedRetailer.inventory.push(product._id);
        await choosedRetailer.save()
        res.send('Done babes .. ')
    })
}



// async function bruteAlgo (data,maxRandomNumber,Retailers,Product,mapRetailerToInventory,count) {
//     let response =  await data.reduce(async (acc=0,productData, index,array) => {

//         let randomIndex = Math.floor(Math.random() * Math.floor(maxRandomNumber));
//         let choosedRetailer = Retailers[randomIndex];
//         productData.retailer = choosedRetailer.id;
//         let product = await new Product(productData).save()
//         if(!mapRetailerToInventory[choosedRetailer.id]) mapRetailerToInventory[choosedRetailer.id] = [];
//         let num = await mapRetailerToInventory[choosedRetailer.id].push(product.id)
//         if (num) {
//             count++;
//             return acc+num
//         }

//     })
//     if(response) return count
// }

// async function gateway (data,maxRandomNumber,Retailers,Product,mapRetailerToInventory) {
//     let count = 0
//     count = await bruteAlgo(data,maxRandomNumber,Retailers,Product,mapRetailerToInventory, count);
//      console.log(`
//      Count : ${count}
//      mapRetailerToInventory : ${mapRetailerToInventory}
//      `)
//      if (count !== 49){
//         let deleteCount = await Product.deleteMany({})
//         mapRetailerToInventory = {}
//         if(deleteCount) {
//             return await gateway(data,maxRandomNumber,Retailers,Product,mapRetailerToInventory)
//         }
//      } else {
//          return count
//      }
    
// }

// module.exports = (app) => {
//     app.get('/api/seed',async (req,res) => {
//         let Retailers = await Retailer.find({});
//         let maxRandomNumber = Retailers.length;
//         let mapRetailerToInventory = {}
//         let holder = await gateway(data,maxRandomNumber,Retailers,Product,mapRetailerToInventory)
//         if(holder){
//             console.log(`
//             Returned Inventory :  ${mapRetailerToInventory}
//             `)
//             let inventory = []
//             await  Retailers.forEach(async (retailer) => {
//                 inventory = mapRetailerToInventory[retailer.id]
//                 let condition = await Retailer.findByIdAndUpdate(retailer.id,{inventory :inventory }, {new : true})
//                 if(condition) return ; 
//             })
//             res.send('Done : in a few seconds')
//             return ;
//         } 
//     })

//     app.get('/api/deleteSeed' , async (req,res) => {
//         let inventory = []
//         let Retailers = await Retailer.find({})
//         await  Retailers.forEach(async (retailer) => {
//                 let condition = await Retailer.findByIdAndUpdate(retailer.id,{inventory :inventory }, {new : true})
//                 if(condition) return ; 
//         })
//         res.send('Done deletion and removal')
//     })

//     app.get('/api/customerProblem',async  (req,res) => {
//         let Customers = await Customer.find({});
//         await Customers.forEach(async (customer) => {
//             customerOrders = ['5d2716efb0929d2f5c545c3b','5d271a378748e51b889d14eb','5d271b852f938622a466ed2b','5d271d40cbea2c353c1cde5d']
//             let condition = await Customer.findByIdAndUpdate(customer.id,{cartQuantity : {}, customerOrders : customerOrders , cart : []},{new: true})
//             if (condition) return;
//         })
//         res.send('Customer Problem Probably solved')
//     })
// }



