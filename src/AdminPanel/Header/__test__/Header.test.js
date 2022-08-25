import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import '@testing-library/user-event'
import { BrowserRouter } from "react-router-dom";
import Header from "../Header";

it('should render same text passed to the paragraph', async () => {
    render(
        <BrowserRouter>
          <Header />  
        </BrowserRouter>
    );
    const paragraphElem = screen.getByText(/emumba pvt ltd/i)
    expect(paragraphElem).toBeInTheDocument();
})

// it('should render same text passed to the paragraph', async () => {
//     render(
//         <BrowserRouter>
//           <Header />  
//         </BrowserRouter>
//     );
//     const paragraphElem = screen.getByTestId("logo_title")
//     expect(paragraphElem).toBeInTheDocument();
// })

// it('should render same text passed to the paragraph', async () => {
//     render(
//         <BrowserRouter>
//           <Header />  
//         </BrowserRouter>
//     );
//     const paragraphElem = screen.getAllByTestId("logo_title")
//     expect(paragraphElem.length).toBe(1);
// })