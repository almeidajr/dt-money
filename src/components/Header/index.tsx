import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

type HeaderProps = {
  onButtonClick?: () => void
}

export const Header = ({ onButtonClick }: HeaderProps) => (
  <Container>
    <Content>
      <img src={logoImg} alt="dt money" />
      <button type="button" onClick={onButtonClick}>
        Nova transação
      </button>
    </Content>
  </Container>
)
