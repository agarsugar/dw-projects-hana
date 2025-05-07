function getData(event){
    event.preventDefault()

    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let phone = document.getElementById("phone").value
    let subjectChoose = document.getElementById("subject")
    let subject = subjectChoose.options[subjectChoose.selectedIndex].text
    let messages = document.getElementById("messages").value

    console.log(`Your name is ${name}, your email is ${email}, your phone number is ${phone}, you chose ${subject}, and your messages is ${messages} `);
}

