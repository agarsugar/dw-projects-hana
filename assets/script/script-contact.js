function getData(event){
    event.preventDefault()

    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let phone = document.getElementById("phone").value
    let subjectChoose = document.getElementById("subject")
    let subject = subjectChoose.options[subjectChoose.selectedIndex].text
    let messages = document.getElementById("messages").value

    console.log(`Your name is ${name}, your email is ${email}, your phone number is ${phone}, you chose ${subject}, and your messages is ${messages} `);

    if (name == ""){
        return alert("Nama anda masih kosong, silahkan tambahkan nama")
    }
    if (email == ""){
        return alert("Email anda masih kosong, silahkan tambahkan email")
    }
    if (phone == ""){
        return alert("Nomor kontak anda masih kosong, silahkan tambahkan nomor kontak")
    }
    if (subject == ""){
        return alert("Silahkan pilih subyek terlebih dahulu")
    }
    if (messages == ""){
        return alert("Silahkan masukkan pesan anda terlebih dahulu")
    }

}

