// Customer Object
var Customer = function (customerID, name, carRented) {
  if(typeof(customerID) == 'string' || Number){
  this.id = customerID;
} else {console.log("Wrong")};

  if(typeof(name) == 'string'){
  this.name = name;
} else {console.log("Wrong")};

  if(typeof(carRented) == 'object'){
  this.carRented = carRented;
} else {console.log("Wrong")};

};

// Car Object
var Car = function (carID, producer, model, rental) {
  this.carID = carID;
  this.producer = producer;
  this.model = model;
  this.rentalPricePerDay = rental;
//We do not call these out in the parenthese because they already have values
  this.availableCars = true;
  this.customer = null;
  this.rentalDuration = 0;
  this.quotePrice = function (rentalDuration) {
    return this.rentalPricePerDay * rentalDuration
  }
  this.reserve = function (customer, rentalDuration) {
    if (this.available === true) {
      this.availableCars = false;
      this.customer = customer;
      this.rentalDuration = rentalDuration;
      return true;
  } else {return false;
  }
}
  this.return = function () {
    if (this.availableCars === true) {
      return "Sorry, this car have already been returned.";
    } else {
      this.availableCars = true;
      this.customer = null;
      this.rentalDuration = null;
    }

  }

};

/* Whenever we define an object, we have to use a name as well as :, followed by a value,
so that the code knows that we are using an object
eg Hyundai.reserve({name: "Jon" },10)*/

/* Whenever we want to call a function, we still have to include the parenthese, even if
there is no parameters, so that we can call the function.*/

// Vendor Object
var Vendor = function(name) {
  this.name = name;
  this.cars = [];
  this.customers = [];

  this.findCarIndex = function (carID) {
    //we use findIndex because we might delete cars, and the index might move.
    return this.cars.findIndex(function(car){
      return car.id === carID ? true : false ;
    });
  };

  this.findCustomerIndex = function (customerID) {
    return this.customers.findIndex(function(customer){
      return customer.id === customerID ? true : false ;
    });
  };

  this.getCar = function (carID) {
    return this.cars.find(function(car){
      return car.id === carID ? true : false ;
    });
  };

  this.getCustomer = function (customerID) {
    return this.customers.find(function(customer){
      return customer.id === customerID ? true : false ;
    });
  };

  this.addCar = function (car) {
    //"car" in (car.ID) is the same as function (car)
    if (this.getCar (car.carID) === true) {
      console.log("ID already exists")
    } else {
      this.cars.push(car) // this.cars the array that belongs to Vendor
      console.log("Car added to warehouse")
    }
  }

  this.addCustomer = function (customer) {
    if (this.getCustomer (customer.customerID) === true) {
      console.log("ID already exists")
    } else {
      this.customers.push(customer)
      console.log("Customer added to warehouse")
    }
  }

  this.removeCar = function (car) {
    if (this.findCarIndex (car.carID) >= 0) {
      this.cars.splice(car)
      console.log("Car deleted")
    } else {
      console.log("Car not found")
    }
  }

  this.removeCustomer = function (customer) {
    if (this.findCustomerIndex (customer.customerID) >= 0) {
      this.customers.splice(customer)
      console.log("Customer deleted")
    } else {
      console.log("Customer not found")
    }
  }

  this.availableCars = function () {
      return availableCarsArray = this.cars.filter(function(eachCar){ /*return to
        this.availableCars*/
          //if each car is available, return car
          if (eachCar.available === true) {
            return eachCar; //this returns into var availableCarsAray
          }
      });
}

this.rentCar = function (customerID, rentalDuration) {
  var newAvailable = this.availableCars();
  if (newAvailable.length === 0) {
    console.log ("All our cars have been rented.");
  } else {
        var newCustomer = getCustomer(customerID);
  /* getCustomer function will return a value, so if newCustomer exists, there is a customer
  in the array */
    if (newCustomer) {
      newCustomer.carRented = newAvailable[0];
  /* first variable can be a function. as long as the second item is a property of function
  of the first one. */
      newCustomer.carRented.reserve (newCustomer, rentalDuration);
      console.log("The car has been reserved");
    }
    else {
      console.log("Please provide a valid customerID");
    }
    }
  }

this.returnCar = function (customerID) {
  var newCustomer = this.getCustomer(customerID);
  if (newCustomer) {
    //use find index here?
    newCustomer.carRented.return ();
    newCustomer.carRented = null;
    console.log("Thank you for using our service");
  } else {
    console.log("Please provide a valid customerID.");
  }
}

this.totalRevenue = function () {
  return var sum = this.cars.reduce(function(prevSum, currentSum) {
    return prevSum + (quotePrice * rentalDuration)
  }, 0);
}

}



// Codes you can run to test your code
var customerInfo = {
  id: "001",
  name: "Sherman"
};
var customerA = new Customer(customerInfo);

var carInfo = {
  id: "001",
  producer: "Toyota",
  model: "Subra",
  rentalPrice: 200,
};

var carA = new Car(carInfo);

var vendor = new Vendor('Jens Limited');
vendor.addCustormer(customerA);

console.log(vendor.availableCars());
vendor.addCar(carA);
console.log(vendor.availableCars());

vendor.rentCar(customerA.id, 5);
