

let account;
// Example usage
const web3ss = new Web3(new Web3.providers.HttpProvider(infuraUrl));
const contracts = new web3ss.eth.Contract(contractABI, contractAddress);


const connectWalletBtn = document.getElementById('connectWalletBtn');
const connectWalletBtn2 = document.getElementById('connectWalletBtn2');
const walletModal = document.getElementById('walletModal');
const metamaskOption = document.getElementById('metamaskOption');
const walletConnectOption = document.getElementById('walletConnectOption');
const closePopupButton = document.getElementById('close-popup');

let web3s;
let connectedAccount = null;

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function clearAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    }
}

function checkPreviousConnection() {
    const account = getCookie('connectedAccount');
    if (account) {
        connectedAccount = account;
        initializeWeb3();
        updateUIForConnectedWallet();
    }
}

closePopupButton.addEventListener('click', () => {
  walletModal.style.display = 'none';
  walletModal2.style.display = 'none';
});

function connectWallet() {
    walletModal.style.display = 'flex'; // Show the wallet selection modal
}

function connectToMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(accounts => {
                web3s = new Web3(window.ethereum);
                connectedAccount = accounts[0];
                setCookie('connectedAccount', connectedAccount, 1);
                updateUIForConnectedWallet();
                walletModal.style.display = 'none'; // Hide the modal after connecting
                console.log('Connected to MetaMask:', connectedAccount);
                window.location.reload();
            })
            .catch(error => {
                console.error('Failed to connect MetaMask:', error);
            });
    } else {
        alert('MetaMask is not installed. Please install MetaMask and try again.');
    }
}

async function connectToWalletConnect() {
    const provider = new WalletConnectProvider.default({
        infuraId: "https://arbitrum-sepolia.infura.io/v3/10ea86c5db904f06b7c9b6676e5bbc5c" // Replace with your Infura project ID
    });

    try {
        await provider.enable();
        web3s = new Web3(provider);
        const accounts = await web3s.eth.getAccounts();
        connectedAccount = accounts[0];
        setCookie('connectedAccount', connectedAccount, 1);
        updateUIForConnectedWallet();
        walletModal.style.display = 'none'; // Hide the modal after connecting
        console.log('Connected to WalletConnect:', connectedAccount);
        window.location.reload();
      } catch (error) {
        console.error('Failed to connect with WalletConnect:', error);
    }
}

function disconnectWallet() {
    connectedAccount = null;
    connectWalletBtn.innerHTML = '<span>Connect Wallet</span>';
    connectWalletBtn.onclick = connectWallet;
    connectWalletBtn2.innerHTML = '<span>Connect Wallet</span>';
    connectWalletBtn2.onclick = connectWallet;

    clearAllCookies(); // Clear all cookies on disconnect
    deleteCookie('walletAddress');
    localStorage.setItem('disconnectreload', 'true');
    window.location.reload();
}

function initializeWeb3() {
    web3s = new Web3(window.ethereum);
}

function updateUIForConnectedWallet() {
    connectWalletBtn.innerHTML = `${connectedAccount.slice(0, 6)}...${connectedAccount.slice(-4)}`;
    connectWalletBtn.onclick = disconnectWallet;
    connectWalletBtn2.innerHTML = `${connectedAccount.slice(0, 6)}...${connectedAccount.slice(-4)}`;
    connectWalletBtn2.onclick = disconnectWallet;
}

connectWalletBtn.onclick = connectWallet;
connectWalletBtn2.onclick = connectWallet;
metamaskOption.onclick = connectToMetaMask;
walletConnectOption.onclick = connectToWalletConnect;

checkPreviousConnection();

// Function to initialize Web3
function initializeWeb3() {
  web3s = new Web3(window.ethereum);
}

// Function to update the UI for a connected wallet
function updateUIForConnectedWallet() {
  connectWalletBtn.innerHTML = `${connectedAccount.slice(0, 6)}...${connectedAccount.slice(-4)}`;
  connectWalletBtn.onclick = disconnectWallet;
  connectWalletBtn2.innerHTML = `${connectedAccount.slice(0, 6)}...${connectedAccount.slice(-4)}`;
  connectWalletBtn2.onclick = disconnectWallet;
}



window.addEventListener('load', () => {
  if (localStorage.getItem('showToastAfterReload') === 'true') {
    // Show the toast notification
    popup();

    // Clear the flag so the toast is only shown once
    localStorage.removeItem('showToastAfterReload');
  }
  if (localStorage.getItem('disconnectreload') === 'true') {
    // Show the toast notification
    diconnectpopup();

    // Clear the flag so the toast is only shown once
    localStorage.removeItem('disconnectreload');
  }
  if (localStorage.getItem('withdrawmoney') === 'true') {
    // Show the toast notification
    withdrawmoney();

    // Clear the flag so the toast is only shown once
    localStorage.removeItem('withdrawmoney');
  }
  if (localStorage.getItem('refferalCopied') === 'true') {
    // Show the toast notification
    refferalCopied();

    // Clear the flag so the toast is only shown once
    localStorage.removeItem('refferalCopied');
  }
  if (localStorage.getItem('transaction') === 'true') {
    // Show the toast notification
    transaction();

    // Clear the flag so the toast is only shown once
    localStorage.removeItem('transaction');
  }
  if (localStorage.getItem('withdrawmoneyfailed') === 'true') {
    // Show the toast notification
    withdrawmoneyfailed();

    // Clear the flag so the toast is only shown once
    localStorage.removeItem('withdrawmoneyfailed');
  }
 
});

async function popup() {
  // Show success alert when wallet is connected
  Toastify({
    text: "Wallet connected successfully!",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function() {} // Callback after click
  }).showToast();
}

async function diconnectpopup() {
  // Show success alert when wallet is connected
  Toastify({
    text: "Wallet disconnected successfully!",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function() {} // Callback after click
  }).showToast();
}
async function transaction() {
  // Show success alert when wallet is connected
  Toastify({
    text: "Transction successfully!",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function() {} // Callback after click
  }).showToast();
}
async function transactionfailed() {
  // Show success alert when wallet is connected
  Toastify({
    text: "Transction Failed!",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function() {} // Callback after click
  }).showToast();
}
async function withdrawmoney() {
  // Show success alert when wallet is connected
  Toastify({
    text: "Withdraw successfully!",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function() {} // Callback after click
  }).showToast();
}
async function withdrawmoneyfailed() {
  // Show success alert when wallet is connected
      ({
    text: "Withdraw Money failed!",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function() {} // Callback after click
  }).showToast();
}



const web3 = new Web3(new Web3.providers.HttpProvider(infuraUrl));
const contract = new web3.eth.Contract(contractABI, contractAddress);
const staticUserAddress = connectedAccount;

// Format BNB value
function formatBNB(value) {
  const bnbValue = parseFloat(web3.utils.fromWei(value, "ether"));
  return bnbValue.toFixed(3) + " BNB";
}

// Convert and return the deposit value in Ether
function totalDepositValue(value) {
  return parseFloat(web3.utils.fromWei(value, "ether"));
}



document.addEventListener('DOMContentLoaded', function () {
  const depositAmountInput = document.getElementById('depositAmount');
  const referrerAddressInput = document.getElementById('referrerAddress');
  const sendTransactionButton = document.getElementById('sendTransaction');
  const perDayIncomeDisplay = document.getElementById('perDayIncome');
  const totalIncomeDisplay = document.getElementById('totalIncome');

  // Define the daily percentage rate
  const dailyRate = 0.01; // 1% per day

  // Event listener for input change
  depositAmountInput.addEventListener('input', function () {
      const depositAmount = parseFloat(depositAmountInput.value) || 0;

      // Calculate per day income
      const perDayIncome = depositAmount * dailyRate;

      // Calculate total income (doubling the deposit for this example)
      const totalIncome = depositAmount * 2;

      // Update the per day income and total income in the HTML
      perDayIncomeDisplay.innerText = perDayIncome.toFixed(3) + ' BNB';
      totalIncomeDisplay.innerText = totalIncome.toFixed(3) + ' BNB';
  });

  sendTransactionButton.addEventListener('click', async function () {
      const depositAmount = parseFloat(depositAmountInput.value) || 0;
   // Get the URL parameters
const urlParams = new URLSearchParams(window.location.search);

// Fetch the referrer address from the 'ref' parameter
const referrerAddress = urlParams.get('ref') || 'please pass referral address';

// Use the referrerAddress in your logic
console.log(referrerAddress);

      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
          const web3 = new Web3(window.ethereum);

          // Replace with your contract address and ABI
          const contract = new web3.eth.Contract(contractABI, contractAddress);

          try {
              // Request account access if needed
              await window.ethereum.request({ method: 'eth_requestAccounts' });

              // Get the user's account
              const accounts = await web3.eth.getAccounts();
              const userAccount = accounts[0];

              // Convert the deposit amount to Wei
              const depositAmountInWei = web3.utils.toWei(depositAmount.toString(), 'ether');

              // Call the invest function with the referrer address and send the deposit amount
              const txHash = await contract.methods.invest(referrerAddress).send({
                  from: userAccount,
                  value: depositAmountInWei,
                  gas: 3000000 // Set an appropriate gas limit
              });
              localStorage.setItem('transaction', 'true');
              window.location.reload();
              console.log('Transaction Hash:', txHash);
              

          } catch (error) {
            localStorage.setItem('transactionfailed', 'true');

              // Detailed error message based on the error
              let errorMessage = 'Transaction failed.';
              if (error.code === 4001) {
                  errorMessage = 'Transaction rejected by the user.';
              } else if (error.message.includes('gas')) {
                  errorMessage = 'Transaction failed due to insufficient gas.';
              } else if (error.message.includes('network')) {
                  errorMessage = 'Network issue occurred. Please try again later.';
              } else if (error.message.includes('funds')) {
                  errorMessage = 'Insufficient funds for gas and transaction amount.';
              }

              alert(errorMessage);
          }
      } else {
          alert('Please install MetaMask or another Ethereum wallet extension to proceed.');
      }
  });
});



document.addEventListener('DOMContentLoaded', function () {
  const withdrawButton = document.getElementById('withdraw-button');

  // Event listener for the Withdraw button
  withdrawButton.addEventListener('click', async function () {
      console.log('Withdraw button clicked.');

      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
          console.log('MetaMask is installed.');

          try {
              // Create a new instance of Web3 using MetaMask's provider
              const web3 = new Web3(window.ethereum);
              console.log('Web3 instance created.');

           
              console.log('Contract ABI and address set.');

              // Convert the contract address to checksum format without reassigning it
              const checksumAddress = web3.utils.toChecksumAddress(contractAddress);
              console.log('Checksum contract address:', checksumAddress);

              // Create contract instance
              const contract = new web3.eth.Contract(contractABI, checksumAddress);
              console.log('Contract instance created:', contract);

              // Request account access if needed
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              console.log('Account access requested.');

              // Get the user's account
              const accounts = await web3.eth.getAccounts();
              console.log('Accounts fetched:', accounts);

              const userAccount = web3.utils.toChecksumAddress(accounts[0]);
              console.log('Using account:', userAccount);

              // Call the withdraw function
              const txHash = await contract.methods.withdraw().send({
                  from: userAccount,
                  gas: 3000000
                  // Set an appropriate gas limit
              });

              console.log('Transaction Hash:', txHash);

          } catch (error) {
              console.error('Error performing withdrawal:', error);
          }
      } else {
          console.error('MetaMask is not installed.');
      }
  });
});

// Function to generate a referral link with the domain name and wallet address
function  generateReferralLink() {
  // Define the base domain for the referral link
  const baseUrl = 'https://bnbbank.pro/'; // Replace with your actual domain

  // Use the connectedAccount address as the referral code
  const referralCode = connectedAccount; // This should be dynamically set when the wallet is connected

  // Construct the full referral link with parameters
  return `${baseUrl}?ref=${referralCode}`;
}

// Function to check and create a referral link
async function checkAndCreateReferral() {
  try {
    // Fetch the total deposits from the smart contract
    const totalDeposits = await contract.methods.totalInvested().call();

    // Define the value to compare against
    const desiredValue = 1000; // Change this value as needed

    // Check if total deposits are zero or not equal to the desired value
    if (totalDeposits === '0' || totalDeposits !== desiredValue.toString()) {
      // Generate the referral link if there is a connected account
      if (connectedAccount) {
        const referralLink = generateReferralLink();

        // Display or use the referral link
        console.log('Referral Link:', referralLink);

       
        document.getElementById('referralLink').textContent = referralLink; // Make it clickable
        // document.getElementById('referralLinkContainer').style.display = 'block'; // Show the link container
      } else {
        console.log('No connected account. Unable to generate referral link.');
      }
    } else {
      console.log('No action needed. Total deposits match the desired value.');
      // document.getElementById('referralLinkContainer').style.display = 'none'; // Hide the link container
    }

  } catch (error) {
    console.error('Error checking total deposits or creating referral link:', error);
  }
}
document.getElementById('copyButton').addEventListener('click', function () {
  // Get the referral link text
  const referralLink = document.getElementById('referralLink').innerText;

  // Create a temporary textarea element to hold the referral link
  const textarea = document.createElement('textarea');
  textarea.value = referralLink;
  document.body.appendChild(textarea);
  textarea.select();

  try {
      // Execute the copy command
      document.execCommand('copy');

      // Display a toast notification
      Toastify({
          text: "Referral link copied to clipboard!",
          duration: 3000,  // Show the toast for 3 seconds
          close: true,
          gravity: "bottom",  // `top` or `bottom`
          position: "right",  // `left`, `center` or `right`
          backgroundColor: "#28a745",
          stopOnFocus: true,  // Prevents dismissing of toast on hover
          onClick: function(){}  // Callback after click
      }).showToast();

  } catch (err) {
      // Handle errors if necessary
      console.error('Failed to copy text: ', err);
  }

  // Remove the temporary textarea element
  document.body.removeChild(textarea);
});

// Automatically remove the toast after 3 minutes (180 seconds)
setTimeout(function() {
  const toast = document.querySelector(".toastify");
  if (toast) {
      toast.remove();
  }
}, 180000);  // 180000 milliseconds = 180 seconds = 3 minutes

// Existing code for connecting and disconnecting wallet remains the same




// Fetch and update general contract data
async function fetchContractData() {
  try {
    const balance = await contract.methods.getContractBalance().call();
    const totalUsers = await contract.methods.totalUsers().call();
    const withdrawn = await contract.methods.totalWithdrawn().call();
    const totalDeposits = await contract.methods.totalInvested().call();
    const userReward = await contract.methods.totalReferrals().call();

    // Update the UI with general contract data
    document.getElementById("contract-balance").textContent = formatBNB(balance);
    document.getElementById("contract-balance2").textContent = formatBNB(balance);
    document.getElementById("withdrawandata").textContent = formatBNB(withdrawn);
    document.getElementById("withdrawandata2").textContent = formatBNB(withdrawn);
    document.getElementById("total-users").textContent = totalUsers;
    document.getElementById("total-deposits").textContent = formatBNB(totalDeposits);
    document.getElementById("ref-rewards").textContent = formatBNB(userReward);

    console.log("Contract Balance:", formatBNB(balance));
    console.log("Total Withdrawn:", formatBNB(withdrawn));
    console.log("Total Users:", totalUsers);
    console.log("Total Deposits:", formatBNB(totalDeposits));
    console.log("User Reward:", formatBNB(userReward));
  } catch (error) {
    console.error("Error fetching contract data:", error);
  }
}


// Fetch and update user-specific contract data
async function fetchUserContractData(staticUserAddress) {
  try {
    // Check if staticUserAddress is not null
    if (staticUserAddress) {
      const userDeposits = await contract.methods.getUserTotalDeposits(staticUserAddress).call();
      // const userProfit = await contract.methods.totalInvested(staticUserAddress).call();
      const amountWithdrawn = await contract.methods.getUserTotalWithdrawn(staticUserAddress).call();
      const interestRate = await contract.methods.getUserPercentRate(staticUserAddress).call();
      const downlineCount = await contract.methods.getUserDownlineCount(staticUserAddress).call();
      
      const downlineObject = await contract.methods.getUserDownlineCount(staticUserAddress).call();

      // Check if downlineObject is an object and extract values
      const downlineValues = Object.values(downlineObject).map(value => parseInt(value, 10));
      const totalDownline = downlineValues.reduce((sum, value) => sum + value, 0);

      // Update UI with the fetched data
      document.getElementById('countdownline').innerText = ` ${totalDownline}`;
      document.getElementById('userDeposits').innerText = web3.utils.fromWei(userDeposits, 'ether');
      // document.getElementById('userProfit').innerText = web3.utils.fromWei(userProfit, 'ether');
      document.getElementById('amountWithdrawn').innerText = web3.utils.fromWei(amountWithdrawn);
      document.getElementById('interestRate').innerText = ((interestRate / 10).toFixed(2)) + '%';
      
      document.getElementById("depositUser").innerText = web3.utils.fromWei(amountWithdrawn, 'ether');


      console.log(`Total downline for address ${staticUserAddress}: ${totalDownline}`);
      console.log("User Deposits:", web3.utils.fromWei(userDeposits, 'ether'));
      // console.log("User Profit:", web3.utils.fromWei(userProfit, 'ether'));
      console.log("Amount Withdrawn:", web3.utils.fromWei(amountWithdrawn, 'ether'));
      console.log("Interest Rate:", interestRate);
      
      console.log("Downline Count:", downlineCount);
    } else {
      // Handle case when staticUserAddress is null
      // alert("Please connect your wallet to view user-specific data.");
     
    }
    try {
      const userDeposits = await contract.methods.getUserAmountOfDeposits(staticUserAddress).call();
      let totalInvestment = web3.utils.toBN(0);
      let totalWithdrawn = web3.utils.toBN(0);

      // Loop through all deposits
      for (let i = 0; i < userDeposits; i++) {
          const depositInfo = await contract.methods.getUserDepositInfo(staticUserAddress, i).call();
          const amount = web3.utils.toBN(depositInfo[0]); // Amount of the deposit
          const withdrawn = web3.utils.toBN(depositInfo[1]); // Amount withdrawn from this deposit
          
          totalInvestment = totalInvestment.add(amount);
          totalWithdrawn = totalWithdrawn.add(withdrawn);
      }

      // Calculate profit
      const profit = totalInvestment.sub(totalWithdrawn);
      const profitInEther = web3.utils.fromWei(profit, 'ether');
      
      console.log(`Total Investment: ${web3.utils.fromWei(totalInvestment, 'ether')} BNB`);
      console.log(`Total Withdrawn: ${web3.utils.fromWei(totalWithdrawn, 'ether')} BNB`);
      console.log(`Profit: ${profitInEther} ETH`);
      document.getElementById('profit').innerText = profitInEther;  

      // Check if the user is in profit or loss
      if (profit.gt(web3.utils.toBN(0))) {
          console.log(`The user has made a profit of ${profitInEther} BNB+.`);
          document.getElementById('profit').innerText = ` ${profitInEther}`  ;  
      } else if (profit.lt(web3.utils.toBN(0))) {
          console.log(`The user has a loss of ${profitInEther} BNB.`);
      } else {
          console.log(`The user has broken even with no profit or loss.`);
      }
  } catch (error) {
      console.error('Error calculating profit:', error);
  }
  } catch (error) {
    console.error("Error fetching user contract data:", error);
    // alert("An error occurred while fetching user data. Please try again.");
  }
}

fetchContractData();

fetchUserContractData(staticUserAddress);

checkAndCreateReferral();