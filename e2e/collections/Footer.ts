import { Page } from '@playwright/test'
import Collection from 'lariat'

export class Footer extends Collection<Page> {
  socialLink = this.el('data-testid=social-link')
}
