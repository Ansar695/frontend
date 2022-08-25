import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import AdminLogin from "../AdminLogin";

it('should render correct login users', async () => {
    render(
        <BrowserRouter>
          <AdminLogin />  
        </BrowserRouter>
    );

    userEvent.type(screen.getByTestId('input_id'), 'se-123')
    await waitFor(() => {
        expect(screen.getByTestId('input_id')).toHaveValue('se-123')
    })
})