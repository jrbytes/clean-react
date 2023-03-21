declare namespace Cypress {
  interface Chainable {
    // eslint-disable-next-line @typescript-eslint/method-signature-style
    getByTestId(id: string): Chainable<Element>
  }
}
