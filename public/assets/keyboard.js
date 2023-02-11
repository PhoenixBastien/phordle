const buttons = document.querySelectorAll('.btn')
// const textarea = document.querySelector('textarea')

const delete_btn = document.querySelector('.delete')
const enter_btn = document.querySelector('.enter')

let chars = []

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        textarea.value += btn.innerText
        chars = textarea.value.split('')
    })
})

delete_btn.addEventListener('click', () => {
    chars.pop()
    textarea.value = chars.join('')
})

enter_btn.addEventListener('click', () => {
    chars.push('\n')
    textarea.value = chars.join('')
})