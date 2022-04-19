import { readonly } from "../reactive"

describe('readonly', () => {
  it('happy path', () => {
    const original = { foo: 1, bar: { baz: 2 } }
    const wapped = readonly(original)
    expect(wapped).not.toBe(original)
    expect(wapped.foo).toBe(1)
  })

  it('warn then call set', () => {
    console.warn = jest.fn()
    const user = readonly({
      age: 10
    })

    user.age = 11

    expect(console.warn).toBeCalled()
  })
})