import userData from '../fixtures/userData.json'
import LoginPage from '../pages/loginPage'
import DashboardPage from '../pages/dashboardPage'
import MenuPage from '../pages/MenuPage'

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage()

describe('Orange HRM Tests', () => {

  const selectorsList = {
    firstNameField: "[name='firstName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    genericComboBox: ".oxd-select-text--arrow",
    secondItemComboBox: ".oxd-select-dropdown > :nth-child(2)",
    thirdItemComboBox: ".oxd-select-dropdown > :nth-child(3)",
    dateField: "[placeholder='yyyy-dd-mm']",
    submitButton: "[type='submit']",
    nationalityButton: "[data-v-67d2aedf='']",
  }

  it.only('User Info Update - Success', () => {
    loginPage.accessLoginPage()
    loginPage.loginWithNUser(userData.userSuccess.username, userData.userSuccess.password)

    dashboardPage.checkDashboardPage()

    menuPage.accessMyInfo()

    cy.get(selectorsList.firstNameField).clear({ force: true }).type('FirstTest')
    cy.get(selectorsList.lastNameField).clear().type('LastTest')
    cy.get(selectorsList.genericField).eq(3).clear().type('Test123')
    cy.get(selectorsList.genericField).eq(4).clear().type('OtherIdTest')
    cy.get(selectorsList.genericField).eq(5).clear().type('DriverTest')
    cy.get(selectorsList.genericField).eq(6).clear().type('2026-06-30')
    cy.contains('Close').click()
    cy.get(selectorsList.submitButton).eq(0).click()
    cy.get('body').should('contain', 'Successfully Updated')
    cy.get(selectorsList.genericComboBox).eq(0).click({ force: true })
    cy.get(selectorsList.secondItemComboBox).click()
    cy.get(selectorsList.genericComboBox).eq(1).click({ force: true })
    cy.get(selectorsList.thirdItemComboBox).click()

  })

   it('Login - Fail', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
  })

})