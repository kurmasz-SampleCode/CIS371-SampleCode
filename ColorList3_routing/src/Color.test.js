import { render, screen, fireEvent } from "@testing-library/React"
import Color from "./Color"
import React from "react"

// React recommends structuring tests to _not_ look for structure.
// (But, it can be useful on occasion.)
test("contains a colorbox", () => {
  render(<Color title='The title' rating='3' color='#00ff00' />)
  expect(document.querySelector(".colorBox")).toBeTruthy()
})


// React prefers testing for things the user can see.
test("displays the title", () => {
  render(<Color title='The title' rating='3' color='#00ff00' />)
  expect(screen.getByText("The title")).toBeInTheDocument()
})

test("clicking 'Edit' passes the color", () => {

  let editCallback = jest.fn()
  render(<Color title='The title' rating='3' color='#00ff00' onEditClicked={editCallback} />)

  const button = document.querySelector("button")
  expect(button.innerHTML).toBe("Edit")
  fireEvent.click(button)
  expect(editCallback).toHaveBeenCalledWith("#00ff00")
})