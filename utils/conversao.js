module.exports = {
    calcularValor: function(tipo, peso){
        if(!tipo || !peso){
            return null;
        }

        let valor = 0;

        switch(tipo){
            case "Metal":
                valor = 5 * peso;
                break;
            case "Plástico":
                valor = 2.4 * peso;
                break;
            case "Papel":
                valor = 4.3 * peso;
                break;
            case "Vidro":
                valor = 1.3 * peso;
                break;
            default:
                return null;
        }

        return valor;
    }
}