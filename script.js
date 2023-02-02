const endpoint = `https://api.exchangerate-api.com/v4/latest/USD`;

const fetchExchangeRate = async (moedaDe, moedaPara) => {
    const response = await fetch(endpoint);
    const data = await response.json();
    const taxaDeCambio = data.rates[moedaPara] / data.rates[moedaDe];
    return taxaDeCambio;
};

const converter = async () => {
    const valor = document.getElementById("valor").value;
    const moedaDe = document.getElementById("moedaDe").value;
    const moedaPara = document.getElementById("moedaPara").value;
    const taxaDeCambio = await fetchExchangeRate(moedaDe, moedaPara);
    const resultado = valor * taxaDeCambio;
    document.querySelector("#resultado span").innerHTML = resultado.toFixed(2);
};

const inverter = () => {
    const moedaDe = document.getElementById("moedaDe");
    const moedaPara = document.getElementById("moedaPara");
    const moedaDeSelection = moedaDe.value;
    moedaDe.value = moedaPara.value;
    moedaPara.value = moedaDeSelection;
    converter();
};

document.getElementById("converter").addEventListener("click", converter);
document.getElementById("inverter").addEventListener("click", inverter);