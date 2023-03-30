function getAllDataWhenPageCreated() {
  const getLocalStorageAlreadyRead = localStorage.getItem("Selesai Dibaca");
  const getLocalStorageUnread = localStorage.getItem("Belum selesai dibaca");
  if (getLocalStorageAlreadyRead) {
    getBookAlreadyRead()
  }
  if (getLocalStorageUnread) {
    getBookUnread()
  }
}

function submitNewBook() {
  const tempTitle = document.getElementById("inputBookTitle").value;
  const tempAuthor = document.getElementById("inputBookAuthor").value;
  const tempYear = document.getElementById("inputBookYear").value;
  let tempIsComplete;
  if (document.getElementById("inputBookIsComplete").checked) {
    tempIsComplete = true;
  } else {
    tempIsComplete = false;
  }
  const tempData = [
    {
      id: new Date(),
      title: tempTitle,
      author: tempAuthor,
      year: tempYear,
      isComplete: tempIsComplete,
    },
  ];
  const getLocalStorageAlreadyRead = localStorage.getItem("Selesai Dibaca");
  const getLocalStorageUnread = localStorage.getItem("Belum selesai dibaca");
  if (tempIsComplete) {
    if (getLocalStorageAlreadyRead) {
      let tempBookAlreadyRead = JSON.parse(getLocalStorageAlreadyRead)
      tempBookAlreadyRead.push(tempData[0])
      localStorage.setItem(
        tempIsComplete ? "Selesai Dibaca" : "Belum selesai dibaca",
        JSON.stringify(tempBookAlreadyRead)
      );
    } else {
      localStorage.setItem(
        tempIsComplete ? "Selesai Dibaca" : "Belum selesai dibaca",
        JSON.stringify(tempData)
      );
    }
    getBookAlreadyRead()
  } else {
    if (getLocalStorageUnread) {
      let tempBookUnread = JSON.parse(getLocalStorageUnread)
      tempBookUnread.push(tempData[0])
      localStorage.setItem(
        tempIsComplete ? "Selesai Dibaca" : "Belum selesai dibaca",
        JSON.stringify(tempBookUnread)
      );
    } else {
      localStorage.setItem(
        tempIsComplete ? "Selesai Dibaca" : "Belum selesai dibaca",
        JSON.stringify(tempData)
      );
    }
    getBookUnread()
  }
  clearFormInput()
}

function getBookAlreadyRead() {
  const getLocalStorageAlreadyRead = localStorage.getItem("Selesai Dibaca");
  const tempBookAlreadyRead = JSON.parse(getLocalStorageAlreadyRead)
  let wrapper = document.getElementById("completeBookshelfList");
  let myHTML = '';

  if (tempBookAlreadyRead && tempBookAlreadyRead.length > 0) {
    for (let i = 0; i < tempBookAlreadyRead.length; i++) {
      myHTML += '<article class="book_item"><h3>' + tempBookAlreadyRead[i].title + '</h3><p>Penulis: ' + tempBookAlreadyRead[i].author + '</p><p>Tahun: ' + tempBookAlreadyRead[i].year + '</p><div class="action"><button class="green" onClick="moveToUnread(\'' + tempBookAlreadyRead[i].id + '\')">Belum selesai di Baca</button><button class="red" onClick="deleteBookAlreadyRead(\'' + tempBookAlreadyRead[i].id + '\')">Hapus buku</button></div></article>'
    }
  }

  wrapper.innerHTML = myHTML
}

function getBookUnread() {
  const getLocalStorageUnread = localStorage.getItem("Belum selesai dibaca");
  const tempBookUnread = JSON.parse(getLocalStorageUnread)
  let wrapper = document.getElementById("incompleteBookshelfList");
  let myHTML = '';

  if (tempBookUnread && tempBookUnread.length > 0) {
    for (let i = 0; i < tempBookUnread.length; i++) {
      myHTML += '<article class="book_item"><h3>' + tempBookUnread[i].title + '</h3><p>Penulis: ' + tempBookUnread[i].author + '</p><p>Tahun: ' + tempBookUnread[i].year + '</p><div class="action"><button class="green" onClick="moveToAlreadyRead(\'' + tempBookUnread[i].id + '\')">Selesai dibaca</button><button class="red" onClick="deleteBookUnread(\'' + tempBookUnread[i].id + '\')">Hapus buku</button></article>'
    }
  }

  wrapper.innerHTML = myHTML
}

function deleteBookAlreadyRead(val) {
  const getLocalStorageAlreadyRead = localStorage.getItem("Selesai Dibaca");
  let tempBookAlreadyRead = JSON.parse(getLocalStorageAlreadyRead)
  for (let i = 0; i < tempBookAlreadyRead.length; i++) {
    if (tempBookAlreadyRead[i].id === val) {
      tempBookAlreadyRead.splice(i, 1)
    }
  }
  localStorage.setItem(
    "Selesai Dibaca",
    JSON.stringify(tempBookAlreadyRead)
  );
  let inputWanted = document.getElementById("searchBookTitle").value;
  if (inputWanted) {
    searchBookByTitle()
  } else {
    getBookAlreadyRead()
  }
}

function deleteBookUnread(val) {
  const getLocalStorageUnread = localStorage.getItem("Belum selesai dibaca");
  let tempBookUnread = JSON.parse(getLocalStorageUnread)
  for (let i = 0; i < tempBookUnread.length; i++) {
    if (tempBookUnread[i].id === val) {
      tempBookUnread.splice(i, 1)
    }
  }
  localStorage.setItem(
    "Belum selesai dibaca",
    JSON.stringify(tempBookUnread)
  );
  let inputWanted = document.getElementById("searchBookTitle").value;
  if (inputWanted) {
    searchBookByTitle()
  } else {
    getBookUnread()
  }
}

function moveToUnread(val) {
  const getLocalStorageAlreadyRead = localStorage.getItem("Selesai Dibaca");
  const getLocalStorageUnread = localStorage.getItem("Belum selesai dibaca");
  let tempBookAlreadyRead = JSON.parse(getLocalStorageAlreadyRead)
  let tempData
  for (let i = 0; i < tempBookAlreadyRead.length; i++) {
    if (tempBookAlreadyRead[i].id === val) {
      tempData = tempBookAlreadyRead[i]
      tempBookAlreadyRead.splice(i, 1)
    }
  }
  localStorage.setItem(
    "Selesai Dibaca",
    JSON.stringify(tempBookAlreadyRead)
  );
  let tempBookUnread = JSON.parse(getLocalStorageUnread)
  tempBookUnread.push(tempData)
  localStorage.setItem(
    "Belum selesai dibaca",
    JSON.stringify(tempBookUnread)
  );
  let inputWanted = document.getElementById("searchBookTitle").value;
  if (inputWanted) {
    searchBookByTitle()
  } else {
    getBookAlreadyRead()
    getBookUnread()
  }
}

function moveToAlreadyRead(val) {
  const getLocalStorageAlreadyRead = localStorage.getItem("Selesai Dibaca");
  const getLocalStorageUnread = localStorage.getItem("Belum selesai dibaca");
  let tempBookUnread = JSON.parse(getLocalStorageUnread)
  let tempData
  for (let i = 0; i < tempBookUnread.length; i++) {
    if (tempBookUnread[i].id === val) {
      tempData = tempBookUnread[i]
      tempBookUnread.splice(i, 1)
    }
  }
  localStorage.setItem(
    "Belum selesai dibaca",
    JSON.stringify(tempBookUnread)
  );
  let tempBookAlreadyRead = JSON.parse(getLocalStorageAlreadyRead)
  tempBookAlreadyRead.push(tempData)
  localStorage.setItem(
    "Selesai Dibaca",
    JSON.stringify(tempBookAlreadyRead)
  );
  let inputWanted = document.getElementById("searchBookTitle").value;
  if (inputWanted) {
    searchBookByTitle()
  } else {
    getBookAlreadyRead()
    getBookUnread()
  }
}

function clearFormInput() {
  document.getElementById("inputBookTitle").value = ''
  document.getElementById("inputBookAuthor").value = ''
  document.getElementById("inputBookYear").value = ''
}

function searchBookByTitle() {
  let inputWanted = document.getElementById("searchBookTitle").value;
  const getLocalStorageAlreadyRead = localStorage.getItem("Selesai Dibaca");
  const getLocalStorageUnread = localStorage.getItem("Belum selesai dibaca");
  let tempBookAlreadyRead = JSON.parse(getLocalStorageAlreadyRead)
  let tempBookUnread = JSON.parse(getLocalStorageUnread)
  let resultAlreadyRead = []
  let resultUnread = []
  let wrapperAlreadyRead = document.getElementById("completeBookshelfList");
  let wrapperUnread = document.getElementById("incompleteBookshelfList");
  let myHTMLAlreadyRead = '';
  let myHTMLUnread = '';

  for (let i = 0; i < tempBookAlreadyRead.length; i++) {
    if (tempBookAlreadyRead[i].title.toUpperCase().includes(inputWanted.toUpperCase())) {
      resultAlreadyRead.push(tempBookAlreadyRead[i])
    }
  }
  
  for (let i = 0; i < tempBookUnread.length; i++) {
    if (tempBookUnread[i].title.toUpperCase().includes(inputWanted.toUpperCase())) {
      resultUnread.push(tempBookUnread[i])
    }
  }

  for (let i = 0; i < resultAlreadyRead.length; i++) {
    myHTMLAlreadyRead += '<article class="book_item"><h3>' + resultAlreadyRead[i].title + '</h3><p>Penulis: ' + resultAlreadyRead[i].author + '</p><p>Tahun: ' + resultAlreadyRead[i].year + '</p><div class="action"><button class="green" onClick="moveToUnread(\'' + resultAlreadyRead[i].id + '\')">Belum selesai di Baca</button><button class="red" onClick="deleteBookAlreadyRead(\'' + resultAlreadyRead[i].id + '\')">Hapus buku</button></div></article>'
  }

  for (let i = 0; i < resultUnread.length; i++) {
    myHTMLUnread += '<article class="book_item"><h3>' + resultUnread[i].title + '</h3><p>Penulis: ' + resultUnread[i].author + '</p><p>Tahun: ' + resultUnread[i].year + '</p><div class="action"><button class="green" onClick="moveToAlreadyRead(\'' + resultUnread[i].id + '\')">Selesai dibaca</button><button class="red" onClick="deleteBookUnread(\'' + resultUnread[i].id + '\')">Hapus buku</button></article>'
  }

  wrapperAlreadyRead.innerHTML = myHTMLAlreadyRead
  wrapperUnread.innerHTML = myHTMLUnread
}