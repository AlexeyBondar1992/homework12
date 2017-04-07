var element = $('#currency'),
    input = $('#sumIn'),
    output = $('#sumOut');

$.ajax({
    type: 'GET',
    url: " http://www.nbrb.by/API/ExRates/Currencies"
}).done(function (currencies) {
    currencies.forEach(function (currency) {
        var option = $('<option>');
        option.attr('value', String(currency.Cur_Abbreviation))
            .attr('data-currency-code', String(currency.Cur_ID));
        option.text(String(currency.Cur_Name));
        element.append(option);
    });
    request();
});

element.change('option', function () {
    request();
});

function calculator(_currencyCode, scale, rate) {
    var sum = (input.val() * scale / rate).toFixed(2);
    output.text(`${sum} ${_currencyCode}`);
}

function request() {
    var _currencyCode = element.val();
    $.ajax({
            type: 'GET',
            url: 'http://www.nbrb.by/API/ExRates/Rates/' + _currencyCode + '?ParamMode=2'
        })
        .done(function (response) {
            var rate = response.Cur_OfficialRate,
                scale = response.Cur_Scale;
            calculator(_currencyCode, scale, rate);
            input.on('input', function (response) {
                var value = String(input.val());
                calculator(_currencyCode, scale, rate);
            });
        });
}