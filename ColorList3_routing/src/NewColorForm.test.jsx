import { render, screen, fireEvent } from '@testing-library/React'
import AddColorForm from './NewColorForm'

//{ editMode = false, colorToEdit, onUpdate = f => f, onSubmit = f => f, onCancelEdit = f => f }

describe("NewColorForm", () => {

    describe("in edit mode", () => {
        test('displays "Update Color" as a title', () => {
            render(<AddColorForm editMode={true} colorToEdit={{}} />)
            expect(screen.getByText('Update Color')).toBeInTheDocument()
            expect(screen.queryByText('New Color')).not.toBeInTheDocument()
        })

        test('displays an "Update" button', () => {
            render(<AddColorForm editMode={true} colorToEdit={{}} />)
            expect(screen.getByText("Update")).toBeInTheDocument()
            expect(screen.queryByText("Add")).not.toBeInTheDocument()
        })
    });

    describe("in 'new color' mode", () => {
        test('displays "New Color" as a title', () => {
            render(<AddColorForm editMode={false} colorToEdit={{}} />)
            expect(screen.getByText('New Color')).toBeInTheDocument()
            expect(screen.queryByText('Update Color')).not.toBeInTheDocument()
        })

        test('displays an "Add" button', () => {
            render(<AddColorForm editMode={false} colorToEdit={{}} />)
            expect(screen.getByText("Add")).toBeInTheDocument()
            expect(screen.queryByText("Update")).not.toBeInTheDocument()
        })
    })

    test('modifying title updates title', () => {
        const onUpdate = jest.fn()
        render(<AddColorForm editMode={true} colorToEdit={{title: 'My Title', color: 'myColor', id: 4343}} onUpdate={onUpdate} />)
        const titleBox = screen.getByTitle('Title')
        fireEvent.change(titleBox, {target: {value: 'q'}})
        expect(onUpdate).toHaveBeenCalledWith({title: 'q', color: 'myColor', id: 4343})        
    })

    test('modifying color updates color', () => {
        const onUpdate = jest.fn()
        render(<AddColorForm editMode={true} colorToEdit={{title: 'My Title', color: 'myColor', id: 4343}} onUpdate={onUpdate} />)
        const colorPicker = screen.getByTitle('Color')

        // Sampe from https://github.com/testing-library/user-event/issues/423
        fireEvent.input(colorPicker, {target: {value: '#333333'}})
        expect(onUpdate).toHaveBeenCalledWith({title: 'My Title', color: '#333333', id: 4343})        
    })

    // Why is this test important?  Try this:  "accidentally" change onCancelEdit in 
    // NewColorForm.jsx to "onCancel".  Notice that the program doesn't crash, but the cancel
    // button stops working.  This test will catch that mistake (perhaps as part of your CI/CD pipeline)
    test('cancel button has callback', () => {
        const onCancel = jest.fn()
        render(<AddColorForm editMode={false} colorToEdit={{}} onCancelEdit={onCancel}/>)
        const cancelButton = screen.getByText("Cancel")
        expect(cancelButton).toBeInTheDocument()
        fireEvent.click(cancelButton)
       expect(onCancel).toHaveBeenCalled();
    })

    test('form submit has callback', () => {
        // Make sure your submit handler (even a mock one) calls preventDefault
        // https://stackoverflow.com/questions/62216232/error-not-implemented-htmlformelement-prototype-submit
        const onSubmit = jest.fn((e) => e.preventDefault())
        render(<AddColorForm editMode={false} colorToEdit={{}} onSubmit={onSubmit}/>)
        const submitButton = screen.getByText("Add")
        expect(submitButton).toBeInTheDocument()
        fireEvent.click(submitButton)
       expect(onSubmit).toHaveBeenCalled();
    })
})