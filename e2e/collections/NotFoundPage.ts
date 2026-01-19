import { BasePage } from './BasePage.js'

export class NotFoundPage extends BasePage {
  code = this.getByTestId('code')
  title = this.getByRole('heading', { level: 1 })
  subtitle = this.getByTestId('subtitle')
}
