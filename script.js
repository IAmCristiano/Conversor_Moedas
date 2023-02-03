class conversorDeMoedas {
    constructor() {
        this.endpoint = `https://api.exchangerate-api.com/v4/latest/USD`;
        this.inputValor = document.getElementById("input-valor");
        this.moedaDe = document.getElementById("moedaDe");
        this.moedaPara = document.getElementById("moedaPara");
        this.resultadoSpan = document.querySelector("#resultado span");
        this.botaoConverter = document.getElementById("converter");
        this.botaoInverter = document.getElementById("inverter");
        this.setupEventListeners();
    }

    async fetchExchangeRate(moedaDe, moedaPara) {
        const response = await fetch(this.endpoint);
        const data = await response.json();
        const taxaDeCambio = data.rates[moedaPara] / data.rates[moedaDe];
        return taxaDeCambio;
    }

    async converter() {
        const valor = this.inputValor.value;
        const moedaDe = this.moedaDe.value;
        const moedaPara = this.moedaPara.value;
        const taxaDeCambio = await this.fetchExchangeRate(moedaDe, moedaPara);
        const resultado = valor * taxaDeCambio;
        this.resultadoSpan.innerHTML = resultado.toFixed(2);
        this.inputValor.focus();
    }

    inverter() {
        const moedaDeSelection = this.moedaDe.value;
        this.moedaDe.value = this.moedaPara.value;
        this.moedaPara.value = moedaDeSelection;
        this.converter();
    }

    setupEventListeners() {
        this.inputValor.focus();
        this.botaoConverter.addEventListener("click", () => this.converter());
        this.botaoInverter.addEventListener("click", () => this.inverter());
        this.inputValor.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                this.converter();
            }
        });
    }
}

const conversor = new conversorDeMoedas();