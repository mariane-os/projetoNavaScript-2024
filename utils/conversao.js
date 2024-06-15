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
    },DataParaBanco: function(dt)
    {
        if(!dt)
        {
            return null;
        }

        const ano = dt.substr(0, 4);
        const mes = dt.substr(5, 2);
        const dia = dt.substr(8, 2);

        const data = new Date(mes + "/" + dia + "/" + ano);

        return data;
    }
}