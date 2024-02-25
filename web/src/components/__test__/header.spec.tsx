import { render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { Header } from "../header"

describe('<Header />', () => {
  it('should be to have the correct link , icons and how is selected.', () => {
    const wrapper = render(<Header howIsSelected="my-packages" />, { wrapper: BrowserRouter })

    const textDeliverymans = wrapper.getByText('Deliverymans')
    const textRecpients = wrapper.getByText('Recipients')
    const textPackages = wrapper.getByText('Packages')
    const textLogout = wrapper.getByText('Log out')

    expect(textDeliverymans).toBeInTheDocument()
    expect(textRecpients).toBeInTheDocument()
    expect(textPackages).toBeInTheDocument()
    expect(textLogout).toBeInTheDocument()
  })
})