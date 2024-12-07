import logoImg from '../../asserts/logo.svg'
import { Container, Content } from './styles'

export function Header() {
    return (
        <Container>
            <Content>
                <img src={logoImg} alt="money-client"/>
                <button type="button">
                    Nova transação
                </button>
            </Content>
        </Container>
    )
}
