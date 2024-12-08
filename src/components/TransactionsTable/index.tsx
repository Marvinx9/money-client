import { useEffect } from "react";
import { Container } from "./styles";
import { api } from "../../services/api";

export function TransactionsTable() {
    useEffect(() => {
        api.get('/transactions')
        .then(response => console.log(response.data))
    }, []);

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Desenvolvimento de website</td>
                        <td className="deposit">R$12.000</td>
                        <td>Desenvolvimento</td>
                        <td>07/12/2024</td>
                    </tr>
                    <tr>
                        <td>Aluguel</td>
                        <td className="withdraw">- R$1.100</td>
                        <td>Casa</td>
                        <td>02/12/2024</td>
                    </tr>
                    <tr>
                        <td>Energia</td>
                        <td className="withdraw">- R$320</td>
                        <td>Casa</td>
                        <td>05/12/2024</td>
                    </tr>
                    <tr>
                        <td>Faculdade</td>
                        <td className="withdraw">- R$169</td>
                        <td>Estudo</td>
                        <td>15/12/2024</td>
                    </tr>
                </tbody>
            </table>
        </Container>
    )
}