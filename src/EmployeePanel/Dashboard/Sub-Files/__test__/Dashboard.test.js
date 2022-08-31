import { fireEvent, getByRole, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import BasicInfo from "../BasicInfo";
import { Provider } from "react-redux";
import store from "../../../../Redux/store"

const MockedComponent = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <BasicInfo />
            </Provider>  
        </BrowserRouter>
    )
}

describe("Employee Dashboard Test", () => {
    it('should render Update component', async () => {
        render(<MockedComponent />);

        const headElement = screen.getByTestId("heading2")
        const btnElement = screen.getByRole("button", {name : /Update Profile/i})
        fireEvent.click(btnElement);
        const inputElement = await screen.findByTestId("fname");
        fireEvent.change(inputElement, {target: {value: headElement.textContent}})
        expect(inputElement.value).toBe(headElement.textContent)
    })


    it('should render User Info from backend ', async () => {
        render(<MockedComponent />);
        const paraElement = await screen.findByTestId("user_email");
        expect(paraElement).toBeInTheDocument()
    })
})
