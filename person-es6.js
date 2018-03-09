export class Address {
    constructor(address) {
        this.line1 = '';
        this.zipCode = null;
        this.city = null;
        this.state = null;

         // populate the address
        this.initializeAddress(address);
    }
    
    /**
     * @description initialize the address' values
     * @param {Object} address 
     */
    initializeAddress(address) {
        if(address) {
            this.line1 = address.line1;
            this.zipCode = address.zipCode;
            this.city = address.city;
            this.state = address.state;
        }
    }

    /**
     * @description Api call to save address
     */
    saveAddress(callback) {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve('Successful');
            }, 3000);
        });       
    }
}

// Phone Object
export class Phone {
    constructor(number = '', type = 'cell') {
        this.number = number;
        this.type = type;
    }   
}

// Person Object
export class Person {
    constructor(address, phone1, phone2) {
        this.name = '';
        this.age = null;
        this.address = null;
        this.phones = [];
    
        // populate the address
        if(address) {
            this.address = new Address(address);
        }
    
        // populate the phone numbers
        this.addPhone(phone1);
        this.addPhone(phone2);
    }

    /**
     * @description add a new phone to the person
     */
    addPhone(phone) {
        if(phone) {
            const { number, type } = phone;
            this.phones.push(new Phone(number, type));
        }
    }

    /**
 * @description get a phone number by type, assuming there is only one phone number type per phone object
 */
    findPhoneByType(phoneType) {
        // iterate over the phones until we find the matching type
        return this.phones.find(function(phone) {
            return phone.type === phoneType;
        })
    }

    /** 
     * @description friendly display of an address
    */
    printAddress() {
        if(this.address === null) {
            return '';
         
        }

        return `${this.address.line1}
            ${this.address.city}, ${this.address.state}, ${this.address.zipCode}`;
    }
}

// Employee Object
export class Employee extends Person {
    constructor(address, phone1, phone2) {
        super(address, phone1, phone2);
        this.id = Math.floor(Math.random() * Date.now()) ;
        this.position = '';
        this.hourlyRate = 10;
        this.hoursPerWeek = 40;
    }    

    /**
     * @description calcute an employee's salary including the quarterly bonus
     * @param {number} bonus1 
     * @param {number} bonus2 
     * @param {number} bonus3 
     * @param {number} bonus4
     */
    calculateSalary(bonus1, bonus2, bonus3, bonus4) {
        var weeksInAYear = 52;
        var baseSalary = (this.hourlyRate * this.hoursPerWeek) * weeksInAYear;

        var bonuses = (bonus1 || 0) + (bonus2 || 0) + (bonus3 || 0) + (bonus4 || 0);

        return baseSalary + bonuses;
    }
}

// data that should come from UI
var address = {line1: '344 Ulmerton Rd', city: 'St. Petersburg', zipCode: '33123', state: 'FL'};
var phones = [{type: 'home', number: '111-222-3323'}, {type: 'cell', number: '222-333-2232'}];
var bonuses = [1000, 1000, 1000]; 
var employee = new Employee(address, phones[0], phones[1]);
var employee2 = new Employee(address, phones[0], phones[1]);


// using the methods provided
console.log('Friendly Address: ', employee.printAddress())
console.log('Salary:', employee.calculateSalary(...bonuses))
console.log('Cell Phone:', employee.findPhoneByType('cell'))
console.log('Employee Id: ', employee.id)
// asynchronous function with a callback
employee.address.saveAddress().then(function(message) {
    console.log('Save Address: ', message);
});

// using es8 async await

async function saveAddress() {
    const message = await employee.address.saveAddress();
    console.log('AWAIT: ', message);
}

saveAddress();


// Fake Employee Collection
var employeesDB = [];
employeesDB.push(employee);
employeesDB.push(employee2);

// Helper function to find employee by ID
function findEmployeeById(id) {
    var foundEmployee = null; 
    employeesDB.some(function(employee) {
        if(employee.id === id) {
            foundEmployee = employee;
            return true;
        }
        return false;
    });

    return foundEmployee;
}

console.log('Found Employee:', findEmployeeById(employeesDB[1].id));
