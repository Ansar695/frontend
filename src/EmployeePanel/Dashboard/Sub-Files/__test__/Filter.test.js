import { fireEvent, render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import FilterEmpRecord from "../FilterEmpRecord";

describe("Employee Filter Records", () => {
    it('should render date filter ', async () => {
        render(<FilterEmpRecord />);
        const inputElement = screen.getByRole("date_filter")
        const tableElement = screen.getAllByRole("row")
        fireEvent.change(inputElement, {target: {value: "Thu Aug 18 2022"}})
        expect(tableElement[0]).toBeInTheDocument()
    })

    it('should render date filter record', async () => {
        render(<FilterEmpRecord />);
        const rowElement = await screen.findAllByRole("row")
        expect(rowElement.length).toBe(1)
    })
})
