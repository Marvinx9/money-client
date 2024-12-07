import incomeImg from '../../asserts/Iconsin.svg';
import outcomeImg from '../../asserts/Iconsout.svg';
import totalImg from '../../asserts/Iconstotal.svg';

import { Container } from "./styles";

export function Summary() {
    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="entradas"/>
                </header>
                <strong>R$1000,00</strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="saídas"/>
                </header>
                <strong>- R$500,00</strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="total"/>
                </header>
                <strong>R$500,00</strong>
            </div>
        </Container>
    )
}
