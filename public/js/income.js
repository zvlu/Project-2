$(document).ready(function() {
  // Getting references to our form and input
  var incomeForm = $("form.income");
  var dateInput = $("#date-pick");
  var incomeTypeInput = $("#income-type");
  var incomeAmtInput = $("#income-amt");

  incomeForm.on("submit", function(event) {
    event.preventDefault();
    console.log(dateInput.val());
    console.log($("#income-type option:selected").text());
    console.log(incomeAmtInput.val());

    var userData = {
      date: dateInput.val().trim(),
      category: $("#income-type option:selected")
        .text()
        .trim(),
      amount: incomeAmtInput.val().trim()
    };
    // eslint-disable-next-line prettier/prettier
    saveIncomeAmt( userData.date, userData.category, userData.amount );
    // var listHeader = $("#incomelist");
    // liTag = $("<button>").html("<b>" + searchCity + "</b>");
    //     liTag.attr("data-city",searchCity);
    //     liTag.addClass("list-group-item list-group-item-action list-group-item-primary citybutton");
    //     listDiv.append(liTag);
    //     $(".addcity").val("");

    dateInput.val("");
    incomeTypeInput.val("");
    incomeAmtInput.val("");
  });

  function saveIncomeAmt(date, category, amount) {
    $.post("/api/income", {
      date: date,
      category: category,
      amount: amount
    })
      // eslint-disable-next-line no-unused-vars
      .then(function(data) {
        console.log(data);
        // location.reload();
        // window.location.replace("/income");
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
