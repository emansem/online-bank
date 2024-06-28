const transactionLists = [
  {
    loan: 0,
    depost: 0,
    withdrawal: 0,
    transfers: 0,
    reasons: "",
  },
];
let totalBalance = 0;

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
// transaction history list function
function transactionHistory() {
  let displayTransnHistory = "";
  transactionLists.forEach(function (item) {
    displayTransnHistory += `<li class="transactions-list">
    <span id="addedAmount" class="amount-desc"> Deposit</span>
    <span class="text-desc"
        >${item.reasons}
    </span>
    <span id="addedBalance" class="amount">$${item.depost}</span>
</li>

<p class="status">No Transactions Found</p>
`;
  });
  // <li class="transactions-list">
  //     <span id="minusText" class="amount-desc"> Withdrawal</span>
  //     <span class="text-desc"
  //         >Lorem ipsum dolor sit, amet consectetur
  //     </span>
  //     <span id="minusAmount" class="amount">10000CFA</span>
  // </li>
  // <li class="transactions-list">
  //     <span id="addedAmount" class="amount-desc"> Approved Loan</span>
  //     <span class="text-desc"
  //         >Lorem ipsum dolor sit, amet consectetur
  //     </span>
  //     <span id="addedBalance" class="amount">3000CFA</span>
  // </li>
  // <li class="transactions-list">
  //     <span id="minusText" class="amount-desc"> Transfer</span>
  //     <span class="text-desc"
  //         >Lorem ipsum dolor sit, amet consectetur
  //     </span>
  //     <span id="minusAmount" class="amount">13000CFA</span>
  // </li>

  const transactionList = document.querySelector(".transaction-items");
  transactionList.innerHTML = displayTransnHistory;
}
transactionHistory();

//event

// const transactionReason = document.getElementById("reasons").value;
// let reasonsValue = transactionReason;
const sucessMessage = document.querySelector(".sucess");
const formsitem = document.querySelector(".forms-item");
const depositBtn = document.querySelector(".deposit-btn");
const displayTotalBalance = document.querySelector(".balance");
depositBtn.addEventListener("click", function (e) {
  //   const reasons = document.querySelector(".reasons");

  e.preventDefault();
  const depositInput = document.querySelector(".deposit-input");
  const transactionReason = document.getElementById("reasons").value;
  let depositInputValue = Number(depositInput.value);
  console.log(depositInputValue);
  console.log(transactionReason);
  transactionLists.push({
    depost: depositInputValue,
    reasons: transactionReason,
  });
  depositBalance += depositInputValue;

  console.log(transactionLists);
  totalBalance += depositInputValue;
  displayTotalBalance.innerHTML = `$${totalBalance}`;
  transactionHistory();
  balances();
  formsitem.style.display = "none";
  sucessMessage.style.display = "block";
  displayMessage();

  //create the sucess message;
});

function displayMessage() {
    const depositInput = document.querySelector(".deposit-input");

    let depositInputValue = Number(depositInput.value);
  let sucessDisplay = "";
  sucessDisplay += `<p>
                                  Hey there <span class="userName">Eman,</span>The Deposit of
                                  <span class="sucessAmount">$${depositInputValue}</span> Was sucess<br/>
                                  <span class="Verify">Verify your account to see Your balance</span>
                              </p>
                              <span class="close">Close</span>`;

  sucessMessage.innerHTML = sucessDisplay;
  const close = document.querySelector('.close');
close.addEventListener('click', function(e){
    e.preventDefault();
    formsitem.style.display = "block";
    sucessMessage.style.display = "none";
})
}
displayMessage();

