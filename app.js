// Lister for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Hide Results
  document.getElementById('results').style.display = 'none';

  setTimeout(calculateResults, 2000);

  //  Show Loading
  document.getElementById('loading').style.display = 'block';

});

//Calculate Results
function calculateResults() {
  // UI Vars
  const ammount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const yearPayment = document.getElementById('year-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(ammount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    yearPayment.value = (monthly * 12).toFixed(2);

    //  Show Results
    document.getElementById('results').style.display = 'block';

    // Hide Loading
    document.getElementById('loading').style.display = 'none';

  } else {
    // Show Error Message if have empty inputs
    showError('Please Check your numbers');
  }
}

function showError(errorMsg) {
  // Hide Loading
  document.getElementById('loading').style.display = 'none';

  // Create Error Div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');


  errorDiv.className = 'alert alert-danger';

  // Create text node and append it to Error Div
  errorDiv.appendChild(document.createTextNode(errorMsg));

  //  Insert Error Message above heading
  card.insertBefore(errorDiv, heading);

  // Clear error div after 3 sec
  setTimeout(clearError, 3000);

}

function clearError() {
  document.querySelector('.alert').remove();
}