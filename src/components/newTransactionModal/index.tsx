import Modal from 'react-modal';
import closeImg from '../../asserts/Iconclose.svg'
import incomeImg from '../../asserts/Iconsin.svg'
import outcomeImg from '../../asserts/Iconsout.svg'
import { Container, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose} : NewTransactionModalProps) {
    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName='react-modal-overlay'
        className='react-modal-content'
       >
        <button type='button'
        onClick={onRequestClose}
        className='react-modal-close'
        >
            <img src={closeImg} alt='fechar modal'/>
        </button>
        <Container>
        <h2>Cadastrar transação</h2>

        <input placeholder='Título'/>
        <input type='number' placeholder='Valor'/>

        <TransactionTypeContainer>

            <button type='button'>
                <img src={incomeImg} alt='entrada'/>
                <span>Entrada</span>
            </button>

            <button type='button'>
                <img src={outcomeImg} alt='saída'/>
                <span>Saída</span>
            </button>

        </TransactionTypeContainer>

        <input placeholder='Categoria'/>

        <button type='submit'>
            Cadastrar
        </button>
        </Container>
       </Modal>
    )
}