import { render } from "@testing-library/react"
import { HeaderDeliveryman } from "../header-deliveryman"
import { BrowserRouter } from "react-router-dom"

describe('<HeaderDeliveryman />', () => {
  it('should be to have the correct link , icons and how is selected.', () => {
    const wrapper = render(<HeaderDeliveryman howIsSelected="my-packages" />, { wrapper: BrowserRouter })

    const textMyPackages = wrapper.getByText('My Packages')
    const textNearOfMe = wrapper.getByText('Near of me')
    const textLogout = wrapper.getByText('Log out')

    expect(textMyPackages).toBeInTheDocument()
    expect(textNearOfMe).toBeInTheDocument()
    expect(textLogout).toBeInTheDocument()
  })
})