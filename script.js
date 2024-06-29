const transactionLists = [
  {
    types: {
      reason: "",
      withdraw: 0,
      deposit: 0,
      loan: 0,
      transfer: 0,
    },
  },
];

function addTransaction(reason, withdraw, deposit, loan, transfer) {
  transactionLists.push({
    types: {
      reason: reason,
      withdraw: withdraw,
      deposit: deposit,
      loan: loan,
      transfer: transfer,
    },
  });
}
addTransaction("Shopping", 60, 50, 0, 0);
console.log(transactionLists);

function transactionHistory() {
  let displayText = "";

  transactionLists.forEach(function (item) {
    let withdrawText = item.types.withdraw;
    let depositText = item.types.deposit;
    let loanText = item.types.loan;
    let transferText = item.types.transfer;
    let reasonText = item.types.reason;

    if (withdrawText > 0) {
      displayText += `<li class="transactions-list">
          <span class="minusText">Withdraw</span>
          <span class="text-desc">${reasonText}</span>
          <span  class="amount">$${withdrawText}</span>
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
          <span  class="amount">$${loanText}</span>
        </li>`;
    }

    if (transferText > 0) {
      displayText += `<li class="transactions-list">
          <span class="amount-desc">Transfer</span>
          <span class="text-desc">${reasonText}</span>
          <span  class="amount">$${transferText}</span>
        </li>`;
    }
  });
  const displayItems = document.querySelector(".transaction-items");
  return (displayItems.innerHTML = displayText);
}

transactionHistory();

const displayTotalBalance = document.querySelector(".balance");
let totalBalance = 8000;
displayTotalBalance.innerHTML = totalBalance;

const loanTerms = [
  {
    types: "1year, 6months",
  },
];

let depositBalance = 0;
let loanBalance = 0;
let withdrawaBalance = 0;
let transferBalance = 0;

//final balances

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

// Function to update the transaction history

// the depoist event handeler

const sucessMessage = document.querySelector(".sucess");
const depositForm = document.getElementById("depositForm");
const withdrawalForm = document.getElementById("withdrawalForm");
const depositBtn = document.querySelector(".deposit-btn");
const openWithdraw = document.getElementById("withdrawBtn");

// Events to open forms

//Event to make  deposit.

depositBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const depositInput = document.querySelector(".deposit-input");
  let transactionReason = document.getElementById("reasons").value;
  let depositInputValue = Number(depositInput.value);
  if (
    isNaN(depositInputValue) ||
    depositInputValue === "" ||
    transactionReason === ""
  ) {
    alert("Please fill the form correctly");
  } else {
    // Add transaction to the list
    addTransaction(transactionReason, 0, depositInputValue, 0, 0);
    depositBalance += depositInputValue;

    totalBalance += depositInputValue;
    displayTotalBalance.innerHTML = `$${totalBalance}`;
    transactionHistory();
    balances();
    depositForm.style.display = "none";
    sucessMessage.style.display = "block";
    displayMessage();
    transactionReason = "";
    depositInput.value = "";
  }
});

//create the sucess message;
let sucessDisplay = "";
function displayMessage() {
  const depositInput = document.querySelector(".deposit-input");

  let depositInputValue = Number(depositInput.value);

  sucessDisplay += `<p>
                                  Congratulations, <span class="userName">Eman,</span> Transaction is complete
                                  <span class="sucessAmount">$${depositInputValue}</span> <br/>
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

const withdrawBtn = document.querySelector(".withdraw-btn");
const transactionReason = document.querySelector(".reasons");

withdrawBtn.addEventListener("click", function (e) {
  e.preventDefault();

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
    // Add transaction to the list
    addTransaction(reasonsValue, withdrawInputValue, 0, 0, 0);
    // Update the total balance
    totalBalance -= withdrawInputValue;
    displayTotalBalance.innerHTML = `$${totalBalance}`;
    withdrawaBalance += withdrawInputValue;

    // Call additional functions
    balances();
    // Assuming transactionHistory() generates and displays transaction history
    transactionHistory();

    sucessMessage.style.display = "block";

    if (withdrawalForm) {
      withdrawalForm.style.display = "none";
    } else {
      formItem.style.display = "none";
    }

    displayMessage();
  }
});
const loanForm = document.getElementById("loanForm");
// the loan handerler.
let warn = document.querySelector(".warn");
let loanTime = document.getElementById("loanTerms");
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

const loanBtn = document.getElementById("loanBtn");

loanBtn.addEventListener("click", function (e) {
  e.preventDefault();
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
    if (selectedOption === "1year") {
      result = parseFloat((yearInterest * loanInputValue) / 12);
    } else if (selectedOption === "6months") {
      result = parseFloat((monthsInterest * loanInputValue) / 12);
    }

    loanBalance += Math.round(result + loanInputValue); 
    console.log(loanBalance);e
    balances(); 
    addTransaction(loanReasonValue, 0, 0, loanInputValue, 0);
    transactionHistory();
    sucessMessage.style.display = "block";

    
    loanForm.style.display = "none";
    loanInput.value = "";
    loanReasons.value = "";
    warn.style.display = "none";
    sucessDisplay += `<p>
    Congratulations, <span class="userName">Eman,</span> Your Loan have been approved.
    <span class="sucessAmount">$${loanInputValue}</span> <br/>
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
});

const openLoanForm = document.getElementById('openLoanForm');
openLoanForm.addEventListener( 'click', function(e){
    e.preventDefault();
    depositForm.style.display = "none";
    loanForm.style.display = "block";
    withdrawalForm.style.display = "none";
})
openWithdraw.addEventListener("click", function (e) {
    withdrawalForm.style.display = "block";
    depositForm.style.display = "none";
    loanForm.style.display = "none";
  });
  
