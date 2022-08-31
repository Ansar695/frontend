import { fireEvent, getByRole, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../../../Redux/store"
import EmpAttendance from "../EmpAttendance";
import MarkAttendance from "../MarkAttendance";

const MockedComponent = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <MarkAttendance />
            </Provider>  
        </BrowserRouter>
    )
}

describe("Employee Attendance Test", () => {
    it('should render Attendance record ', async () => {
        render(<MockedComponent />);
        const paraElement = screen.getByTestId("para")
        expect(paraElement).toBeInTheDocument()
    })


    it('should render Check Button when punched in or punched out ', async () => {
        render(<MockedComponent />);
        const checkElement = screen.getByTestId("check_input")
        fireEvent.click(checkElement);
        expect(checkElement.checked).toEqual(true)
        fireEvent.click(checkElement);
        expect(checkElement.checked).toEqual(false)
    })


    it('should render Today details  when punched in or punched out ', async () => {
        render(<MockedComponent />);
        const checkElement = screen.getByTestId("check_input")
        fireEvent.click(checkElement);
        const tabelElement = screen.getByRole("table")
        expect(tabelElement).toBeInTheDocument()
    })
})
