import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import AdminLogin from "../AdminLogin";

const MockComponent = () => {
    return (
        <BrowserRouter>
            <AdminLogin />  
        </BrowserRouter>
    )
}

describe("Admin Login Test", () => {
    it('should render correct dynamic Employee Id:', async () => {
        render( <MockComponent /> );
        const inputElement = screen.getByLabelText(/employee id/i)
        fireEvent.change(inputElement, {target: {value: "SE-124"}})
        expect(inputElement.value).toBe("SE-124");
    })

    it('should render 4 digit Pin code:', async () => {
        render( <MockComponent /> );
        const inputElement = screen.getByLabelText(/pin code/i)
        fireEvent.change(inputElement, {target: {value: "1234"}})
        expect(inputElement.value).toBe("1234");
    })

    it('should render 4 digit Pin code:', async () => {
        render( <MockComponent /> );
        const inputElement = screen.getByPlaceholderText(/pin code/i)
        fireEvent.change(inputElement, {target: {value: "1234"}})
        expect(inputElement.value).toHaveLength(4);
    })

    it('should display error message on incorrect pin code', async () => {
        render( <MockComponent /> );
        const errorElement = screen.getByTestId("para_error")
        const inputElement = screen.getByPlaceholderText(/pin code/i)
        const buttonElement = screen.getByRole("button")
        fireEvent.change(inputElement, {target: {value: "234"}})
        fireEvent.click(buttonElement)
        expect(errorElement).toBeInTheDocument()
    })
})