// const transactionLists = [
//   {
//     types: {
//       reason: "",
//       withdraw: 0,
//       deposit: 0,
//       loan: 0,
//       transfer: 0,
//     },
//   },
// ];

//VARAIBLES FOR THE FORM.
const updateUi = document.querySelector(".updateUi");
const formWrapper = document.querySelector(".login-wrapper");
const loginUserName = document.getElementById("loginUserName");

const loginSubmint = document.querySelector(".loginSubmint");

const users = [
  {
    userName: "user1",
    fullName: "Bung sem cedrick",
    pin: 1234,

    transactions: [
      {
        reason: "",
        withdraw: 0,
        deposit: 0,
        loan: 0,
        transfer: 0,
      },
    ],
  },
  {
    userName: "user2",
    pin: 5678,
    fullName: "Eman Sem",
    transactions: [
      {
        reason: "",
        withdraw: 0,
        deposit: 0,
        loan: 0,
        transfer: 0,
      },
    ],
  },
];

console.log(users);

function addTransaction(userName, reason, withdraw, deposit, loan, transfer) {
  const user = users.find((user) => user.userName === userName);
  if (user) {
    user.transactions.push({
      reason: reason,
      withdraw: withdraw,
      deposit: deposit,
      loan: loan,
      transfer: transfer,
    });
  }
}

addTransaction("user1", "Salary", 100, 1000, 100, 566);
addTransaction("user2", "Groceries", 100, 999, 900, 122);

//login the users if the username is correct.

loginSubmint.addEventListener("click", userLogin);
//Displaying the recents and transaction history.

function transactionHistory(userName) {
  let displayText = "";
  const user = users.find((user) => user.userName === userName);

  if (user) {
    user.transactions.forEach(function (transaction) {
      let withdrawText = transaction.withdraw;
      let depositText = transaction.deposit;
      let loanText = transaction.loan;
      let transferText = transaction.transfer;
      let reasonText = transaction.reason;

      if (withdrawText > 0) {
        displayText += `<li class="transactions-list">
          <span class="minusText">Withdraw</span>
          <span class="text-desc">${reasonText}</span>
          <span class="amount">$${withdrawText}</span>
        </li>`;
      }

      if (depositText > 0) {
        displayText += `<li class="transactions-list">
          <span class="amount-desc">Deposit</span>
          <span class="text-desc">${reasonText}</span>
          <span id="addedBalance" class="amount">$${depositText}</span>
        </li>`;
      }

      if (loanText > 0) {
        displayText += `<li class="transactions-list">
          <span class="minusText">Approve Loan</span>
          <span class="text-desc">${reasonText}</span>
          <span class="amount">$${loanText}</span>
        </li>`;
      }

      if (transferText > 0) {
        displayText += `<li class="transactions-list">
          <span class="amount-desc">Transfer</span>
          <span class="text-desc">${reasonText}</span>
          <span class="amount">$${transferText}</span>
        </li>`;
      }
    });
  }

  let displayItems = document.querySelector(".transaction-items");
  displayItems.innerHTML = displayText;
  return displayText;
}

// Call the function with a specific userName
let loggedInUserName = '';
function userLogin(e) {
  e.preventDefault();
  const loginInputValue = loginUserName.value;
  
  const loginPin = document.getElementById("loginPin").value;
  let pinValue = Number(loginPin);
  const user = users.find(
    (user) => user.userName === loginInputValue && user.pin === pinValue
  );
  if (user) {
    loggedInUserName = user.userName;
    transactionHistory(loggedInUserName);
    console.log(loggedInUserName)
    updateUi.style.display = "block";
    formWrapper.style.display = "none";
  }
}


//The Total Balance
const displayTotalBalance = document.querySelector(".balance");
let amt = 8000;
let totalBalance = 8000;
displayTotalBalance.innerHTML = totalBalance;

//Total balance for each modules
let depositBalance = 0;
let loanBalance = 0;
let withdrawaBalance = 0;
let transferBalance = 0;

//Function for the total balance for each Module.
function balances() {
  let displayBalances = "";

  //final balances
  displayBalances += `
              <div class="balance-item">
                <span class="balance__item--text"> Deposits:</span>
                <span class="balance__item--amount balance-deposit">$${depositBalance}</span>
              </div>
              <div class="balance-item">
                <span class="balance__item--text"> Withdrawals:</span>
                <span class="balance__item--amount balance-withdrawal  ">$${withdrawaBalance}</span>
              </div>
              <div class="balance-item">
                <span class="balance__item--text"> Loans:</span>
                <span class="balance__item--amount">$${loanBalance}</span>
              </div>
              <div class="balance-item">
                <span class="balance__item--text"> Transfers:</span>
                <span class="balance__item--amount">$${transferBalance}</span>
              </div>
           `;

  const balances = document.querySelector(".balances");
  balances.innerHTML = displayBalances;
}
balances();

//The Selectors and decleration of variables use in the codes.
const sucessMessage = document.querySelector(".sucess");
const depositForm = document.getElementById("depositForm");
const withdrawalForm = document.getElementById("withdrawalForm");
const depositBtn = document.querySelector(".deposit-btn");
const openWithdraw = document.getElementById("withdrawBtn");
const withdrawBtn = document.querySelector(".withdraw-btn");
const transactionReason = document.querySelector(".reasons");
const loanForm = document.getElementById("loanForm");
const loanBtn = document.getElementById("loanBtn");
let warn = document.querySelector(".warn");
let loanTime = document.getElementById("loanTerms");



function createAnewDeposit() {
  const depositInput = document.querySelector(".deposit-input");
  let transactionReason = document.getElementById("reasons").value;
  let depositInputValue = Number(depositInput.value);
  
  if (isNaN(depositInputValue) || depositInputValue === "" || transactionReason === "") {
    alert("Please fill the form correctly");
  } else {
    // Ensure user is defined and accessible
    if (loggedInUserName) {
      addTransaction(loggedInUserName, transactionReason, 0, depositInputValue, 0, 0);
      transactionHistory(loggedInUserName); // Update UI with transaction history for the user
      // Update balances and display messages as needed
    depositBalance += depositInputValue;
    totalBalance += depositInputValue;
    displayTotalBalance.innerHTML = `$${totalBalance}`;
    console.log(loggedInUserName)

    balances(); // Assuming this function updates other UI elements related to balances

    // Display success message or perform other UI updates
    depositForm.style.display = "none";
    sucessMessage.style.display = "block";
    let customMessage = `Your deposit has been approved. Thanks for trusting us`;
    displayMessage(depositInputValue, customMessage);

    // Reset input fields
    transactionReason = "";
    depositInput.value = "";
    } else{
      alert("Please login to continue");
    }

    
  }
}

// Test addTransaction and transactionHistory functions separately
addTransaction("user1", "Test Deposit", 0, 500, 0, 0);
transactionHistory("user1");


//Create a new withdrawal function.

function requestWithdrawal(event) {
  event.preventDefault();

  const withdrawInput = document.querySelector(".withdrawInput");
  const formItem = document.querySelector(".forms-item");
  const withdrawInputValue = Number(withdrawInput.value);
  const reasonsValue = transactionReason.value;
  const warnings = document.getElementById("warnings");

  // Check if withdrawInputValue is a valid number and reasonsValue is not empty
  if (
    isNaN(withdrawInputValue) ||
    withdrawInput.value === "" ||
    reasonsValue === ""
  ) {
    warnings.textContent = "Fill the form correctly";
    console.log(withdrawInputValue);
    console.log(reasonsValue);
  } else if (withdrawInputValue > totalBalance) {
    warnings.textContent = "Sorry, you have insufficient Balance";
  } else {
    if(loggedInUserName){
      // Update database with withdrawal transaction
      // Add transaction to the list
      addTransaction(loggedInUserName, reasonsValue, withdrawInputValue, 0, 0, 0);
      transactionHistory(loggedInUserName); 
    // Update the total balance
    totalBalance -= withdrawInputValue;
    displayTotalBalance.innerHTML = `$${totalBalance}`;
    withdrawaBalance += withdrawInputValue;

    // Call additional functions
    balances();
    // Assuming transactionHistory() generates and displays transaction history
   
    sucessMessage.style.display = "block";

    if (withdrawalForm) {
      withdrawalForm.style.display = "none";
    } else {
      formItem.style.display = "none";
    }

    let customMessage = `Your withdrawal has been approved. Thanks for trusting us`;
    displayMessage(withdrawInputValue, customMessage);
    withdrawInput.value = "";
    transactionReason.value = "";
  }
    }
}

//This function is to request for a loan.

function requestLoan(event) {
  event.preventDefault();
  let loanInput = document.getElementById("loanInput");
  let loanReasons = document.getElementById("loanReasons");
  let loanReasonValue = loanReasons.value;
  let loanInputValue = Number(loanInput.value);

  let loanTime = document.getElementById("loanTerms");
  let selectedOption = loanTime.value;
  let yearInterest = 4;
  let monthsInterest = 2;
  let result;
  if (
    isNaN(loanInputValue) ||
    loanInputValue === "" ||
    loanReasonValue === "" ||
    selectedOption === ""
  ) {
    alert("Please fill all the fields");
  } else {

    if(loggedInUserName){
      if (selectedOption === "1year") {
        result = parseFloat((yearInterest * loanInputValue) / 12);
      } else if (selectedOption === "6months") {
        result = parseFloat((monthsInterest * loanInputValue) / 12);
      }
  
      loanBalance += Math.round(result + loanInputValue);
  
      balances();
      //Add a new loan request to the Array.
      addTransaction(loggedInUserName, loanReasonValue, 0, 0, loanInputValue, 0);
      // Add transaction to the list
      transactionHistory(loggedInUserName); 
      totalBalance += loanInputValue;
      displayTotalBalance.innerHTML = `$${totalBalance}`;
      sucessMessage.style.display = "block";
  
      loanForm.style.display = "none";
      loanInput.value = "";
      loanReasons.value = "";
      warn.style.display = "none";
      let customMessage = `Your loan has Approved, Thanks for Trusting Us`;
      displayMessage(loanInputValue, customMessage);
    }
    
  }
}

//Event to make  deposit, withdraw, transfer, and request for a loan.

depositBtn.addEventListener("click", function (e) {
  e.preventDefault();

  createAnewDeposit();
});
withdrawBtn.addEventListener("click", requestWithdrawal);
loanBtn.addEventListener("click", requestLoan);

//create the sucess message;
let sucessDisplay = "";
function displayMessage(amount, customMessage) {
  sucessDisplay += `<p>
                                  Congratulations, <span class="userName">Eman,</span> ${customMessage}.
                                  <span class="sucessAmount"> Amount: $${amount}</span> <br/>
                                  <span class="Verify">Verify your account to see Your balance</span>
                              </p>
                              <span class="close">Close</span>`;

  sucessMessage.innerHTML = sucessDisplay;
  const close = document.querySelector(".close");

  close.addEventListener("click", function (e) {
    e.preventDefault();

    depositForm.style.display = "block";
    sucessMessage.style.display = "none";
  });
}

// the loan handerler.

// This module check the loan duration and update the UI

let yearIntrest = 4;
let monthsInterest = 2;
loanTime.addEventListener("input", function (e) {
  if (loanTime.value === "6months") {
    warn.style.display = "block";
    warn.innerHTML = `<p>The interest rate for <span class="loanTerm">${loanTime.value}</span> is <span>${monthsInterest}%</span></p>`;
  } else if (loanTime.value === "1year") {
    warn.style.display = "block";
    warn.innerHTML = `<p>The interest rate for <span class="loanTerm">${loanTime.value}</span> is <span>${yearIntrest}%</span></p>`;
  }
});

// THIS EVENTS OPEN THE FORMS AND UPDATES THE UI

const openLoanForm = document.getElementById("openLoanForm");
openLoanForm.addEventListener("click", function (e) {
  e.preventDefault();
  depositForm.style.display = "none";
  loanForm.style.display = "block";
  withdrawalForm.style.display = "none";
});

openWithdraw.addEventListener("click", function (e) {
  withdrawalForm.style.display = "block";
  depositForm.style.display = "none";
  loanForm.style.display = "none";
});
